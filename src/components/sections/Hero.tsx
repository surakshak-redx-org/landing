'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { DownloadButtons } from '@/components/ui/DownloadButton';

const QUICK_DIAL_NUMBERS = ['112', '100', '108', '1091'] as const;

const TRUST_ITEMS = [
  'Free forever',
  'No ads',
  'Works offline',
  '3 languages',
] as const;

const heroEntrance = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const heroImageEntrance = {
  hidden: { opacity: 0, scale: 0.92, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const entranceVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : heroEntrance;

  const imageEntranceVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : heroImageEntrance;

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

  return (
    <section className="ambient-tech-bg relative isolate overflow-hidden bg-gradient-to-br from-[#FBF9FF] via-[#FDF4FB] to-[#F8E4F0] pt-32 pb-12 sm:pt-36 sm:pb-16 lg:min-h-[calc(100svh-5rem)] lg:pt-28 lg:pb-8">
      {/* Animated ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#EDE3F8]/80 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, -35, 0],
                  y: [0, 24, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#F8E4F0]/80 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative mx-auto w-[90%] max-w-6xl">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr] lg:gap-4">
          {/* LEFT CONTENT */}
          <motion.div
            variants={entranceVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge
              variant="purple"
              className="mb-6 border-[#7954A5]/20 bg-[#F0E8FA] text-xs font-semibold text-[#7954A5]"
            >
              A Women&apos;s Safety Platform
            </Badge>

            <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-[#342442] sm:text-6xl lg:text-7xl">
              <span className="block">Every step,</span>
              <span className="block bg-gradient-to-r from-[#7954A5] via-[#C16B9B] to-[#A34E83] bg-clip-text text-transparent">
                a safer you.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-[#796B86] sm:text-lg">
              Trusted tools, real support, and safety information for women in
              India — in English, Hindi, and Marathi.
            </p>

            {/* MAIN CTAs ROW */}
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

            {/* APP STORE BADGES (COMING SOON) */}
            <div className="mt-5">
              <DownloadButtons variant="glass" />
            </div>

            {/* TRUST INDICATORS */}
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

            {/* QUICK EMERGENCY NUMBERS */}
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
          </motion.div>

          {/* RIGHT SIDE — WOMAN & PHONE ARTWORK */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              variants={imageEntranceVariants}
              initial="hidden"
              animate="visible"
              className="relative mx-auto w-full max-w-[620px] lg:max-w-[700px]"
            >
              {/* Ambient signal — decorative only */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[8%] -z-0"
              >
                <motion.div
                  className="absolute left-[12%] top-[18%] h-3 w-3 rounded-full bg-[#C16B9B] shadow-[0_0_24px_rgba(193,107,155,0.65)]"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.65 }
                      : {
                          opacity: [0.35, 1, 0.35],
                          scale: [0.85, 1.2, 0.85],
                        }
                  }
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className="absolute right-[12%] top-[38%] h-2 w-2 rounded-full bg-[#7954A5]"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.5 }
                      : {
                          opacity: [0.2, 0.8, 0.2],
                          scale: [1, 1.5, 1],
                        }
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.7,
                  }}
                />

                <motion.div
                  className="absolute bottom-[18%] left-[22%] h-px w-16 origin-left bg-gradient-to-r from-[#C16B9B]/70 to-transparent"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.5 }
                      : {
                          scaleX: [0.5, 1, 0.5],
                          opacity: [0.3, 0.8, 0.3],
                        }
                  }
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
