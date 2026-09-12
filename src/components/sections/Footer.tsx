import { SITE } from '@/constants';

const FOOTER_COLUMNS = [
  {
    title: 'Emergency Numbers',
    links: ['112', '100', '108', '1091', '181'],
  },
  {
    title: 'Features',
    links: ['SOS', 'Live Location', 'Safe Journey', 'Community', 'Laws'],
  },
  {
    title: 'About',
    links: [SITE.clubName, SITE.collegeName, 'GitHub'],
  },
  {
    title: 'Download',
    links: ['Play Store (Coming Soon)', 'App Store (Coming Soon)'],
  },
] as const;

function GitHubIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.19-3.37-1.19-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5.01 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-near-black py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-lg font-bold text-white">
              <span aria-hidden="true">🛡️</span>
              Surakshak
            </p>
            <p className="mt-1 font-devanagari text-sm text-stone-500">हर कदम, सुरक्षित</p>
          </div>
          <a
            href={SITE.githubUrl}
            className="text-stone-400 transition-colors hover:text-white"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-white">{column.title}</p>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link} className="text-sm text-stone-400">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center">
          <p>
            © 2026 {SITE.clubName}, {SITE.collegeName}. All rights reserved.
          </p>
          <p>Built with ❤️ for women&apos;s safety in India</p>
        </div>
      </div>
    </footer>
  );
}
