import { createApiFetcher } from './api';
import { getTrackingApiUrl } from './config';
import type { Fetcher } from './types';

/**
 * Chooses where polls go. Returns null when `NEXT_PUBLIC_TRACKING_API_URL` is not configured
 * (the page then shows its configuration-error state).
 *
 * The dev mock is loaded with a dynamic import inside a build-time `NODE_ENV` check, so it is
 * removed from production bundles entirely.
 */
export async function resolveFetcher(token: string): Promise<Fetcher | null> {
  if (process.env.NODE_ENV === 'development') {
    const { getMockFetcher } = await import('./mock');
    const mock = getMockFetcher(token);
    if (mock !== null) return mock;
  }
  const apiUrl = getTrackingApiUrl();
  if (apiUrl === '') return null;
  try {
    new URL(apiUrl);
    return createApiFetcher(apiUrl, token);
  } catch {
    // Malformed NEXT_PUBLIC_TRACKING_API_URL.
    return null;
  }
}
