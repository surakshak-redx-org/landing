const CALLBACK_NAME = '__surakshakMapsReady';
const LOAD_TIMEOUT_MS = 20_000;

let pending: Promise<void> | null = null;

function injectScript(apiKey: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const callbacks = window as unknown as Record<string, unknown>;
    const script = document.createElement('script');
    const timeout = setTimeout(() => fail(new Error('Google Maps timed out')), LOAD_TIMEOUT_MS);

    function cleanup(): void {
      clearTimeout(timeout);
      delete callbacks[CALLBACK_NAME];
    }

    function fail(error: Error): void {
      cleanup();
      script.remove();
      reject(error);
    }

    callbacks[CALLBACK_NAME] = (): void => {
      cleanup();
      resolve();
    };

    const params = new URLSearchParams({
      key: apiKey,
      v: 'weekly',
      loading: 'async',
      callback: CALLBACK_NAME,
    });
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = (): void => fail(new Error('Google Maps failed to load'));
    document.head.appendChild(script);
  });
}

/**
 * Loads the Maps JavaScript API once. Call it after first paint, never during render.
 * A failed load can be retried by calling it again.
 */
export function loadGoogleMaps(apiKey: string): Promise<void> {
  if (pending === null) {
    pending = injectScript(apiKey)
      .then(async () => {
        await google.maps.importLibrary('core');
        await google.maps.importLibrary('maps');
      })
      .catch((error: unknown) => {
        pending = null;
        throw error;
      });
  }
  return pending;
}
