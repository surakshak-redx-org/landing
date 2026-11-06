'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';

import { detectLocale, type Locale } from '@/lib/tracking/i18n';

function subscribe(onChange: () => void): () => void {
  window.addEventListener('languagechange', onChange);
  return () => window.removeEventListener('languagechange', onChange);
}

function getDetected(): Locale {
  return detectLocale(navigator.languages.length > 0 ? navigator.languages : [navigator.language]);
}

function getServerLocale(): Locale {
  return 'en';
}

/**
 * Language from `navigator.languages` (English fallback) with a manual override.
 * The choice is kept in memory only: nothing is written to storage.
 */
export function useTrackingLocale(): { locale: Locale; setLocale: (locale: Locale) => void } {
  const detected = useSyncExternalStore(subscribe, getDetected, getServerLocale);
  const [override, setOverride] = useState<Locale | null>(null);
  const setLocale = useCallback((locale: Locale): void => setOverride(locale), []);
  return { locale: override ?? detected, setLocale };
}
