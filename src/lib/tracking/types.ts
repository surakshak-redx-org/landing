export interface LatLng {
  lat: number;
  lng: number;
}

export interface TrackingPosition extends LatLng {
  /** ISO timestamp of the GPS fix. */
  at: string;
}

export interface TrailPoint extends LatLng {
  /** ISO timestamp of the GPS fix. */
  t: string;
}

export type SharingState = 'active' | 'lost_contact' | 'arrived';

export interface TrackingBattery {
  /** 0..1 */
  level: number;
  charging: boolean;
}

export interface TrackingDestination extends LatLng {
  name: string;
}

export interface TrackingEta {
  minutes: number;
  computedAt: string;
}

/** A validated 200 response from the tracking API. */
export interface TrackingData {
  state: SharingState;
  name: string | null;
  /** Omitted by the API when the state is `arrived`. */
  position: TrackingPosition | null;
  startedAt: string;
  expiresAt: string;
  /** Oldest first. */
  trail: TrailPoint[];
  battery: TrackingBattery | null;
  speedMps: number | null;
  /** Degrees clockwise from north. */
  heading: number | null;
  accuracyM: number | null;
  destination: TrackingDestination | null;
  eta: TrackingEta | null;
}

/** Everything one poll can come back with. */
export type FetchOutcome =
  | { kind: 'ok'; data: TrackingData }
  | { kind: 'ended' }
  | { kind: 'not_found' }
  | { kind: 'rate_limited'; retryAfterMs: number | null }
  | { kind: 'network_error' };

export type Fetcher = (signal: AbortSignal) => Promise<FetchOutcome>;
