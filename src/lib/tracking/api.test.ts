import { describe, expect, it, vi } from 'vitest';

import { createApiFetcher, parseRetryAfter, parseTrackingResponse } from './api';

const VALID_BODY = {
  state: 'active',
  name: 'Asha',
  position: { lat: 19.04, lng: 72.87, at: '2026-11-06T12:00:00.000Z' },
  startedAt: '2026-11-06T11:00:00.000Z',
  expiresAt: '2026-11-06T19:00:00.000Z',
  trail: [{ lat: 19.03, lng: 72.86, t: '2026-11-06T11:59:55.000Z' }],
  battery: { level: 0.5, charging: true },
  speedMps: 3,
  heading: 370,
  accuracyM: 12,
  destination: { name: 'Home', lat: 19.0, lng: 72.8 },
  eta: { minutes: 9, computedAt: '2026-11-06T12:00:00.000Z' },
};

const TOKEN = '0123456789abcdef0123456789abcdef';
const API = 'https://api.example.test/liveTrack';

function jsonResponse(status: number, body: unknown, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers });
}

describe('parseTrackingResponse', () => {
  it('parses a full response and normalises heading', () => {
    const data = parseTrackingResponse(VALID_BODY);
    expect(data?.state).toBe('active');
    expect(data?.name).toBe('Asha');
    expect(data?.heading).toBe(10);
    expect(data?.trail).toHaveLength(1);
    expect(data?.destination?.name).toBe('Home');
  });

  it('treats a missing or blank name as null', () => {
    expect(parseTrackingResponse({ ...VALID_BODY, name: null })?.name).toBeNull();
    expect(parseTrackingResponse({ ...VALID_BODY, name: '   ' })?.name).toBeNull();
    expect(parseTrackingResponse({ ...VALID_BODY, name: undefined })?.name).toBeNull();
  });

  it('accepts arrived without a position', () => {
    const arrived = { ...VALID_BODY, state: 'arrived', position: undefined };
    expect(parseTrackingResponse(arrived)?.position).toBeNull();
  });

  it('rejects active or lost_contact without a position', () => {
    const noPosition = { ...VALID_BODY, position: undefined };
    expect(parseTrackingResponse({ ...noPosition, state: 'active' })).toBeNull();
    expect(parseTrackingResponse({ ...noPosition, state: 'lost_contact' })).toBeNull();
  });

  it.each([
    ['null', null],
    ['an array', []],
    ['an unknown state', { ...VALID_BODY, state: 'paused' }],
    [
      'an out-of-range latitude',
      { ...VALID_BODY, position: { lat: 91, lng: 0, at: VALID_BODY.startedAt } },
    ],
    ['a bad timestamp', { ...VALID_BODY, startedAt: 'yesterday' }],
  ])('rejects %s', (_label, body) => {
    expect(parseTrackingResponse(body)).toBeNull();
  });

  it('drops malformed optional fields instead of failing', () => {
    const data = parseTrackingResponse({
      ...VALID_BODY,
      battery: 'full',
      destination: { name: 5 },
      eta: { minutes: -1 },
      trail: [{ lat: 'x' }, VALID_BODY.trail[0]],
    });
    expect(data?.battery).toBeNull();
    expect(data?.destination).toBeNull();
    expect(data?.eta).toBeNull();
    expect(data?.trail).toHaveLength(1);
  });

  it('clamps battery level to 0..1', () => {
    expect(
      parseTrackingResponse({ ...VALID_BODY, battery: { level: 4, charging: false } })?.battery
        ?.level,
    ).toBe(1);
  });
});

describe('parseRetryAfter', () => {
  it('reads delta-seconds as milliseconds and caps at two minutes', () => {
    expect(parseRetryAfter('7')).toBe(7_000);
    expect(parseRetryAfter('99999')).toBe(120_000);
  });

  it('returns null for missing, empty or HTTP-date values', () => {
    expect(parseRetryAfter(null)).toBeNull();
    expect(parseRetryAfter('')).toBeNull();
    expect(parseRetryAfter('Wed, 21 Oct 2026 07:28:00 GMT')).toBeNull();
  });
});

describe('createApiFetcher', () => {
  const controller = new AbortController();

  it('requests ?t=<token> without credentials or caching', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(jsonResponse(200, VALID_BODY)));
    const outcome = await createApiFetcher(API, TOKEN, fetchImpl)(controller.signal);
    expect(outcome.kind).toBe('ok');
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(`${API}?t=${TOKEN}`);
    expect(init.credentials).toBe('omit');
    expect(init.cache).toBe('no-store');
  });

  it('keeps existing query parameters on the API URL', async () => {
    const fetchImpl = vi.fn(() => Promise.resolve(jsonResponse(200, VALID_BODY)));
    await createApiFetcher(`${API}?v=1`, TOKEN, fetchImpl)(controller.signal);
    expect((fetchImpl.mock.calls[0] as unknown as [string])[0]).toBe(`${API}?v=1&t=${TOKEN}`);
  });

  it.each([
    [404, { kind: 'not_found' }],
    [410, { kind: 'ended' }],
    [500, { kind: 'network_error' }],
    [503, { kind: 'network_error' }],
    [403, { kind: 'network_error' }],
  ])('maps HTTP %i', async (status, expected) => {
    const fetchImpl = vi.fn(() => Promise.resolve(jsonResponse(status, {})));
    expect(await createApiFetcher(API, TOKEN, fetchImpl)(controller.signal)).toEqual(expected);
  });

  it('maps 429 with Retry-After', async () => {
    const fetchImpl = vi.fn(() =>
      Promise.resolve(jsonResponse(429, { error: 'rate_limited' }, { 'Retry-After': '9' })),
    );
    expect(await createApiFetcher(API, TOKEN, fetchImpl)(controller.signal)).toEqual({
      kind: 'rate_limited',
      retryAfterMs: 9_000,
    });
  });

  it('treats thrown fetch errors and unusable 200 bodies as transient errors', async () => {
    const failing = vi.fn(() => Promise.reject(new TypeError('Failed to fetch')));
    expect(await createApiFetcher(API, TOKEN, failing)(controller.signal)).toEqual({
      kind: 'network_error',
    });
    const garbage = vi.fn(() => Promise.resolve(jsonResponse(200, { hello: 'world' })));
    expect(await createApiFetcher(API, TOKEN, garbage)(controller.signal)).toEqual({
      kind: 'network_error',
    });
  });
});
