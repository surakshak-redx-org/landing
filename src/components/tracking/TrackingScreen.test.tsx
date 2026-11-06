// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { metadata } from '@/app/track/[token]/page';

import { TrackingScreen } from './TrackingScreen';

const TOKEN = 'a1b2c3d4e5f60718293a4b5c6d7e8f90';
const API = 'https://api.example.test/liveTrack';
const NOW = Date.parse('2026-11-06T12:00:00.000Z');

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function body(overrides: Record<string, unknown> = {}, ageMs = 5_000): Record<string, unknown> {
  return {
    state: 'active',
    name: 'Asha',
    position: { lat: 19.04123, lng: 72.87456, at: new Date(NOW - ageMs).toISOString() },
    startedAt: new Date(NOW - 3_600_000).toISOString(),
    expiresAt: new Date(NOW + 3_600_000).toISOString(),
    trail: [],
    battery: { level: 0.1, charging: false },
    speedMps: 8,
    heading: 90,
    accuracyM: 14,
    destination: { name: 'Home', lat: 19.03, lng: 72.86 },
    eta: { minutes: 7, computedAt: new Date(NOW).toISOString() },
    ...overrides,
  };
}

function respond(status: number, payload: unknown): Response {
  return new Response(JSON.stringify(payload), { status });
}

let container: HTMLDivElement;
let root: Root;
let fetchMock: ReturnType<typeof vi.fn>;

async function flush(ms = 0): Promise<void> {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

async function mount(token: string = TOKEN): Promise<void> {
  await act(async () => {
    root.render(<TrackingScreen token={token} />);
  });
  await flush();
}

const text = (): string => document.body.textContent ?? '';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
  vi.stubEnv('NEXT_PUBLIC_TRACKING_API_URL', API);
  vi.stubEnv('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_WEB', '');
  fetchMock = vi.fn(() => Promise.resolve(respond(200, body())));
  vi.stubGlobal('fetch', fetchMock);
  document.title = '';
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  localStorage.clear();
  sessionStorage.clear();
});

describe('privacy', () => {
  it('never puts the token in rendered markup, the title, storage or cookies', async () => {
    await mount();
    expect(fetchMock).toHaveBeenCalled();
    expect(text()).toContain('Asha is sharing their live location');

    expect(document.documentElement.outerHTML).not.toContain(TOKEN);
    expect(document.title).not.toContain(TOKEN);
    expect(String(metadata.title)).not.toContain(TOKEN);
    expect(JSON.stringify(metadata)).not.toContain(TOKEN);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    expect(document.cookie).toBe('');
  });

  it('keeps coordinates out of storage, cookies and the title', async () => {
    await mount();
    expect(document.title).not.toMatch(/19\.04|72\.87/);
    expect(localStorage.length + sessionStorage.length).toBe(0);
    expect(document.cookie).not.toMatch(/19\.04|72\.87/);
  });

  it('marks the route noindex', () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it('does not call the API for a malformed token', async () => {
    await mount('not-a-real-token');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(text()).toContain('This link is not valid or has been stopped.');
  });
});

describe('states', () => {
  it('shows a skeleton before the first response', async () => {
    fetchMock.mockImplementation(() => new Promise(() => undefined));
    await mount();
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(text()).toContain('Loading live location');
  });

  it('renders active details as text, not only on the map', async () => {
    await mount();
    expect(text()).toContain('Updated');
    expect(text()).toContain('Battery 10%');
    expect(text()).toContain('29 km/h');
    expect(text()).toContain('About 7 min to Home');
    expect(text()).toContain('Only people with this link can see this.');
    expect(text()).toContain('Get Surakshak - Har Kadam, Surakshit');
  });

  it('uses a neutral name when the sender has none', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(respond(200, body({ name: null }))));
    await mount();
    expect(text()).toContain('Your contact is sharing their live location');
  });

  it('shows the amber badge when the last fix is older than 2 minutes', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(respond(200, body({}, 4 * 60_000))));
    await mount();
    expect(text()).toMatch(/Last updated 4 minutes ago/);
  });

  it('shows lost contact with the last known position and a 112 link', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(respond(200, body({ state: 'lost_contact' }, 6 * 60_000))),
    );
    await mount();
    expect(text()).toMatch(/We lost contact with Asha at \d{1,2}:\d{2}/);
    expect(text()).toContain('call 112');
    expect(container.querySelector('a[href="tel:112"]')).not.toBeNull();
  });

  it('shows a calm arrived state without a map', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(respond(200, body({ state: 'arrived', position: undefined }))),
    );
    await mount();
    expect(text()).toContain('Asha has arrived');
    expect(container.querySelector('[role="img"]')).toBeNull();
  });

  it('shows the ended state on 410 and stops polling', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(respond(410, { state: 'ended' })));
    await mount();
    expect(text()).toContain('This live location has ended.');
    await flush(60_000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('shows the invalid state on 404 without revealing why', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(respond(404, { error: 'not_found' })));
    await mount();
    expect(text()).toContain('This link is not valid or has been stopped.');
    await flush(60_000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('keeps the last view and shows "Reconnecting…" when polling fails', async () => {
    await mount();
    fetchMock.mockImplementation(() => Promise.reject(new TypeError('offline')));
    await flush(5_000);
    expect(text()).toContain('Reconnecting…');
    expect(text()).toContain('Asha is sharing their live location');
    fetchMock.mockImplementation(() => Promise.resolve(respond(200, body())));
    await flush(5_000);
    expect(text()).not.toContain('Reconnecting…');
  });

  it('shows a configuration error when the API URL is missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_TRACKING_API_URL', '');
    await mount();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(text()).toContain('Live tracking is not available right now.');
  });
});

describe('language', () => {
  it('switches to Hindi and Marathi from the visible control', async () => {
    await mount();
    const hindi = container.querySelector<HTMLButtonElement>('button[aria-label="हिन्दी"]');
    await act(async () => hindi?.click());
    expect(text()).toContain('अपनी लाइव लोकेशन शेयर कर रहे हैं');
    expect(text()).not.toMatch(/\b(her|his)\b/i);
    const marathi = container.querySelector<HTMLButtonElement>('button[aria-label="मराठी"]');
    await act(async () => marathi?.click());
    expect(text()).toContain('त्यांचे लाइव्ह लोकेशन शेअर करत आहेत');
    expect(container.querySelector('[lang="mr"]')).not.toBeNull();
  });
});
