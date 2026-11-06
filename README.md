# Surakshak — Landing Page

Marketing website for the Surakshak women's safety app.

## Tech Stack

- Next.js (App Router)
- TypeScript strict
- Tailwind CSS
- Framer Motion (animations)
- Radix UI (accessible components)
- Vercel deployment

## Setup

```bash
npm install
npm run dev
```

## Live location page (`/track/<token>`)

Contacts receive an SMS link from the app and watch the sender move on a map. No install, no login.

- Config: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_TRACKING_API_URL` (the
  `liveTrack` function) and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_WEB` (a web-only Maps key restricted by
  HTTP referrer). Without the API URL the page shows a "not available" state.
- Dev mock: in `next dev`, token `00000000000000000000000000000000` serves a simulated sender, so no
  backend is needed. Tokens `…0001` to `…0007` give lost contact, stale, arrived, ended, invalid,
  network down, and recovery-after-20-s. The mock is not in production bundles.
- Privacy: the route sends `Referrer-Policy: strict-origin` (not `no-referrer`, which would break the
  referrer-restricted Maps key), `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow`. It is
  disallowed in `robots.txt` and kept out of the sitemap. The token and coordinates are never logged
  or stored.
- Tests: `npm test` (Vitest) covers polling, backoff, state derivation, parsing and privacy.
- The cross-origin API must send `Access-Control-Expose-Headers: Retry-After`, otherwise browsers hide
  the header and the page falls back to its normal backoff on 429.
- `next dev` (Turbopack) currently returns 500 on every page because of the Google Fonts setup in
  `layout.tsx`. Use `next dev --webpack` locally. `next build` is unaffected.

## Deploy

Deploys run through Vercel's native Git integration, not GitHub Actions.

- `production` branch → Production deployment
- `staging` branch → Preview deployment on its own stable `*.vercel.app` domain
- `develop` branch → no deployment (excluded via the project's Ignored Build Step)

## Update Play Store / App Store links

When accounts are ready, update `SITE.playStoreUrl` and `SITE.appStoreUrl`
in `src/constants/index.ts`. Remove the "Coming Soon" badge logic in
`Hero.tsx` and `CTA.tsx`.
