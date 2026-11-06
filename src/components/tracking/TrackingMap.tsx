'use client';

import { LocateFixed, MapPinOff } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { COLORS } from '@/constants';
import { getMapsApiKey } from '@/lib/tracking/config';
import { loadGoogleMaps } from '@/lib/tracking/maps-loader';
import type { Messages } from '@/lib/tracking/messages';
import type {
  LatLng,
  TrackingDestination,
  TrackingPosition,
  TrailPoint,
} from '@/lib/tracking/types';

import {
  DARK_MAP_STYLES,
  LIGHT_MAP_STYLES,
  createDestinationPin,
  createPositionedOverlay,
  createSenderMarker,
  type PositionedOverlay,
  type SenderMarker,
} from './mapOverlay';

const INTERPOLATION_MS = 1_000;
const DEFAULT_ZOOM = 16;
const MIN_FOLLOW_ZOOM = 14;
/** Jumps larger than this (metres) are not animated. */
const MAX_ANIMATED_JUMP_M = 2_000;

export interface TrackingMapProps {
  messages: Messages;
  position: TrackingPosition;
  trail: readonly TrailPoint[];
  heading: number | null;
  accuracyM: number | null;
  destination: TrackingDestination | null;
  /** Greys the marker (stale fix or contact lost). */
  muted: boolean;
}

interface MapObjects {
  map: google.maps.Map;
  polyline: google.maps.Polyline;
  circle: google.maps.Circle;
  marker: SenderMarker;
  markerOverlay: PositionedOverlay;
  destinationOverlay: PositionedOverlay | null;
}

type LoadStatus = 'loading' | 'ready' | 'error';

function metresBetween(a: LatLng, b: LatLng): number {
  const dLat = (b.lat - a.lat) * 111_320;
  const dLng = (b.lng - a.lng) * 111_320 * Math.cos((a.lat * Math.PI) / 180);
  return Math.hypot(dLat, dLng);
}

function lerpAngle(from: number, to: number, ratio: number): number {
  const delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta * ratio;
}

