'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { DownloadButtons } from '@/components/ui/DownloadButton';

const QUICK_DIAL_NUMBERS = ['112', '100', '108', '1091'] as const;

const TRUST_ITEMS = ['Free forever', 'No ads', 'Works offline', '3 languages'] as const;

export default function Hero(): React.JSX.Element {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

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
    <section className="bg-gradient-hero relative overflow-hidden pt-32 pb-20">
      {/* Decorative background shield */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[40rem] text-white/[0.02]"
        aria-hidden="true"
      >
        🛡️
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <Badge variant="red" className="shimmer-bg mb-6 border-white/20 bg-white/5 text-white">
            🛡️ Women&apos;s Safety Platform
          </Badge>

          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            <span className="block font-devanagari text-white">हर कदम,</span>

            <span className="text-gradient-red block">Surakshit.</span>
          </h1>

          <p className="mt-2 text-xl text-stone-400 sm:text-2xl">Every Step, Protected.</p>

          <p className="mt-6 max-w-lg text-lg text-stone-400">
            A women&apos;s safety platform for India with emergency SOS, live location sharing,
            journey protection, community support, and safety information — in English, हिन्दी, and
            मराठी.
          </p>

          <DownloadButtons variant="glass" className="mt-8" />

          {/* TRUST ITEMS */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-400">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-forest-green" aria-hidden="true">
                  ✓
                </span>

                {item}
              </span>
            ))}
          </div>

          {/* QUICK EMERGENCY NUMBERS */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Emergency numbers
            </p>

            <div className="flex flex-wrap gap-3">
              {QUICK_DIAL_NUMBERS.map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={(): void => {
                    void handleCopy(number);
                  }}
                  className="glass rounded-full px-4 py-2 text-sm font-bold text-white transition-colors hover:border-primary-red"
                  aria-label={`Copy emergency number ${number}`}
                >
                  {copiedNumber === number ? 'Copied!' : number}
                </button>
              ))}
            </div>

            <p className="mt-3 text-xs text-stone-500">
              Tap a number to copy it. In an emergency, contact the appropriate emergency service
              directly.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — APP PREVIEW */}
        <div className="relative hidden lg:block">
          <div
            className="absolute inset-0 -z-10 rounded-full bg-primary-red/20 blur-[100px]"
            aria-hidden="true"
          />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative mx-auto w-72 rounded-[3rem] border-4 border-white/20 bg-near-black p-4"
          >
            {/* PHONE STATUS BAR */}
            <div className="flex items-center justify-between px-2 text-xs text-stone-400">
              <span>9:41</span>

              <div className="flex items-center gap-1">
                <span className="text-amber-500">🔋 35%</span>

                <span aria-hidden="true">📶</span>
              </div>
            </div>

            {/* SOS AREA */}
            <div className="mt-8 flex flex-col items-center gap-4 py-16">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <span
                  className="absolute inset-0 animate-pulse-ring rounded-full bg-primary-red/40"
                  aria-hidden="true"
                />

                <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary-red text-2xl font-bold text-white">
                  SOS
                </span>
              </div>

              <p className="text-xs text-stone-400">Triple tap or shake</p>
            </div>

            {/* LOCATION STATUS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.5,
              }}
              className="glass absolute -right-8 top-16 rounded-xl px-3 py-2 text-xs text-white shadow-lg"
            >
              📍 Location sharing
            </motion.div>

            {/* SAFETY STATUS */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1,
                duration: 0.5,
              }}
              className="glass absolute -left-8 bottom-16 rounded-xl px-3 py-2 text-xs text-white shadow-lg"
            >
              🛡️ Safety tools ready
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
