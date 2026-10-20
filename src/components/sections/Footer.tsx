import Link from 'next/link';
import { SITE } from '@/constants';

const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Languages', href: '#languages' },
      { label: 'Emergency Numbers', href: '#emergency' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact & Support', href: '/contact' },
      { label: 'Report a Problem', href: '/report-problem' },
      { label: 'Frequently Asked Questions', href: '#faq' },
    ],
  },
  {
    title: 'Information',
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
    <footer className="border-t border-[#7954A5]/10 bg-[#F5EEFA]">
      <div className="mx-auto w-[90%] max-w-6xl py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
            >
              <span className="text-2xl font-bold tracking-tight text-[#342442]">
                {SITE.name}
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-[#796B86]">
              Thoughtful safety tools and trusted information to help women
              make more informed choices throughout their journeys.
            </p>

            <p className="mt-4 font-devanagari text-base text-[#7954A5]">
              {SITE.taglineHindi}
            </p>

            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Surakshak on GitHub"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#7954A5]/15 bg-white/60 px-4 py-2.5 text-sm font-semibold text-[#7954A5] transition-colors hover:border-[#7954A5]/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
            >
              <GitHubIcon />
              Explore GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-bold text-[#342442]">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex rounded-sm text-sm leading-6 text-[#796B86] transition-colors hover:text-[#7954A5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          id="emergency-disclaimer"
          className="mt-12 rounded-2xl border border-[#C16B9B]/15 bg-[#F9E8F1] p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/80 text-lg"
              aria-hidden="true"
            >
              ♡
            </span>

            <div>
              <h3 className="text-sm font-bold text-[#793E68]">
                A note about emergency support
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#793E68]/90">
                Surakshak provides safety tools and information; it does not
                replace police, ambulance, fire, or other emergency services.
                Features may depend on your device, permissions, and
                connectivity. In an immediate emergency, contact the
                appropriate emergency service directly.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#7954A5]/10 pt-6 text-xs leading-6 text-[#796B86] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>

          <p className="sm:text-right">
            {SITE.clubName}
            <span className="mx-2 text-[#C16B9B]">·</span>
            {SITE.collegeName}
          </p>
        </div>
      </div>
    </footer>
  );
}