function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function TrackingMap(props: TrackingMapProps): React.JSX.Element {
  const { messages } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<MapObjects | null>(null);
  const latestRef = useRef<TrackingMapProps>(props);
  const displayedRef = useRef<LatLng | null>(null);
  const displayedHeadingRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const followingRef = useRef(true);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [following, setFollowing] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const apiKey = getMapsApiKey();

  useEffect(() => {
    latestRef.current = props;
  });

  const stopFollowing = useCallback((): void => {
    followingRef.current = false;
    setFollowing(false);
  }, []);

  // Load the Maps script (after the status UI has painted) and build the map once.
  useEffect(() => {
    const container = containerRef.current;
    if (apiKey === '' || container === null) return;
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    const start = window.setTimeout(() => {
      loadGoogleMaps(apiKey)
        .then(() => {
          if (cancelled) return;
          const { position, accuracyM, destination, heading, muted } = latestRef.current;
          const origin: LatLng = { lat: position.lat, lng: position.lng };

          const map = new google.maps.Map(container, {
            center: origin,
            zoom: DEFAULT_ZOOM,
            disableDefaultUI: true,
            gestureHandling: 'greedy',
            clickableIcons: false,
            styles: prefersDark() ? DARK_MAP_STYLES : LIGHT_MAP_STYLES,
          });
          const polyline = new google.maps.Polyline({
            map,
            path: [],
            strokeColor: COLORS.SHAKTI_PURPLE,
            strokeOpacity: 0.9,
            strokeWeight: 5,
            clickable: false,
          });
          const circle = new google.maps.Circle({
            map,
            center: origin,
            radius: accuracyM ?? 0,
            visible: accuracyM !== null,
            fillColor: COLORS.PRIMARY_RED,
            fillOpacity: 0.12,
            strokeColor: COLORS.PRIMARY_RED,
            strokeOpacity: 0.35,
            strokeWeight: 1,
            clickable: false,
          });
          const marker = createSenderMarker();
          marker.setHeading(heading);
          marker.setMuted(muted);
          const markerOverlay = createPositionedOverlay(marker.element, origin);
          markerOverlay.overlay.setMap(map);

          let destinationOverlay: PositionedOverlay | null = null;
          if (destination !== null) {
            destinationOverlay = createPositionedOverlay(createDestinationPin(), destination);
            destinationOverlay.overlay.setMap(map);
            const bounds = new google.maps.LatLngBounds(origin);
            bounds.extend(destination);
            map.fitBounds(bounds, { top: 72, right: 40, bottom: 40, left: 40 });
          }

          displayedRef.current = origin;
          displayedHeadingRef.current = heading;
          objectsRef.current = {
            map,
            polyline,
            circle,
            marker,
            markerOverlay,
            destinationOverlay,
          };

          // Any user pan or zoom turns auto-follow off.
          const dragListener = map.addListener('dragstart', stopFollowing);
          const onUserZoom = (): void => stopFollowing();
          const onPinch = (event: TouchEvent): void => {
            if (event.touches.length > 1) stopFollowing();
          };
          container.addEventListener('wheel', onUserZoom, { passive: true });
          container.addEventListener('dblclick', onUserZoom);
          container.addEventListener('touchstart', onPinch, { passive: true });

          const resizeObserver = new ResizeObserver(() => {
            google.maps.event.trigger(map, 'resize');
            const displayed = displayedRef.current;
            if (followingRef.current && displayed !== null) map.setCenter(displayed);
          });
          resizeObserver.observe(container);

          const colorQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const onScheme = (): void =>
            map.setOptions({ styles: colorQuery.matches ? DARK_MAP_STYLES : LIGHT_MAP_STYLES });
          colorQuery.addEventListener('change', onScheme);

          cleanups.push(() => {
            dragListener.remove();
            container.removeEventListener('wheel', onUserZoom);
            container.removeEventListener('dblclick', onUserZoom);
            container.removeEventListener('touchstart', onPinch);
            resizeObserver.disconnect();
            colorQuery.removeEventListener('change', onScheme);
            markerOverlay.overlay.setMap(null);
            destinationOverlay?.overlay.setMap(null);
            polyline.setMap(null);
            circle.setMap(null);
          });
          setStatus('ready');
        })
        .catch(() => {
          if (!cancelled) setStatus('error');
        });
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(start);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      cleanups.forEach((cleanup) => cleanup());
      objectsRef.current = null;
    };
  }, [apiKey, attempt, stopFollowing]);

  // Push each new fix onto the map: grow the trail and glide the marker over ~1 s.
  const { position, trail, heading, accuracyM, muted } = props;
  useEffect(() => {
    const objects = objectsRef.current;
    if (status !== 'ready' || objects === null) return;

    const target: LatLng = { lat: position.lat, lng: position.lng };
    const path: LatLng[] = trail.map((point) => ({ lat: point.lat, lng: point.lng }));
    const last = path[path.length - 1];
    if (last === undefined || last.lat !== target.lat || last.lng !== target.lng) path.push(target);
    objects.polyline.setPath(path);
    objects.circle.setRadius(accuracyM ?? 0);
    objects.circle.setVisible(accuracyM !== null);
    objects.marker.setMuted(muted);

    const from = displayedRef.current ?? target;
    const fromHeading = displayedHeadingRef.current;
    const animate =
      !prefersReducedMotion() &&
      metresBetween(from, target) <= MAX_ANIMATED_JUMP_M &&
      metresBetween(from, target) > 0;
    const startedAt = performance.now();
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

    const apply = (ratio: number): void => {
      const next: LatLng = {
        lat: from.lat + (target.lat - from.lat) * ratio,
        lng: from.lng + (target.lng - from.lng) * ratio,
      };
      displayedRef.current = next;
      objects.markerOverlay.setPosition(next);
      objects.circle.setCenter(next);
      if (heading === null) {
        displayedHeadingRef.current = null;
        objects.marker.setHeading(null);
      } else {
        const shown = lerpAngle(fromHeading ?? heading, heading, ratio);
        displayedHeadingRef.current = shown;
        objects.marker.setHeading(shown);
      }
      if (followingRef.current) objects.map.setCenter(next);
    };

    const step = (now: number): void => {
      const ratio = Math.min(1, (now - startedAt) / INTERPOLATION_MS);
      apply(ratio);
      frameRef.current = ratio < 1 ? requestAnimationFrame(step) : null;
    };

    if (animate) {
      frameRef.current = requestAnimationFrame(step);
    } else {
      frameRef.current = null;
      apply(1);
    }
  }, [status, position, trail, heading, accuracyM, muted]);

  const recentre = useCallback((): void => {
    const objects = objectsRef.current;
    const displayed = displayedRef.current;
    followingRef.current = true;
    setFollowing(true);
    if (objects === null || displayed === null) return;
    objects.map.setCenter(displayed);
    if ((objects.map.getZoom() ?? DEFAULT_ZOOM) < MIN_FOLLOW_ZOOM)
      objects.map.setZoom(DEFAULT_ZOOM);
  }, []);

  const failed = apiKey === '' || status === 'error';

  return (
    <div className="relative h-full w-full overflow-hidden bg-track-line/40">
      <div
        ref={containerRef}
        className="absolute inset-0"
        role="img"
        aria-label={messages.currentPosition}
      />
      {status === 'loading' && !failed && (
        <div className="absolute inset-0 animate-pulse bg-track-line/60" aria-hidden="true" />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-track-surface p-6 text-center">
          <MapPinOff className="h-8 w-8 text-track-muted" aria-hidden="true" />
          <p className="max-w-xs text-sm text-track-muted">{messages.mapUnavailable}</p>
          {apiKey !== '' && (
            <button
              type="button"
              onClick={() => {
                setStatus('loading');
                setAttempt((value) => value + 1);
              }}
              className="min-h-11 rounded-full border border-track-line px-5 text-sm font-semibold text-track-ink"
            >
              {messages.mapRetry}
            </button>
          )}
        </div>
      )}
      {status === 'ready' && !following && (
        <button
          type="button"
          onClick={recentre}
          className="absolute bottom-3 right-3 flex min-h-11 items-center gap-2 rounded-full bg-track-surface px-4 text-sm font-semibold text-track-ink shadow-lg ring-1 ring-track-line"
        >
          <LocateFixed className="h-4 w-4 text-primary-red" aria-hidden="true" />
          {messages.recentre}
        </button>
      )}
    </div>
  );
}
