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

Deploys run through Vercel's native Git integration, not GitHub Actions.

- `production` branch → Production deployment
- `staging` branch → Preview deployment on its own stable `*.vercel.app` domain
- `develop` branch → no deployment (excluded via the project's Ignored Build Step)

## Update Play Store / App Store links

When accounts are ready, update `SITE.playStoreUrl` and `SITE.appStoreUrl`
in `src/constants/index.ts`. Remove the "Coming Soon" badge logic in
`Hero.tsx` and `CTA.tsx`.
