# CLAUDE.md — Surakshak Landing Page

Read this before doing anything.

## Project

- Name: Surakshak Landing Page
- Purpose: Public marketing website for the Surakshak women's safety app
- Repo: surakshak-redx-org/landing
- Deploy: Vercel

## Tech Stack

- Next.js, App Router, TypeScript strict
- Tailwind CSS + Framer Motion
- Radix UI for accessible components

## Repository Structure

```
landing/
├── .github/
│   └── workflows/
│       └── pr-checks.yml       # typecheck/lint/prettier/build on PRs
├── public/
│   └── robots.txt
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sitemap.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── sections/           # page sections (Hero, Features, FAQ, ...)
│   │   └── ui/                 # shared primitives (Button, Badge)
│   ├── constants/
│   │   └── index.ts            # SITE config, links, copy constants
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   └── lib/
│       └── utils.ts
├── vercel.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── CLAUDE.md
├── AGENTS.md
└── README.md
```

Deploys run through Vercel's native Git integration (not GitHub Actions):
`production` branch → Production deployment; `staging` branch → Preview
deployment on its own stable `*.vercel.app` domain; `develop` → no deployment
(Ignored Build Step skips it in Vercel project settings).

## Absolute Rules

1. No `any` type
2. No ts-ignore or ts-expect-error
3. No eslint-disable comments
4. All functions explicit return types
5. All component props typed interfaces
6. No inline styles — Tailwind only
7. No placeholder lorem ipsum text — all content is real

## Brand

- Primary red: #D4380D
- Shakti purple: #722ED1
- Saffron: #FA8C16
- Forest green: #389E0D
- App name: always "Surakshak" (never translated)
- SOS: never translated
- Emergency numbers: always digits (112, 100, etc.)

## Tone

- Direct, confident, not alarmist
- "Built for real emergencies" not "stay safe"
- Acknowledge iOS limitations honestly — don't hide them
- Credit REDX Club and K.J. Somaiya accurately

## Branch Strategy

production ← staging ← develop ← feature/xxx

## Download Buttons

Play Store and App Store accounts not yet set up.
Show "Coming Soon" badge overlay on both buttons.
Links are # placeholders — update when accounts are ready in
src/constants/index.ts (SITE.playStoreUrl + SITE.appStoreUrl).
