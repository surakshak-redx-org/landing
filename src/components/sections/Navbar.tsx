'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SITE } from '@/constants';

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#emergency', label: 'Emergency' },
  { href: '#about', label: 'About' },
] as const;

export default function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll(): void {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function closeMenu(): void {
    setMenuOpen(false);
  }

  return (
    <header
      className={[
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-stone-200/80 bg-white/90 shadow-sm backdrop-blur-xl'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={[
            'flex items-center gap-2 text-lg font-bold transition-colors',
            scrolled ? 'text-ink' : 'text-white',
          ].join(' ')}
        >
          <span
            className={[
              'flex h-9 w-9 items-center justify-center rounded-xl text-base',
              scrolled
                ? 'bg-primary-red text-white'
                : 'border border-white/20 bg-white/10',
            ].join(' ')}
            aria-hidden="true"
          >
            🛡️
          </span>
          Surakshak
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[
                'text-sm font-medium transition-colors',
                scrolled
                  ? 'text-stone-700 hover:text-primary-red'
                  : 'text-white/85 hover:text-white',
              ].join(' ')}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={SITE.apkDownloadUrl}
          download
          className="hidden items-center gap-2 rounded-full bg-primary-red px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-red/20 transition-all hover:bg-red-700 md:inline-flex"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download APK
        </a>

        <button
          type="button"
          className={[
            'rounded-full p-2 transition-colors md:hidden',
            scrolled
              ? 'text-ink hover:bg-stone-100'
              : 'text-white hover:bg-white/10',
          ].join(' ')}
          onClick={(): void => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-stone-200 bg-white shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-red-50 hover:text-primary-red"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}

              <a
                href={SITE.apkDownloadUrl}
                download
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-red px-5 py-3 text-sm font-semibold text-white"
                onClick={closeMenu}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download APK
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
    </header>
  );
}
