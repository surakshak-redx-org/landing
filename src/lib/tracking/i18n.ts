export type Locale = 'en' | 'hi' | 'mr';

export const LOCALES: readonly Locale[] = ['en', 'hi', 'mr'];

/** Latin digits are forced in every language so numbers read the same everywhere. */
const INTL_TAGS: Record<Locale, string> = {
  en: 'en-IN-u-nu-latn',
  hi: 'hi-IN-u-nu-latn',
  mr: 'mr-IN-u-nu-latn',
};

export const LOCALE_LABELS: Record<Locale, { short: string; full: string }> = {
  en: { short: 'EN', full: 'English' },
  hi: { short: 'हिं', full: 'हिन्दी' },
  mr: { short: 'मरा', full: 'मराठी' },
};

/** Picks the first supported language from `navigator.languages`, falling back to English. */
export function detectLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = language.toLowerCase().split('-')[0];
    if (base === 'hi') return 'hi';
    if (base === 'mr') return 'mr';
    if (base === 'en') return 'en';
  }
  return 'en';
}

/** Short clock time such as "21:42" or "9:42 pm", in the viewer's time zone. */
export function formatClock(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL_TAGS[locale], {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

/** "now", "25 seconds ago", "3 minutes ago", ... via Intl.RelativeTimeFormat. */
export function formatRelative(iso: string, nowMs: number, locale: Locale): string {
  const formatter = new Intl.RelativeTimeFormat(INTL_TAGS[locale], { numeric: 'auto' });
  const seconds = Math.max(0, Math.round((nowMs - Date.parse(iso)) / 1000));
  if (seconds < 10) return formatter.format(0, 'second');
  if (seconds < 60) return formatter.format(-seconds, 'second');
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return formatter.format(-minutes, 'minute');
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return formatter.format(-hours, 'hour');
  return formatter.format(-Math.floor(hours / 24), 'day');
}
