import type { FetchOutcome, TrackingData } from './types';

export type TrackingPhase = 'loading' | 'live' | 'ended' | 'invalid';

export interface TrackingState {
  phase: TrackingPhase;
  /** Last good response. Cleared once sharing has ended or the link is invalid. */
  data: TrackingData | null;
  /** True while the latest poll failed; the last view stays on screen. */
  reconnecting: boolean;
}

export const INITIAL_TRACKING_STATE: TrackingState = {
  phase: 'loading',
  data: null,
  reconnecting: false,
};

export function reduceOutcome(state: TrackingState, outcome: FetchOutcome): TrackingState {
  switch (outcome.kind) {
    case 'ok':
      return { phase: 'live', data: outcome.data, reconnecting: false };
    case 'ended':
      // Drop the last position: once sharing ends, nothing location-related stays on the page.
      return { phase: 'ended', data: null, reconnecting: false };
    case 'not_found':
      return { phase: 'invalid', data: null, reconnecting: false };
    case 'rate_limited':
    case 'network_error':
      return { ...state, reconnecting: true };
  }
}
