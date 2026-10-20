'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
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
    handleScroll();

    return (): void => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return (): void => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'navbar-scrolled shadow-sm'
          : 'border-b border-[#7954A5]/10 bg-[#FBF9FF]/80'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-[#342442] transition-colors hover:text-[#7954A5]"
        >
          <span>
            Surakshak<span className="text-[#A77BC8]">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-[#796B86] transition-colors duration-200 hover:text-[#7954A5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-4"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#get-started">
            <Button variant="plum" size="sm">
              Get the app ↗
            </Button>
          </a>
        </div>

        <button
          type="button"
          className="rounded-xl border border-[#7954A5]/15 bg-white/70 p-2 text-[#7954A5] transition-colors hover:bg-[#EDE3F8] md:hidden"
          onClick={(): void => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#7954A5]/10 bg-[#FBF9FF] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[#665674] transition-colors hover:bg-[#EDE3F8] hover:text-[#7954A5]"
                  onClick={(): void => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-2">
                <a href="#get-started" onClick={(): void => setMenuOpen(false)}>
                  <Button variant="plum" size="sm" className="w-full">
                    Get the app ↗
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
