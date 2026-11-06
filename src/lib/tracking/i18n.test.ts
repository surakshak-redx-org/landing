import { describe, expect, it } from 'vitest';

import { LOCALES, detectLocale, formatClock, formatRelative } from './i18n';
import { MESSAGES } from './messages';

const NOW = Date.parse('2026-11-06T12:00:00.000Z');
const ago = (ms: number): string => new Date(NOW - ms).toISOString();

describe('detectLocale', () => {
  it('picks the first supported language', () => {
    expect(detectLocale(['hi-IN', 'en'])).toBe('hi');
    expect(detectLocale(['mr'])).toBe('mr');
    expect(detectLocale(['fr-FR', 'mr-IN', 'en'])).toBe('mr');
    expect(detectLocale(['en-GB'])).toBe('en');
  });

  it('falls back to English', () => {
    expect(detectLocale([])).toBe('en');
    expect(detectLocale(['fr', 'de-DE', 'ta'])).toBe('en');
  });
});

describe('formatRelative', () => {
  it('uses Intl.RelativeTimeFormat in English', () => {
    expect(formatRelative(ago(2_000), NOW, 'en')).toBe('now');
    expect(formatRelative(ago(30_000), NOW, 'en')).toBe('30 seconds ago');
    expect(formatRelative(ago(60_000), NOW, 'en')).toBe('1 minute ago');
    expect(formatRelative(ago(5 * 60_000), NOW, 'en')).toBe('5 minutes ago');
    expect(formatRelative(ago(2 * 3_600_000), NOW, 'en')).toBe('2 hours ago');
  });

  it('never reports the future', () => {
    expect(formatRelative(new Date(NOW + 60_000).toISOString(), NOW, 'en')).toBe('now');
  });

  it.each(['hi', 'mr'] as const)('uses Latin digits and local words in %s', (locale) => {
    const text = formatRelative(ago(5 * 60_000), NOW, locale);
    expect(text).toMatch(/5/);
    expect(text).not.toMatch(/[०-९]/);
    expect(text).not.toBe(formatRelative(ago(5 * 60_000), NOW, 'en'));
  });
});

describe('formatClock', () => {
  it('formats hours and minutes without Devanagari digits', () => {
    for (const locale of LOCALES) {
      expect(formatClock('2026-11-06T12:07:00.000Z', locale)).toMatch(/^\d{1,2}:\d{2}/);
    }
  });
});

describe('messages', () => {
  const NAMES = ['Asha', null] as const;

  function allText(locale: (typeof LOCALES)[number]): string[] {
    const m = MESSAGES[locale];
    const texts: string[] = [];
    for (const value of Object.values(m)) if (typeof value === 'string') texts.push(value);
    for (const name of NAMES) {
      texts.push(m.sharing(name), m.lostContactTitle(name, '21:42'), m.arrivedTitle(name));
    }
    texts.push(
      m.lastUpdated('5 min'),
      m.updated('now'),
      m.battery(12, true),
      m.battery(80, false),
      m.speed(40),
      m.eta(9, 'Home'),
      m.eta(9, null),
      m.accuracy(15),
      m.sharingSince('9:00'),
      m.sharingEndsBy('17:00'),
    );
    return texts;
  }

  it.each(LOCALES)('%s has a non-empty string for every message', (locale) => {
    for (const text of allText(locale)) expect(text.trim()).not.toBe('');
  });

  it('is gender-neutral in English', () => {
    for (const text of allText('en')) expect(text).not.toMatch(/\b(her|hers|she|his|him|he)\b/i);
  });

  it.each(LOCALES)('%s keeps 112 as digits and Surakshak untranslated', (locale) => {
    expect(MESSAGES[locale].lostContactAdvice).toContain('112');
    expect(MESSAGES[locale].call112).toContain('112');
    expect(MESSAGES[locale].getSurakshak).toContain('Surakshak');
    for (const text of allText(locale)) expect(text).not.toMatch(/[०-९]/);
  });

  it('never translates SOS', () => {
    for (const locale of LOCALES) {
      for (const text of allText(locale)) expect(text).not.toMatch(/एसओएस|सॉस/);
    }
  });

  it('uses the neutral fallback when the sender has no name', () => {
    expect(MESSAGES.en.sharing(null)).toBe('Your contact is sharing their live location');
    expect(MESSAGES.en.lostContactTitle('Asha', '21:42')).toBe(
      'We lost contact with Asha at 21:42',
    );
  });
});
