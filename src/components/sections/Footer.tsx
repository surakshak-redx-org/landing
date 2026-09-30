'use client';

import Link from 'next/link';
import { SITE } from '@/constants';

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Safety Information', href: '#safety' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact / Support', href: '/contact' },
{ label: 'Report a Problem', href: '/report-problem' },
{ label: 'Emergency Information', href: '/emergency' },],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Emergency Disclaimer', href: '#emergency-disclaimer' },
    ],
  },
] as const;

function GitHubIcon(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.71.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.16 9.16 0 0 1 12 7.05c.85 0 1.71.12 2.52.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-white/10 bg-near-black py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* BRAND */}
          <div>
      <Link
  href="/"
  className="text-2xl font-bold text-white"
>
  {SITE.name}
</Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-stone-400">
              A women&apos;s safety platform for India with emergency
              support, safety tools, and trusted information.
            </p>

            <p className="mt-3 font-devanagari text-sm text-stone-400">
              {SITE.taglineHindi}
            </p>

            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Surakshak GitHub"
              className="mt-5 inline-flex items-center gap-2 text-stone-400 transition-colors hover:text-white"
            >
              <GitHubIcon />
              <span className="text-sm">GitHub</span>
            </a>
          </div>

          {/* FOOTER COLUMNS */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">
                {column.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* EMERGENCY NOTICE */}
        <div
          id="emergency-disclaimer"
          className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <h3 className="text-sm font-semibold text-white">
            Emergency Disclaimer
          </h3>

          <p className="mt-2 text-sm leading-6 text-stone-400">
            Surakshak provides safety tools and information but does not
            replace police, ambulance, fire, or other emergency services.
            In an immediate emergency, contact the appropriate emergency
            service directly.
          </p>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>

          <p>
            {SITE.clubName} · {SITE.collegeName}
          </p>
        </div>
      </div>
    </footer>
  );
}