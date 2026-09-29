'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { SITE } from '@/constants';
import { cn } from '@/lib/utils';

const QUICK_DIAL_NUMBERS = ['112', '100', '108', '1091'] as const;

const TRUST_ITEMS = ['Free forever', 'No ads', 'Works offline', '3 languages'] as const;

function GooglePlayIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.4c-.4.3-.6.8-.6 1.4v16.4c0 .6.2 1.1.6 1.4l.1.1L13 12.5v-.2L3.7 2.3l-.1.1Z" />
      <path d="M16.2 15.7 13 12.5v-.2l3.2-3.2 4 2.3c1.1.6 1.1 1.6 0 2.2l-4 2.1Z" />
      <path d="m4.5 21.4 8.5-8.5 3.1 3.1L4.7 21.5c-.1 0-.2 0-.2-.1Z" />
      <path d="m13 11.7-8.5-8.5c.1 0 .2 0 .3.1l11.4 6.5-3.2 1.9Z" />
    </svg>
  );
}

function AppleIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.3c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.4-.9-2.4-3.9ZM14.6 5.9c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z" />
    </svg>
  );
}

function DownloadButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}): React.JSX.Element {
  const isPlaceholder = href === '#';

  return (
    <div className="relative">
      <a
        href={href}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full border border-violet-200',
          'bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm transition-all',
          'hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md',
        )}
      >
        {icon}
        {label}
      </a>

      {isPlaceholder && (
        <span className="absolute -right-2 -top-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
          Coming Soon
        </span>
      )}
    </div>
  );
}

export default function Hero(): React.JSX.Element {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  async function handleCopy(number: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(null), 1500);
    } catch (error) {
      console.error('Failed to copy number:', error);
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-violet-50 to-indigo-100/70 pt-32 pb-20">
      {/* Soft lavender background glow */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-200/40 blur-[100px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 top-40 h-[30rem] w-[30rem] rounded-full bg-indigo-200/40 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[40rem] text-indigo-900/[0.015]"
        aria-hidden="true"
      >
        🛡️
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Hero text */}
        <div>
          <Badge
            variant="red"
            className="mb-6 border border-violet-200 bg-white/80 text-indigo-800 shadow-sm"
          >
            🛡️ Women&apos;s Safety App
          </Badge>

          <h1 className="text-5xl font-bold leading-tight text-slate-900 sm:text-6xl">
            <span className="block font-devanagari text-slate-900">
              हर कदम,
            </span>
            <span className="block text-indigo-600">
              Surakshit.
            </span>
          </h1>

          <p className="mt-2 text-xl text-slate-800 sm:text-2xl">
            Every Step, Protected.
          </p>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            India&apos;s emergency safety app. Triple-tap SOS, live location sharing, and community
            support — in English, हिन्दी, and मराठी.
          </p>

          {/* Download buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <DownloadButton
              href={SITE.playStoreUrl}
              icon={<GooglePlayIcon />}
              label="Get it on Google Play"
            />

            <DownloadButton
              href={SITE.appStoreUrl}
              icon={<AppleIcon />}
              label="Download on the App Store"
            />
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="font-bold text-emerald-600">✓</span>
                {item}
              </span>
            ))}
          </div>

          {/* Quick dial */}
          <div className="mt-8 border-t border-violet-200 pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Quick dial:
            </p>

            <div className="flex flex-wrap gap-3">
              {QUICK_DIAL_NUMBERS.map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={(): void => void handleCopy(number)}
                  className="rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-violet-400 hover:bg-violet-100"
                >
                  {copiedNumber === number ? 'Copied!' : number}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Light phone mockup */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          {/* Lavender glow behind phone */}
          <div
            className="absolute inset-0 -z-10 rounded-full bg-violet-300/40 blur-[100px]"
            aria-hidden="true"
          />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mx-auto w-72 rounded-[3rem] border-[5px] border-slate-800 bg-slate-900 p-2 shadow-2xl shadow-indigo-900/20 sm:w-80"
          >
            {/* Phone screen */}
            <div className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-white via-violet-50 to-indigo-50 px-4 pb-5 pt-3">
              {/* Phone notch */}
              <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-900" />

              {/* Status bar */}
              <div className="flex items-center justify-between px-2 pt-1 text-[11px] font-semibold text-slate-700">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span aria-label="Mobile signal">▂▄▆</span>
                  <span aria-label="Wi-Fi">◉</span>
                  <span aria-label="Battery">▰</span>
                </div>
              </div>

              {/* App header */}
              <div className="mt-7 flex items-center justify-between px-1">
                <span className="text-base font-bold text-slate-900">
                  Surakshak
                </span>
                <span className="text-sm text-slate-500">⌁</span>
              </div>

              {/* Protected status */}
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-violet-100 bg-violet-100/80 px-3 py-3 text-[11px] text-slate-700">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                <span>
                  Safety status:{' '}
                  <span className="font-semibold text-indigo-700">Protected</span>
                </span>
              </div>

              {/* SOS button */}
              <div className="mt-7 flex flex-col items-center">
                <div className="relative flex h-40 w-40 items-center justify-center">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-rose-400/15" />

                  <span className="absolute inset-3 rounded-full bg-rose-200/40" />

                  <span className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-3xl font-bold text-white shadow-xl shadow-rose-500/25">
                    SOS
                  </span>
                </div>

                <p className="mt-3 text-[11px] text-slate-500">
                  Triple tap or shake
                </p>
              </div>

              {/* Emergency contact: Mom */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-5 flex items-center justify-between rounded-2xl border border-violet-100 bg-white/90 px-4 py-4 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Mom
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Emergency Contact
                  </p>
                </div>

                <span className="text-base font-bold text-emerald-600">
                  ✓
                </span>
              </motion.div>

              {/* Live location */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-3 flex items-center justify-between rounded-2xl border border-violet-100 bg-white/90 px-4 py-4 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Live Location
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Ready to share
                  </p>
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-lg text-indigo-600">
                  📍
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
