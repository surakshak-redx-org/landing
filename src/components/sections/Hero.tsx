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

  // Scale the ENTIRE landing page window from a centered small frame to 100% full screen
  // Slightly smaller initial scale creates generous, cinematic negative space
  const startScale = isMobile ? 0.58 : 0.41;
  const scale = useTransform(smoothProgress, [0, 0.82], [startScale, 1.0]);

  // Rounded corners gradually flatten to square as it fills the viewport
  const borderRadius = useTransform(smoothProgress, [0, 0.82], [28, 0]);

  // Window shadow diminishes as it expands to full screen
  const shadowOpacity = useTransform(smoothProgress, [0, 0.75], [0.65, 0]);

  // Cinematic dark-purple background dissolves into the lavender page as it expands
  const darkBackdropOpacity = useTransform(smoothProgress, [0.55, 0.85], [1, 0]);

  // Concentric signal rings in dark background fade
  const signalRingOpacity = useTransform(smoothProgress, [0, 0.35], [0.6, 0]);

  // Prompts in the dark stage fade out as scroll starts
  const promptOpacity = useTransform(smoothProgress, [0, 0.16], [1, 0]);
  const promptY = useTransform(smoothProgress, [0, 0.16], [0, -18]);

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
          {/* Subtle muted purple/pink ambient radial glow - Top Right */}
          <div className="absolute -top-32 right-[15%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(193,107,155,0.18)_0%,transparent_68%)] blur-2xl" />

          {/* Subtle muted purple/pink ambient radial glow - Bottom Left */}
          <div className="absolute -bottom-32 left-[12%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(121,84,165,0.22)_0%,transparent_70%)] blur-2xl" />

          {/* Soft lavender halo directly behind the centered website preview */}
          <div className="absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 max-w-[92vw] rounded-full bg-[radial-gradient(ellipse,rgba(216,196,237,0.32)_0%,rgba(193,107,155,0.14)_42%,transparent_72%)] blur-3xl" />
        </motion.div>

        {/* Extremely subtle concentric rings adding quiet atmospheric depth */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: signalRingOpacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 600 600"
            fill="none"
            className="h-[520px] w-[520px] sm:h-[620px] sm:w-[620px]"
          >
            <circle
              cx="300"
              cy="300"
              r="170"
              stroke="#E8A4C5"
              strokeWidth="0.75"
              strokeDasharray="3 8"
              className="opacity-15"
            />
            <circle
              cx="300"
              cy="300"
              r="230"
              stroke="#D9C4F0"
              strokeWidth="0.75"
              strokeDasharray="4 9"
              className="opacity-12"
            />
            <circle
              cx="300"
              cy="300"
              r="290"
              stroke="#7954A5"
              strokeWidth="0.75"
              strokeDasharray="4 10"
              className="opacity-10"
            />
          </svg>
        </motion.div>

        {/* Custom SVG Typography: “YOUR WORLD. YOUR JOURNEY. YOUR SAFETY.” */}
        <motion.div
          style={{ opacity: promptOpacity, y: promptY }}
          className="pointer-events-none absolute top-6 z-30 mx-auto w-full px-4 text-center sm:top-8 md:top-10"
        >
          <svg
            viewBox="0 0 840 40"
            fill="none"
            className="mx-auto h-6 sm:h-7 md:h-8 w-auto max-w-[92vw] overflow-visible"
          >
            <defs>
              <linearGradient
                id="hero-svg-tagline-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#EDE3F8" />
                <stop offset="35%" stopColor="#E8A4C5" />
                <stop offset="65%" stopColor="#D9C4F0" />
                <stop offset="100%" stopColor="#EDE3F8" />
              </linearGradient>
              <filter
                id="hero-svg-tagline-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <text
              x="420"
              y="26"
              textAnchor="middle"
              fill="url(#hero-svg-tagline-grad)"
              filter="url(#hero-svg-tagline-glow)"
              className="text-[12px] sm:text-[13px] md:text-[14px] font-bold tracking-[0.38em] uppercase select-none"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              YOUR WORLD. YOUR JOURNEY. YOUR SAFETY.
            </text>
          </svg>
        </motion.div>

        {/* Refined “Scroll to enter your world ↓” Prompt */}
        <motion.div
          style={{ opacity: promptOpacity }}
          className="pointer-events-none absolute bottom-6 z-30 flex items-center justify-center sm:bottom-8"
        >
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs font-medium tracking-wide text-[#E8D4F5]/85 shadow-lg shadow-black/20 backdrop-blur-md transition-colors">
            <span>Scroll to enter your world</span>
            <span className="animate-bounce text-[#E8A4C5]" aria-hidden="true">
              ↓
            </span>
          </div>
        </motion.div>

        {/* THE ENTIRE WEBPAGE WINDOW (Expanding smoothly from small centered frame to full viewport) */}
        <motion.div
          style={{
            scale,
            borderRadius,
          }}
          className="relative z-10 h-screen w-screen origin-center overflow-hidden bg-gradient-to-br from-[#FBF9FF] via-[#FDF4FB] to-[#F8E4F0] shadow-2xl ring-1 ring-white/10"
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
