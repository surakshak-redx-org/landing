import type {
  FetchOutcome,
  Fetcher,
  SharingState,
  TrackingBattery,
  TrackingData,
  TrackingDestination,
  TrackingEta,
  TrackingPosition,
  TrailPoint,
} from './types';

const MAX_RETRY_AFTER_MS = 120_000;
const MAX_NAME_LENGTH = 60;
const MAX_TRAIL_POINTS = 500;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function isLat(value: unknown): value is number {
  return isFiniteNumber(value) && value >= -90 && value <= 90;
}

function isLng(value: unknown): value is number {
  return isFiniteNumber(value) && value >= -180 && value <= 180;
}

function isSharingState(value: unknown): value is SharingState {
  return value === 'active' || value === 'lost_contact' || value === 'arrived';
}

function parsePosition(value: unknown): TrackingPosition | null {
  if (!isRecord(value)) return null;
  const { lat, lng, at } = value;
  if (!isLat(lat) || !isLng(lng) || !isIsoDate(at)) return null;
  return { lat, lng, at };
}

function parseTrail(value: unknown): TrailPoint[] {
  if (!Array.isArray(value)) return [];
  const points: TrailPoint[] = [];
  for (const item of value as unknown[]) {
    if (!isRecord(item)) continue;
    const { lat, lng, t } = item;
    if (isLat(lat) && isLng(lng) && isIsoDate(t)) points.push({ lat, lng, t });
  }
  return points.slice(-MAX_TRAIL_POINTS);
}

function parseBattery(value: unknown): TrackingBattery | null {
  if (!isRecord(value) || !isFiniteNumber(value.level)) return null;
  return {
    level: Math.min(1, Math.max(0, value.level)),
    charging: value.charging === true,
  };
}

function parseDestination(value: unknown): TrackingDestination | null {
  if (!isRecord(value)) return null;
  const { name, lat, lng } = value;
  if (typeof name !== 'string' || !isLat(lat) || !isLng(lng)) return null;
  return { name: name.slice(0, 120), lat, lng };
}

function parseEta(value: unknown): TrackingEta | null {
  if (!isRecord(value)) return null;
  const { minutes, computedAt } = value;
  if (!isFiniteNumber(minutes) || minutes < 0 || !isIsoDate(computedAt)) return null;
  return { minutes, computedAt };
}

/**
 * Validates an untrusted 200 body. Returns null when the shape is not usable, which the
 * caller treats as a transient error rather than rendering half-understood data.
 */
export function parseTrackingResponse(body: unknown): TrackingData | null {
  if (!isRecord(body)) return null;
  const { state } = body;
  if (!isSharingState(state)) return null;
  if (!isIsoDate(body.startedAt) || !isIsoDate(body.expiresAt)) return null;

  const position = parsePosition(body.position);
  if (state !== 'arrived' && position === null) return null;

  const name =
    typeof body.name === 'string' && body.name.trim() !== ''
      ? body.name.trim().slice(0, MAX_NAME_LENGTH)
      : null;

  return {
    state,
    name,
    position,
    startedAt: body.startedAt,
    expiresAt: body.expiresAt,
    trail: parseTrail(body.trail),
    battery: parseBattery(body.battery),
    speedMps: isFiniteNumber(body.speedMps) && body.speedMps >= 0 ? body.speedMps : null,
    heading: isFiniteNumber(body.heading) ? ((body.heading % 360) + 360) % 360 : null,
    accuracyM: isFiniteNumber(body.accuracyM) && body.accuracyM > 0 ? body.accuracyM : null,
    destination: parseDestination(body.destination),
    eta: parseEta(body.eta),
  };
}

/** `Retry-After` as delta-seconds. HTTP-date values are treated as unknown. */
export function parseRetryAfter(header: string | null): number | null {
  if (header === null) return null;
  const trimmed = header.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  return Math.min(Number(trimmed) * 1000, MAX_RETRY_AFTER_MS);
}

export function buildTrackingUrl(apiUrl: string, token: string): string {
  const url = new URL(apiUrl);
  url.searchParams.set('t', token);
  return url.toString();
}

export function createApiFetcher(
  apiUrl: string,
  token: string,
  fetchImpl: typeof fetch = fetch,
): Fetcher {
  return async (signal: AbortSignal): Promise<FetchOutcome> => {
    try {
      const response = await fetchImpl(buildTrackingUrl(apiUrl, token), {
        method: 'GET',
        signal,
        cache: 'no-store',
        credentials: 'omit',
        headers: { Accept: 'application/json' },
      });

      if (response.status === 404) return { kind: 'not_found' };
      if (response.status === 410) return { kind: 'ended' };
      if (response.status === 429) {
        return {
          kind: 'rate_limited',
          retryAfterMs: parseRetryAfter(response.headers.get('Retry-After')),
        };
      }
      if (!response.ok) return { kind: 'network_error' };

      const data = parseTrackingResponse((await response.json()) as unknown);
      return data === null ? { kind: 'network_error' } : { kind: 'ok', data };
    } catch {
      // Network failure, abort or unparsable JSON. The poller ignores results of aborted calls.
      return { kind: 'network_error' };
    }
  };
}
