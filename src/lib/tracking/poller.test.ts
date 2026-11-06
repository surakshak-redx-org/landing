import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  BACKOFF_MAX_MS,
  POLL_INTERVAL_MS,
  backoffDelay,
  createPoller,
  type Poller,
} from './poller';
import type { FetchOutcome, TrackingData } from './types';

const ACTIVE: TrackingData = {
  state: 'active',
  name: 'Asha',
  position: { lat: 19.04, lng: 72.87, at: '2026-11-06T12:00:00.000Z' },
  startedAt: '2026-11-06T11:00:00.000Z',
  expiresAt: '2026-11-06T19:00:00.000Z',
  trail: [],
  battery: null,
  speedMps: null,
  heading: null,
  accuracyM: null,
  destination: null,
  eta: null,
};

const OK: FetchOutcome = { kind: 'ok', data: ACTIVE };
const FAIL: FetchOutcome = { kind: 'network_error' };

interface Harness {
  poller: Poller;
  fetchOnce: ReturnType<typeof vi.fn>;
  onOutcome: ReturnType<typeof vi.fn>;
  signals: AbortSignal[];
  setHidden: (hidden: boolean) => void;
  listenerCount: () => number;
}

/** Outcomes are consumed in order; the last one repeats. */
function createHarness(outcomes: FetchOutcome[], startHidden = false): Harness {
  let hidden = startHidden;
  let index = 0;
  const listeners = new Set<() => void>();
  const signals: AbortSignal[] = [];
  const fetchOnce = vi.fn((signal: AbortSignal): Promise<FetchOutcome> => {
    signals.push(signal);
    const outcome = outcomes[Math.min(index, outcomes.length - 1)];
    index += 1;
    return Promise.resolve(outcome);
  });
  const onOutcome = vi.fn();
  const poller = createPoller({
    fetchOnce,
    onOutcome,
    isHidden: () => hidden,
    subscribeVisibility: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  });
  return {
    poller,
    fetchOnce,
    onOutcome,
    signals,
    setHidden: (value) => {
      hidden = value;
      listeners.forEach((listener) => listener());
    },
    listenerCount: () => listeners.size,
  };
}

async function advance(ms: number): Promise<void> {
  await vi.advanceTimersByTimeAsync(ms);
}

describe('backoffDelay', () => {
  it('doubles from 5 s and caps at 30 s', () => {
    expect([1, 2, 3, 4, 5, 6, 20].map(backoffDelay)).toEqual([
      5_000, 10_000, 20_000, 30_000, 30_000, 30_000, 30_000,
    ]);
    expect(BACKOFF_MAX_MS).toBe(30_000);
  });
});

