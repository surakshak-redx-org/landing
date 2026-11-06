import type { LatLng, TrackingData } from './types';

/** A fix older than this is shown with the amber "Last updated" badge. */
export const STALE_AFTER_MS = 2 * 60 * 1000;

/** Speed is only shown above this (about 7 km/h, a brisk walk). */
export const WALKING_SPEED_MPS = 2;

/** Battery at or below this level is flagged red. */
export const LOW_BATTERY_LEVEL = 0.15;

/** States that show the map and bottom sheet. */
export type LiveKind = 'active' | 'stale' | 'lost_contact';
export type ViewKind = LiveKind | 'arrived';

export function isStale(positionAt: string, nowMs: number): boolean {
  return nowMs - Date.parse(positionAt) > STALE_AFTER_MS;
}

/** `lost_contact` wins over staleness; otherwise an old fix makes an active share `stale`. */
export function deriveLiveKind(data: TrackingData, nowMs: number): LiveKind {
  if (data.state === 'lost_contact') return 'lost_contact';
  return data.position !== null && isStale(data.position.at, nowMs) ? 'stale' : 'active';
}

export function deriveViewKind(data: TrackingData, nowMs: number): ViewKind {
  return data.state === 'arrived' ? 'arrived' : deriveLiveKind(data, nowMs);
}

/** Whole km/h, or null when the sender is at walking pace or slower (or speed is unknown). */
export function speedToShow(speedMps: number | null): number | null {
  if (speedMps === null || speedMps <= WALKING_SPEED_MPS) return null;
  return Math.round(speedMps * 3.6);
}

export function batteryPercent(level: number): number {
  return Math.round(level * 100);
}

export function isBatteryLow(level: number): boolean {
  return level < LOW_BATTERY_LEVEL;
}

export function googleMapsLink(point: LatLng): string {
  return `https://www.google.com/maps?q=${point.lat},${point.lng}`;
}
