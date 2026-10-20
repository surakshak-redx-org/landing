'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { DownloadButtons } from '@/components/ui/DownloadButton';

const QUICK_DIAL_NUMBERS = ['112', '100', '108', '1091'] as const;

const TRUST_ITEMS = [
  'Free forever',
  'No ads',
  'Works offline',
  '3 languages',
] as const;

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#about', label: 'About' },
] as const;

export default function Hero(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkViewport(): void {
      setIsMobile(window.innerWidth < 768);
    }
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Track scroll through the 220vh pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  // Scale the ENTIRE landing page window from an extremely small centered frame to 100% full screen
  // Ultra-small initial scale (0.20 desktop, 0.32 mobile) creates generous negative space
  const startScale = isMobile ? 0.32 : 0.20;
  const scale = useTransform(smoothProgress, [0, 0.82], [startScale, 1.0]);

  // Rounded corners gradually flatten to square as it fills the viewport
  const borderRadius = useTransform(smoothProgress, [0, 0.82], [22, 0]);

  // Window shadow diminishes as it expands to full screen
  const shadowOpacity = useTransform(smoothProgress, [0, 0.75], [0.65, 0]);

  // Cinematic dark-purple background dissolves into the lavender page as it expands
  const darkBackdropOpacity = useTransform(smoothProgress, [0.55, 0.85], [1, 0]);

  // Focal headline & scroll prompt in dark stage fade out as scroll starts
  const focalOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const focalY = useTransform(smoothProgress, [0, 0.18], [0, -22]);

  async function handleCopy(number: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);

      window.setTimeout(() => {
        setCopiedNumber(null);
      }, 1500);
    } catch (error) {
      console.error('Failed to copy emergency number:', error);
    }
  }

  // ACCESSIBLE REDUCED-MOTION FALLBACK
  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="ambient-tech-bg relative isolate overflow-hidden bg-gradient-to-br from-[#FBF9FF] via-[#FDF4FB] to-[#F8E4F0] pt-32 pb-12 sm:pt-36 sm:pb-16 lg:min-h-[calc(100svh-5rem)] lg:pt-28 lg:pb-8"
      >
        <div className="relative mx-auto w-[90%] max-w-6xl">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr] lg:gap-4">
            <div>
              <Badge
                variant="purple"
                className="mb-6 border-[#7954A5]/20 bg-[#F0E8FA] text-xs font-semibold text-[#7954A5]"
              >
                A Women&apos;s Safety Platform
              </Badge>

              <h1
                id="hero-heading"
                className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-[#342442] sm:text-6xl lg:text-7xl"
              >
                <span className="block">Every step,</span>
                <span className="block bg-gradient-to-r from-[#7954A5] via-[#C16B9B] to-[#A34E83] bg-clip-text text-transparent">
                  a safer you.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-8 text-[#796B86] sm:text-lg">
                Trusted tools, real support, and safety information for women in
                India — in English, Hindi, and Marathi.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#get-started"
                  className="inline-flex items-center justify-center rounded-full bg-[#7954A5] px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-[#7954A5]/25 transition-all hover:scale-[1.02] hover:bg-[#67438F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
                >
                  Download the App
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-[#7954A5]/20 bg-white/70 px-6 py-3.5 text-base font-semibold text-[#7954A5] shadow-sm backdrop-blur-sm transition-all hover:border-[#7954A5]/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
                >
                  See How It Works
                </a>
              </div>

              <div className="mt-5">
                <DownloadButtons variant="glass" />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#796B86] sm:text-sm">
                {TRUST_ITEMS.map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span className="text-[#7954A5]" aria-hidden="true">
                      ♡
                    </span>
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 border-t border-[#7954A5]/15 pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#9B527E]">
                  Quick dial & copy
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {QUICK_DIAL_NUMBERS.map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={(): void => {
                        void handleCopy(number);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#7954A5]/15 bg-white/80 px-4 py-2 text-xs font-bold text-[#342442] shadow-sm transition-all hover:border-[#7954A5]/40 hover:bg-white hover:text-[#7954A5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5]"
                      aria-label={`Copy emergency number ${number}`}
                    >
                      <span>📞 {number}</span>
                      <span className="text-[10px] text-[#796B86]">
                        {copiedNumber === number ? '✓ Copied' : 'Copy'}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs leading-5 text-[#796B86]">
                  Tap to copy. In an immediate emergency, call emergency services
                  directly.
                </p>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative mx-auto w-full max-w-[620px] lg:max-w-[700px]">
                <Image
                  src="/images/surakshak-hero-fixed.png"
                  alt="Woman holding a phone displaying the Surakshak safety app"
                  width={1100}
                  height={1400}
                  priority
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Surakshak Opening Scene"
      className="relative h-[220vh] bg-[#24152F]"
    >
      {/* Pinned Viewport Stage with Cinematic Dark-Purple Gradient */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#24152F]">
        {/* Underlying lavender background to ensure seamless transition as dark backdrop dissolves */}
        <div
          aria-hidden="true"
          className="ambient-tech-bg pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#FBF9FF] via-[#FDF4FB] to-[#F8E4F0]"
        />

        {/* Cinematic dark-purple gradient stage (deep plum #24152F, dark violet #39204F) */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: darkBackdropOpacity }}
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_45%,#39204F_0%,#2D183C_50%,#24152F_100%)]"
        >
          {/* Soft, layered radial gradient halos blending naturally into the deep plum background — NO rings, borders, or outlines */}
          {/* Core warm lavender halo right behind the centered tiny preview */}
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[620px] -translate-x-1/2 -translate-y-1/2 max-w-[95vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(216,196,237,0.36)_0%,rgba(193,107,155,0.18)_42%,transparent_72%)] blur-2xl" />

          {/* Wide diffuse ambient blush & violet halo */}
          <div className="absolute left-1/2 top-1/2 h-[680px] w-[900px] -translate-x-1/2 -translate-y-1/2 max-w-[98vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,164,197,0.22)_0%,rgba(121,84,165,0.14)_45%,transparent_75%)] blur-3xl" />

          {/* Ambient top light pool */}
          <div className="absolute -top-32 right-[18%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(193,107,155,0.16)_0%,transparent_68%)] blur-3xl" />

          {/* Ambient bottom depth */}
          <div className="absolute -bottom-32 left-[15%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(121,84,165,0.20)_0%,transparent_70%)] blur-3xl" />
        </motion.div>

        {/* MAIN FOCAL POINT: Three balanced, centered lines */}
        <motion.div
          style={{ opacity: focalOpacity, y: focalY }}
          className="pointer-events-none absolute inset-x-0 top-8 sm:top-10 md:top-12 lg:top-14 z-30 mx-auto w-full px-6 text-center"
        >
          <h2 className="mx-auto flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 text-2xl font-black uppercase leading-[1.06] tracking-[0.08em] sm:text-4xl sm:tracking-[0.10em] md:text-5xl md:tracking-[0.12em] lg:text-6xl">
            <span className="bg-gradient-to-r from-[#FAF7FF] via-[#E8A4C5] to-[#D9C4F0] bg-clip-text text-transparent drop-shadow-[0_0_36px_rgba(232,164,197,0.4)]">
              YOUR WORLD.
            </span>
            <span className="bg-gradient-to-r from-[#FAF7FF] via-[#E8A4C5] to-[#D9C4F0] bg-clip-text text-transparent drop-shadow-[0_0_36px_rgba(232,164,197,0.4)]">
              YOUR JOURNEY.
            </span>
            <span className="bg-gradient-to-r from-[#FAF7FF] via-[#E8A4C5] to-[#D9C4F0] bg-clip-text text-transparent drop-shadow-[0_0_36px_rgba(232,164,197,0.4)]">
              YOUR SAFETY.
            </span>
          </h2>
        </motion.div>

        {/* Refined “Scroll to enter your world” Prompt with Animated Custom SVG Arrow (No pill, no emojis, no borders) */}
        <motion.div
          style={{ opacity: focalOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-7 sm:bottom-9 z-30 flex flex-col items-center justify-center gap-2 text-center"
        >
          <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-[#E8D4F5]/80 select-none">
            Scroll to enter your world
          </span>
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#E8A4C5]/85"
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.div>

        {/* THE ENTIRE WEBPAGE WINDOW (Expanding smoothly from tiny centered frame to full viewport) */}
        <motion.div
          style={{
            scale,
            borderRadius,
          }}
          className="relative z-10 h-screen w-screen origin-center overflow-hidden bg-gradient-to-br from-[#FBF9FF] via-[#FDF4FB] to-[#F8E4F0] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
        >
          {/* WINDOW INTERNAL NAVBAR (Exactly identical to the existing Navbar) */}
          <header className="absolute inset-x-0 top-0 z-50 w-full border-b border-[#7954A5]/10 bg-[#FBF9FF]/90 backdrop-blur-md">
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

              <div className="flex items-center gap-4">
                <a
                  href="#get-started"
                  className="rounded-full bg-[#7954A5] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#68438F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
                >
                  Get the app ↗
                </a>
              </div>
            </nav>
          </header>

          {/* THE ENTIRE HERO COMPOSITION (Preserving artwork, typography, buttons, and lavender background) */}
          <div className="ambient-tech-bg relative isolate flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#FBF9FF] via-[#FDF4FB] to-[#F8E4F0] pt-24 pb-8 sm:pt-28 lg:pt-20">
            {/* Drifting ambient blurs */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
            >
              <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#EDE3F8]/80 blur-3xl" />
              <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#F8E4F0]/80 blur-3xl" />
            </div>

            <div className="relative mx-auto w-[90%] max-w-6xl">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr] lg:gap-4">
                {/* LEFT CONTENT */}
                <div>
                  <Badge
                    variant="purple"
                    className="mb-5 border-[#7954A5]/20 bg-[#F0E8FA] text-xs font-semibold text-[#7954A5]"
                  >
                    A Women&apos;s Safety Platform
                  </Badge>

                  <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-[#342442] sm:text-6xl lg:text-7xl">
                    <span className="block">Every step,</span>
                    <span className="block bg-gradient-to-r from-[#7954A5] via-[#C16B9B] to-[#A34E83] bg-clip-text text-transparent">
                      a safer you.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8">
                    Trusted tools, real support, and safety information for
                    women in India — in English, Hindi, and Marathi.
                  </p>

                  {/* MAIN CTAs ROW */}
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a
                      href="#get-started"
                      className="inline-flex items-center justify-center rounded-full bg-[#7954A5] px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#7954A5]/25 transition-all hover:scale-[1.02] hover:bg-[#67438F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
                    >
                      Download the App
                      <span className="ml-2" aria-hidden="true">
                        →
                      </span>
                    </a>

                    <a
                      href="#how-it-works"
                      className="inline-flex items-center justify-center rounded-full border border-[#7954A5]/20 bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#7954A5] shadow-sm backdrop-blur-sm transition-all hover:border-[#7954A5]/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
                    >
                      See How It Works
                    </a>
                  </div>

                  {/* APP STORE BADGES */}
                  <div className="mt-4">
                    <DownloadButtons variant="glass" />
                  </div>

                  {/* TRUST INDICATORS */}
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#796B86] sm:text-sm">
                    {TRUST_ITEMS.map((item) => (
                      <span key={item} className="flex items-center gap-1.5">
                        <span className="text-[#7954A5]" aria-hidden="true">
                          ♡
                        </span>
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* QUICK EMERGENCY NUMBERS */}
                  <div className="mt-8 border-t border-[#7954A5]/15 pt-5">
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#9B527E]">
                      Quick dial & copy
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                      {QUICK_DIAL_NUMBERS.map((number) => (
                        <button
                          key={number}
                          type="button"
                          onClick={(): void => {
                            void handleCopy(number);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#7954A5]/15 bg-white/80 px-3.5 py-1.5 text-xs font-bold text-[#342442] shadow-sm transition-all hover:border-[#7954A5]/40 hover:bg-white hover:text-[#7954A5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5]"
                          aria-label={`Copy emergency number ${number}`}
                        >
                          <span>📞 {number}</span>
                          <span className="text-[10px] text-[#796B86]">
                            {copiedNumber === number ? '✓ Copied' : 'Copy'}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="mt-2.5 text-xs leading-5 text-[#796B86]">
                      Tap to copy. In an immediate emergency, call emergency
                      services directly.
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE — WOMAN & PHONE ARTWORK WITH AMBIENT SIGNALS */}
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative mx-auto w-full max-w-[580px] lg:max-w-[660px]">
                    {/* Ambient signal details on illustration */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[8%] -z-0"
                    >
                      <motion.div
                        className="absolute left-[12%] top-[18%] h-3 w-3 rounded-full bg-[#C16B9B] shadow-[0_0_24px_rgba(193,107,155,0.65)]"
                        animate={{
                          opacity: [0.35, 1, 0.35],
                          scale: [0.85, 1.2, 0.85],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />

                      <motion.div
                        className="absolute right-[12%] top-[38%] h-2 w-2 rounded-full bg-[#7954A5]"
                        animate={{
                          opacity: [0.2, 0.8, 0.2],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.7,
                        }}
                      />

                      <motion.div
                        className="absolute bottom-[18%] left-[22%] h-px w-16 origin-left bg-gradient-to-r from-[#C16B9B]/70 to-transparent"
                        animate={{
                          scaleX: [0.5, 1, 0.5],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>

                    <Image
                      src="/images/surakshak-hero-fixed.png"
                      alt="Woman holding a phone displaying the Surakshak safety app"
                      width={1100}
                      height={1400}
                      priority
                      className="h-auto w-full object-contain"
                      sizes="(max-width: 1024px) 90vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
