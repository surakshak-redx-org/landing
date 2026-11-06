// Read lazily and by literal name so Next.js can inline NEXT_PUBLIC_* values at build time.

export function getTrackingApiUrl(): string {
  return (process.env.NEXT_PUBLIC_TRACKING_API_URL ?? '').trim();
}

export function getMapsApiKey(): string {
  return (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_WEB ?? '').trim();
}
