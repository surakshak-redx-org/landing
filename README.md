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

## Deploy

Vercel deploys via GitHub Actions on push to `staging` and `production`.
Add `VERCEL_TOKEN` to GitHub secrets.

## Update Play Store / App Store links

When accounts are ready, update `SITE.playStoreUrl` and `SITE.appStoreUrl`
in `src/constants/index.ts`. Remove the "Coming Soon" badge logic in
`Hero.tsx` and `CTA.tsx`.
