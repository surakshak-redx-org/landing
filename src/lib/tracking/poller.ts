import type { FetchOutcome, Fetcher } from './types';

export const POLL_INTERVAL_MS = 5_000;
export const BACKOFF_BASE_MS = 5_000;
export const BACKOFF_MAX_MS = 30_000;

/** Delay after the Nth consecutive failure (N >= 1): 5 s, 10 s, 20 s, then capped at 30 s. */
export function backoffDelay(consecutiveFailures: number): number {
  const step = Math.max(1, Math.floor(consecutiveFailures)) - 1;
  return Math.min(BACKOFF_BASE_MS * 2 ** step, BACKOFF_MAX_MS);
}

export interface PollerDeps {
  fetchOnce: Fetcher;
  onOutcome: (outcome: FetchOutcome) => void;
  isHidden: () => boolean;
  /** Subscribes to visibility changes and returns the unsubscribe function. */
  subscribeVisibility: (listener: () => void) => () => void;
}

export interface Poller {
  start: () => void;
  stop: () => void;
}

/**
 * Polls on a fixed interval with these rules:
 * - paused while hidden (in-flight request aborted), immediate refetch when visible again;
 * - network errors keep polling with exponential backoff, reset on success;
 * - 404, 410 and `arrived` stop polling for good;
 * - 429 waits for `Retry-After` (never less than the normal interval).
 */
export function createPoller(deps: PollerDeps): Poller {
  let stopped = true;
  let failures = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let controller: AbortController | null = null;
  let unsubscribe: (() => void) | null = null;

  function clearTimer(): void {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function abortInFlight(): void {
    if (controller !== null) {
      controller.abort();
      controller = null;
    }
  }

  function schedule(delayMs: number): void {
    clearTimer();
    // While hidden nothing is scheduled; the visibility listener restarts polling.
    if (stopped || deps.isHidden()) return;
    timer = setTimeout(() => {
      timer = null;
      void tick();
    }, delayMs);
  }

  function handle(outcome: FetchOutcome): void {
    switch (outcome.kind) {
      case 'ok':
        failures = 0;
        deps.onOutcome(outcome);
        if (outcome.data.state === 'arrived') {
          stop();
        } else {
          schedule(POLL_INTERVAL_MS);
        }
        return;
      case 'ended':
      case 'not_found':
        deps.onOutcome(outcome);
        stop();
        return;
      case 'rate_limited':
        deps.onOutcome(outcome);
        if (outcome.retryAfterMs === null) {
          failures += 1;
          schedule(backoffDelay(failures));
        } else {
          schedule(Math.max(outcome.retryAfterMs, POLL_INTERVAL_MS));
        }
        return;
      case 'network_error':
        failures += 1;
        deps.onOutcome(outcome);
        schedule(backoffDelay(failures));
        return;
    }
  }

  async function tick(): Promise<void> {
    if (stopped) return;
    clearTimer();
    abortInFlight();
    const current = new AbortController();
    controller = current;
    const outcome = await deps.fetchOnce(current.signal);
    // Ignore anything that finished after being aborted (hidden tab, unmount).
    if (stopped || current.signal.aborted) return;
    controller = null;
    handle(outcome);
  }

  function onVisibilityChange(): void {
    if (stopped) return;
    if (deps.isHidden()) {
      clearTimer();
      abortInFlight();
    } else if (controller === null) {
      void tick();
    }
  }

  function start(): void {
    if (!stopped) return;
    stopped = false;
    failures = 0;
    unsubscribe = deps.subscribeVisibility(onVisibilityChange);
    if (!deps.isHidden()) void tick();
  }

  function stop(): void {
    stopped = true;
    clearTimer();
    abortInFlight();
    if (unsubscribe !== null) {
      unsubscribe();
      unsubscribe = null;
    }
  }

  return { start, stop };
}
