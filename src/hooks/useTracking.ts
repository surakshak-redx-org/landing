'use client';

import { useEffect, useState } from 'react';

import { resolveFetcher } from '@/lib/tracking/fetcher';
import { createPoller, type Poller } from '@/lib/tracking/poller';
import { INITIAL_TRACKING_STATE, reduceOutcome, type TrackingState } from '@/lib/tracking/state';
import { isValidToken } from '@/lib/tracking/token';

export interface UseTrackingResult {
  state: TrackingState;
  /** True when the tracking API URL is missing or malformed. */
  configError: boolean;
}

const INVALID_STATE: TrackingState = { phase: 'invalid', data: null, reconnecting: false };

/** Polls the tracking API for `token` and exposes the latest view state. */
export function useTracking(token: string): UseTrackingResult {
  const valid = isValidToken(token);
  const [state, setState] = useState<TrackingState>(INITIAL_TRACKING_STATE);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    // A malformed token never reaches the network.
    if (!valid) return;
    let cancelled = false;
    let poller: Poller | null = null;

    void resolveFetcher(token).then((fetchOnce) => {
      if (cancelled) return;
      if (fetchOnce === null) {
        setConfigError(true);
        return;
      }
      poller = createPoller({
        fetchOnce,
        onOutcome: (outcome) => setState((previous) => reduceOutcome(previous, outcome)),
        isHidden: () => document.visibilityState === 'hidden',
        subscribeVisibility: (listener) => {
          document.addEventListener('visibilitychange', listener);
          return () => document.removeEventListener('visibilitychange', listener);
        },
      });
      poller.start();
    });

    return () => {
      cancelled = true;
      poller?.stop();
    };
  }, [token, valid]);

  return { state: valid ? state : INVALID_STATE, configError };
}