describe('createPoller', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('fetches immediately, then every 5 seconds', async () => {
    const h = createHarness([OK]);
    h.poller.start();
    await advance(0);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);
    await advance(POLL_INTERVAL_MS - 1);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);
    await advance(1);
    expect(h.fetchOnce).toHaveBeenCalledTimes(2);
    await advance(POLL_INTERVAL_MS);
    expect(h.fetchOnce).toHaveBeenCalledTimes(3);
    expect(h.onOutcome).toHaveBeenCalledWith(OK);
    h.poller.stop();
  });

  it('backs off 5 s, 10 s, 20 s, then 30 s on repeated network errors', async () => {
    const h = createHarness([FAIL]);
    h.poller.start();
    await advance(0);
    const expectedGaps = [5_000, 10_000, 20_000, 30_000, 30_000];
    let calls = 1;
    for (const gap of expectedGaps) {
      expect(h.fetchOnce).toHaveBeenCalledTimes(calls);
      await advance(gap - 1);
      expect(h.fetchOnce).toHaveBeenCalledTimes(calls);
      await advance(1);
      calls += 1;
      expect(h.fetchOnce).toHaveBeenCalledTimes(calls);
    }
    h.poller.stop();
  });

  it('resets the backoff after a success', async () => {
    const h = createHarness([FAIL, FAIL, OK, FAIL]);
    h.poller.start();
    await advance(0); // fail #1
    await advance(5_000); // fail #2
    await advance(10_000); // success
    expect(h.fetchOnce).toHaveBeenCalledTimes(3);
    await advance(5_000); // normal interval after success -> failure
    expect(h.fetchOnce).toHaveBeenCalledTimes(4);
    // Backoff restarted at 5 s (not 20 s).
    await advance(5_000);
    expect(h.fetchOnce).toHaveBeenCalledTimes(5);
    h.poller.stop();
  });

  it('reports each network error so the UI can show "Reconnecting"', async () => {
    const h = createHarness([FAIL]);
    h.poller.start();
    await advance(0);
    expect(h.onOutcome).toHaveBeenCalledWith(FAIL);
    h.poller.stop();
  });

  it('pauses while hidden, aborts the in-flight request, and refetches when visible', async () => {
    const h = createHarness([OK]);
    h.poller.start();
    await advance(0);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);

    h.setHidden(true);
    await advance(60_000);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);

    h.setHidden(false);
    await advance(0);
    expect(h.fetchOnce).toHaveBeenCalledTimes(2);
    await advance(POLL_INTERVAL_MS);
    expect(h.fetchOnce).toHaveBeenCalledTimes(3);
    h.poller.stop();
  });

  it('aborts a request that is still in flight when the tab is hidden and drops its result', async () => {
    let resolveFetch: (outcome: FetchOutcome) => void = () => undefined;
    const signals: AbortSignal[] = [];
    const onOutcome = vi.fn();
    let hidden = false;
    let listener: () => void = () => undefined;
    const poller = createPoller({
      fetchOnce: (signal) => {
        signals.push(signal);
        return new Promise<FetchOutcome>((resolve) => {
          resolveFetch = resolve;
        });
      },
      onOutcome,
      isHidden: () => hidden,
      subscribeVisibility: (next) => {
        listener = next;
        return () => undefined;
      },
    });
    poller.start();
    await advance(0);
    hidden = true;
    listener();
    expect(signals[0].aborted).toBe(true);
    resolveFetch(OK);
    await advance(0);
    expect(onOutcome).not.toHaveBeenCalled();
    poller.stop();
  });

  it('does not fetch while hidden at start, and fetches once visible', async () => {
    const h = createHarness([OK], true);
    h.poller.start();
    await advance(30_000);
    expect(h.fetchOnce).not.toHaveBeenCalled();
    h.setHidden(false);
    await advance(0);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);
    h.poller.stop();
  });

  it.each([
    ['404 (not found)', { kind: 'not_found' } as FetchOutcome],
    ['410 (ended)', { kind: 'ended' } as FetchOutcome],
    [
      'arrived',
      { kind: 'ok', data: { ...ACTIVE, state: 'arrived', position: null } } as FetchOutcome,
    ],
  ])('stops polling for good on %s', async (_label, outcome) => {
    const h = createHarness([outcome]);
    h.poller.start();
    await advance(0);
    expect(h.onOutcome).toHaveBeenCalledWith(outcome);
    await advance(10 * 60_000);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);
    expect(h.listenerCount()).toBe(0);
    h.setHidden(true);
    h.setHidden(false);
    await advance(60_000);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);
  });

  it('waits for Retry-After on 429 when it is longer than the interval', async () => {
    const h = createHarness([{ kind: 'rate_limited', retryAfterMs: 12_000 }, OK]);
    h.poller.start();
    await advance(0);
    await advance(11_999);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);
    await advance(1);
    expect(h.fetchOnce).toHaveBeenCalledTimes(2);
    h.poller.stop();
  });

  it('never polls faster than the normal interval, even if Retry-After is short', async () => {
    const h = createHarness([{ kind: 'rate_limited', retryAfterMs: 1_000 }, OK]);
    h.poller.start();
    await advance(0);
    await advance(4_999);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);
    await advance(1);
    expect(h.fetchOnce).toHaveBeenCalledTimes(2);
    h.poller.stop();
  });

  it('falls back to backoff on 429 without a Retry-After', async () => {
    const h = createHarness([{ kind: 'rate_limited', retryAfterMs: null }]);
    h.poller.start();
    await advance(0);
    await advance(5_000);
    expect(h.fetchOnce).toHaveBeenCalledTimes(2);
    await advance(9_999);
    expect(h.fetchOnce).toHaveBeenCalledTimes(2);
    await advance(1);
    expect(h.fetchOnce).toHaveBeenCalledTimes(3);
    h.poller.stop();
  });

  it('aborts in-flight work and stops on unmount (stop)', async () => {
    const h = createHarness([OK]);
    h.poller.start();
    await advance(0);
    h.poller.stop();
    await advance(60_000);
    expect(h.fetchOnce).toHaveBeenCalledTimes(1);
    expect(h.listenerCount()).toBe(0);
  });

  it('aborts the pending request when stopped mid-flight', async () => {
    const signals: AbortSignal[] = [];
    const poller = createPoller({
      fetchOnce: (signal) => {
        signals.push(signal);
        return new Promise<FetchOutcome>(() => undefined);
      },
      onOutcome: () => undefined,
      isHidden: () => false,
      subscribeVisibility: () => () => undefined,
    });
    poller.start();
    await advance(0);
    expect(signals[0].aborted).toBe(false);
    poller.stop();
    expect(signals[0].aborted).toBe(true);
  });
});
