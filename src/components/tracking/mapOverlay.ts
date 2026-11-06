import type { LatLng } from '@/lib/tracking/types';

/*
 * DOM overlays for the Google map. They live in components/ (not lib/) so Tailwind scans the
 * class names used below. The only imperative `style` writes are per-frame transforms
 * (position and heading) that cannot be expressed as static classes.
 */

export interface PositionedOverlay {
  /** The Google overlay; call `setMap(map)` / `setMap(null)` to attach and detach it. */
  overlay: google.maps.OverlayView;
  setPosition: (position: LatLng) => void;
}

/** Creates an overlay that pins `element` (positioned at its top-left corner) to a map point. */
export function createPositionedOverlay(element: HTMLElement, initial: LatLng): PositionedOverlay {
  class ElementOverlay extends google.maps.OverlayView {
    private position: google.maps.LatLng = new google.maps.LatLng(initial.lat, initial.lng);

    onAdd(): void {
      this.getPanes()?.overlayMouseTarget.appendChild(element);
    }

    draw(): void {
      const point = this.getProjection()?.fromLatLngToDivPixel(this.position);
      if (point) element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
    }

    onRemove(): void {
      element.remove();
    }

    moveTo(next: LatLng): void {
      this.position = new google.maps.LatLng(next.lat, next.lng);
      this.draw();
    }
  }

  const overlay = new ElementOverlay();
  return { overlay, setPosition: (position) => overlay.moveTo(position) };
}

export interface SenderMarker {
  element: HTMLElement;
  /** Degrees clockwise from north, or null to hide the direction arrow. */
  setHeading: (degrees: number | null) => void;
  /** Greys the marker out when the last fix is stale or contact was lost. */
  setMuted: (muted: boolean) => void;
}

export function createSenderMarker(): SenderMarker {
  const element = document.createElement('div');
  element.className = 'pointer-events-none absolute left-0 top-0 will-change-transform';
  element.innerHTML =
    '<div data-marker class="relative h-10 w-10 -translate-x-1/2 -translate-y-1/2">' +
    '<span data-pulse class="absolute inset-1 rounded-full bg-primary-red/30 animate-pulse-ring motion-reduce:animate-none"></span>' +
    '<svg data-rotor viewBox="0 0 40 40" class="absolute inset-0 h-10 w-10" aria-hidden="true">' +
    '<path data-arrow d="M20 1 L27 13 L13 13 Z" fill="#D4380D" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" class="hidden"/>' +
    '<circle data-dot cx="20" cy="20" r="9" fill="#D4380D" stroke="#fff" stroke-width="3"/>' +
    '</svg></div>';

  const marker = element.querySelector<HTMLElement>('[data-marker]');
  const rotor = element.querySelector<SVGElement>('[data-rotor]');
  const arrow = element.querySelector<SVGElement>('[data-arrow]');
  const dot = element.querySelector<SVGElement>('[data-dot]');
  const pulse = element.querySelector<HTMLElement>('[data-pulse]');

  return {
    element,
    setHeading: (degrees) => {
      if (rotor === null || arrow === null) return;
      if (degrees === null) {
        arrow.classList.add('hidden');
        rotor.style.transform = '';
        return;
      }
      arrow.classList.remove('hidden');
      rotor.style.transform = `rotate(${degrees}deg)`;
    },
    setMuted: (muted) => {
      pulse?.classList.toggle('hidden', muted);
      marker?.classList.toggle('opacity-80', muted);
      dot?.setAttribute('fill', muted ? '#8c8c8c' : '#D4380D');
      arrow?.setAttribute('fill', muted ? '#8c8c8c' : '#D4380D');
    },
  };
}

/** Destination pin, anchored by its tip. */
export function createDestinationPin(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'pointer-events-none absolute left-0 top-0 will-change-transform';
  element.innerHTML =
    '<svg viewBox="0 0 32 40" class="h-10 w-8 -translate-x-1/2 -translate-y-full drop-shadow" aria-hidden="true">' +
    '<path d="M16 39 C16 39 3 24 3 15 a13 13 0 1 1 26 0 C29 24 16 39 16 39 Z" fill="#389E0D" stroke="#fff" stroke-width="2"/>' +
    '<circle cx="16" cy="15" r="5" fill="#fff"/></svg>';
  return element;
}

export const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#1f2933' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9aa5b1' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1f2933' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#3e4c59' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#323f4b' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1f2933' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#52606d' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#102a43' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#627d98' }] },
];

export const LIGHT_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];
