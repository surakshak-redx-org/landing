import { describe, expect, it } from 'vitest';

import {
  STALE_AFTER_MS,
  WALKING_SPEED_MPS,
  batteryPercent,
  deriveLiveKind,
  deriveViewKind,
  isBatteryLow,
  isStale,
  speedToShow,
} from './derive';
import { INITIAL_TRACKING_STATE, reduceOutcome } from './state';
import type { TrackingData } from './types';

const NOW = Date.parse('2026-11-06T12:00:00.000Z');

function dataWith(overrides: Partial<TrackingData>, ageMs = 0): TrackingData {
  return {
    state: 'active',
    name: 'Asha',
    position: { lat: 19.04, lng: 72.87, at: new Date(NOW - ageMs).toISOString() },
    startedAt: '2026-11-06T11:00:00.000Z',
    expiresAt: '2026-11-06T19:00:00.000Z',
    trail: [],
    battery: null,
    speedMps: null,
    heading: null,
    accuracyM: null,
    destination: null,
    eta: null,
    ...overrides,
  };
}

describe('stale badge threshold', () => {
  it('is 2 minutes', () => {
    expect(STALE_AFTER_MS).toBe(120_000);
  });

  it('is not stale at exactly 2 minutes, stale just after', () => {
    const at = new Date(NOW - 120_000).toISOString();
    expect(isStale(at, NOW)).toBe(false);
    expect(isStale(at, NOW + 1)).toBe(true);
  });

  it('derives active, stale and lost_contact', () => {
    expect(deriveLiveKind(dataWith({}, 10_000), NOW)).toBe('active');
    expect(deriveLiveKind(dataWith({}, 121_000), NOW)).toBe('stale');
    expect(deriveLiveKind(dataWith({ state: 'lost_contact' }, 5 * 60_000), NOW)).toBe(
      'lost_contact',
    );
    expect(deriveLiveKind(dataWith({ state: 'lost_contact' }, 1_000), NOW)).toBe('lost_contact');
  });

  it('derives arrived', () => {
    expect(deriveViewKind(dataWith({ state: 'arrived', position: null }), NOW)).toBe('arrived');
  });
});

describe('speed, battery', () => {
  it('shows speed only above walking pace', () => {
    expect(speedToShow(null)).toBeNull();
    expect(speedToShow(0)).toBeNull();
    expect(speedToShow(WALKING_SPEED_MPS)).toBeNull();
    expect(speedToShow(WALKING_SPEED_MPS + 0.1)).toBe(8);
    expect(speedToShow(10)).toBe(36);
  });

  it('flags battery under 15% only', () => {
    expect(isBatteryLow(0.149)).toBe(true);
    expect(isBatteryLow(0.15)).toBe(false);
    expect(batteryPercent(0.826)).toBe(83);
  });
});

describe('reduceOutcome', () => {
  const ok = { kind: 'ok', data: dataWith({}) } as const;

  it('goes live on success', () => {
    const next = reduceOutcome(INITIAL_TRACKING_STATE, ok);
    expect(next).toMatchObject({ phase: 'live', reconnecting: false });
    expect(next.data).toBe(ok.data);
  });

  it('keeps the last view and flags reconnecting on network errors and 429', () => {
    const live = reduceOutcome(INITIAL_TRACKING_STATE, ok);
    for (const outcome of [
      { kind: 'network_error' },
      { kind: 'rate_limited', retryAfterMs: 5_000 },
    ] as const) {
      const next = reduceOutcome(live, outcome);
      expect(next.phase).toBe('live');
      expect(next.data).toBe(ok.data);
      expect(next.reconnecting).toBe(true);
      expect(reduceOutcome(next, ok).reconnecting).toBe(false);
    }
  });

  it('shows the loading state with a notice if the very first poll fails', () => {
    const next = reduceOutcome(INITIAL_TRACKING_STATE, { kind: 'network_error' });
    expect(next).toMatchObject({ phase: 'loading', data: null, reconnecting: true });
  });

  it('discards the last position when sharing ends or the link is invalid', () => {
    const live = reduceOutcome(INITIAL_TRACKING_STATE, ok);
    expect(reduceOutcome(live, { kind: 'ended' })).toEqual({
      phase: 'ended',
      data: null,
      reconnecting: false,
    });
    expect(reduceOutcome(live, { kind: 'not_found' })).toEqual({
      phase: 'invalid',
      data: null,
      reconnecting: false,
    });
  });
});
