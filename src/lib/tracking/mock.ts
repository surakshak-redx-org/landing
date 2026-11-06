/**
 * DEV-ONLY simulated sender. Never imported statically: `fetcher.ts` loads it with a dynamic
 * import inside a `process.env.NODE_ENV === 'development'` branch, so production bundles
 * do not contain this file. Tokens are 31 zeros plus one digit:
 *
 *   ...0 moving sender (active)      ...4 ended (410)
 *   ...1 lost contact                ...5 invalid link (404)
 *   ...2 stale fix (4 min old)       ...6 network always failing
 *   ...3 arrived                     ...7 network down for 20 s, then moving
 */
import type { FetchOutcome, Fetcher, LatLng, TrackingData, TrailPoint } from './types';

export const DEV_MOCK_MARKER = 'SURAKSHAK_DEV_MOCK';

const MOCK_TOKEN_PATTERN = /^0{31}[0-7]$/;
const SPEED_MPS = 9;
const TRAIL_STEP_MS = 5_000;
const TRAIL_MAX_POINTS = 120;
const LATENCY_MS = 150;

const ROUTE: readonly LatLng[] = [
  { lat: 19.0455, lng: 72.8625 },
  { lat: 19.0455, lng: 72.87 },
  { lat: 19.042, lng: 72.873 },
  { lat: 19.039, lng: 72.87 },
  { lat: 19.039, lng: 72.8625 },
];

const DESTINATION = { name: 'Home', lat: 19.039, lng: 72.8625 } as const;

const sessionStart = Date.now();

function metresBetween(a: LatLng, b: LatLng): number {
  const dLat = (b.lat - a.lat) * 111_320;
  const dLng = (b.lng - a.lng) * 111_320 * Math.cos((a.lat * Math.PI) / 180);
  return Math.hypot(dLat, dLng);
}

function bearing(a: LatLng, b: LatLng): number {
  const dLat = b.lat - a.lat;
  const dLng = (b.lng - a.lng) * Math.cos((a.lat * Math.PI) / 180);
  return ((Math.atan2(dLng, dLat) * 180) / Math.PI + 360) % 360;
}

interface Segment {
  from: LatLng;
  to: LatLng;
  length: number;
}

const SEGMENTS: readonly Segment[] = ROUTE.map((from, index) => {
  const to = ROUTE[(index + 1) % ROUTE.length];
  return { from, to, length: metresBetween(from, to) };
});
const LOOP_LENGTH = SEGMENTS.reduce((sum, segment) => sum + segment.length, 0);

function pointAtDistance(distance: number): LatLng & { heading: number } {
  let remaining = ((distance % LOOP_LENGTH) + LOOP_LENGTH) % LOOP_LENGTH;
  for (const segment of SEGMENTS) {
    if (remaining <= segment.length) {
      const ratio = remaining / segment.length;
      return {
        lat: segment.from.lat + (segment.to.lat - segment.from.lat) * ratio,
        lng: segment.from.lng + (segment.to.lng - segment.from.lng) * ratio,
        heading: bearing(segment.from, segment.to),
      };
    }
    remaining -= segment.length;
  }
  return { ...ROUTE[0], heading: 0 };
}

function distanceAt(timeMs: number): number {
  return 400 + (SPEED_MPS * (timeMs - sessionStart)) / 1000;
}

function baseData(now: number): Omit<TrackingData, 'state' | 'position' | 'trail'> {
  return {
    name: 'Asha',
    startedAt: new Date(sessionStart - 20 * 60_000).toISOString(),
    expiresAt: new Date(sessionStart + 8 * 3_600_000).toISOString(),
    battery: {
      level: Math.max(0.05, 0.62 - ((now - sessionStart) / 60_000) * 0.002),
      charging: false,
    },
    speedMps: SPEED_MPS,
    heading: null,
    accuracyM: 18,
    destination: { ...DESTINATION },
    eta: null,
  };
}

function movingData(now: number): TrackingData {
  const current = pointAtDistance(distanceAt(now));
  const trail: TrailPoint[] = [];
  const oldest = Math.max(sessionStart - 60_000, now - TRAIL_MAX_POINTS * TRAIL_STEP_MS);
  for (let t = now - ((now - oldest) % TRAIL_STEP_MS); t >= oldest; t -= TRAIL_STEP_MS) {
    const point = pointAtDistance(distanceAt(t));
    trail.unshift({ lat: point.lat, lng: point.lng, t: new Date(t).toISOString() });
  }
  const minutes = Math.max(1, Math.round(metresBetween(current, DESTINATION) / SPEED_MPS / 60));
  return {
    ...baseData(now),
    state: 'active',
    position: { lat: current.lat, lng: current.lng, at: new Date(now).toISOString() },
    trail,
    heading: current.heading,
    eta: { minutes, computedAt: new Date(now).toISOString() },
  };
}

function frozenData(now: number, ageMs: number, state: 'active' | 'lost_contact'): TrackingData {
  const at = now - ageMs;
  const point = pointAtDistance(distanceAt(at));
  const trail: TrailPoint[] = [];
  for (let k = 24; k >= 0; k -= 1) {
    const t = at - k * TRAIL_STEP_MS;
    const earlier = pointAtDistance(distanceAt(t));
    trail.push({ lat: earlier.lat, lng: earlier.lng, t: new Date(t).toISOString() });
  }
  return {
    ...baseData(now),
    state,
    position: { lat: point.lat, lng: point.lng, at: new Date(at).toISOString() },
    trail,
    heading: point.heading,
    speedMps: 0,
  };
}

function outcomeFor(scenario: string, now: number): FetchOutcome {
  switch (scenario) {
    case '0':
      return { kind: 'ok', data: movingData(now) };
    case '1':
      return { kind: 'ok', data: frozenData(now, 6 * 60_000, 'lost_contact') };
    case '2':
      return { kind: 'ok', data: frozenData(now, 4 * 60_000, 'active') };
    case '3':
      return {
        kind: 'ok',
        data: { ...baseData(now), state: 'arrived', position: null, trail: [], speedMps: null },
      };
    case '4':
      return { kind: 'ended' };
    case '5':
      return { kind: 'not_found' };
    case '7':
      return now - sessionStart < 20_000
        ? { kind: 'network_error' }
        : { kind: 'ok', data: movingData(now) };
    default:
      return { kind: 'network_error' };
  }
}

export function getMockFetcher(token: string): Fetcher | null {
  if (!MOCK_TOKEN_PATTERN.test(token)) return null;
  const scenario = token.slice(-1);
  return (signal: AbortSignal): Promise<FetchOutcome> =>
    new Promise<FetchOutcome>((resolve) => {
      const timer = setTimeout(() => resolve(outcomeFor(scenario, Date.now())), LATENCY_MS);
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        resolve({ kind: 'network_error' });
      });
    });
}
