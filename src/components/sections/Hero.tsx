'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { EMERGENCY_NUMBERS, SITE } from '@/constants';
import { cn } from '@/lib/utils';

const TRUST_ITEMS = [
  'Free forever',
  'No ads',
  'Works offline',
  '3 languages',
] as const;

interface DownloadButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  download?: boolean;
}

function GooglePlayIcon(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.6 2.4c-.4.3-.6.8-.6 1.4v16.4c0 .6.2 1.1.6 1.4l.1.1L13 12.5v-.2L3.7 2.3l-.1.1Z" />
      <path d="M16.2 15.7 13 12.5v-.2l3.2-3.2 4 2.3c1.1.6 1.1 1.6 0 2.2l-4 2.1Z" />
      <path d="m4.5 21.4 8.5-8.5 3.1 3.1L4.7 21.5c-.1 0-.2 0-.2-.1Z" />
      <path d="m13 11.7-8.5-8.5c.1 0 .2 0 .3.1l11.4 6.5-3.2 1.9Z" />
    </svg>
  );
}

function AppleIcon(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.7 12.3c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.4-.9-2.4-3.9ZM14.6 5.9c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z" />
    </svg>
  );
}

function DownloadButton({
  href,
  icon,
  label,
  download = false,
}: DownloadButtonProps): React.JSX.Element {
  const isPlaceholder = href === '#';

  return (
    <div className="relative">
      <a
        href={href}
        download={download}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full',
          'border border-white/20 bg-white/10 px-6 py-3 text-base',
          'font-semibold text-white backdrop-blur-sm transition-all',
          'hover:-translate-y-0.5 hover:bg-white/20',
        )}
      >
        {icon}
        {label}
      </a>

      {isPlaceholder && (
        <span className="absolute -right-2 -top-2 rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold text-near-black">
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

      window.setTimeout(() => {
        setCopiedNumber(null);
      }, 1500);
    } catch (error) {
      console.error('Failed to copy number:', error);
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-near-black via-[#210b12] to-[#1c0b2b] pb-20 pt-32">
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary-red/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-shakti-purple/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[40rem] text-white/[0.02]"
        aria-hidden="true"
      >
        🛡️
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <Badge
            variant="red"
            className="mb-6 border-white/20 bg-white/5 text-white"
          >
            🛡️ Women&apos;s Safety App
          </Badge>

          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            <span className="block font-devanagari text-white">
              हर कदम,
            </span>
            <span className="text-gradient-red block">Surakshit.</span>
          </h1>

          <p className="mt-2 text-xl text-stone-400 sm:text-2xl">
            Every Step, Protected.
          </p>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-300">
            India&apos;s emergency safety app. Triple-tap SOS, live location
            sharing, and community support — in English, हिन्दी, and मराठी.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <DownloadButton
              href={SITE.apkDownloadUrl}
              icon={<GooglePlayIcon />}
              label="Download APK"
              download
            />

            <DownloadButton
              href={SITE.appStoreUrl}
              icon={<AppleIcon />}
              label="Download on the App Store"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-400">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-forest-green">✓</span>
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Quick dial
            </p>

            <div className="flex flex-wrap gap-3">
              {EMERGENCY_NUMBERS.slice(0, 4).map(({ number }) => (
                <button
                  key={number}
                  type="button"
                  onClick={(): void => void handleCopy(number)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-primary-red hover:bg-primary-red/10"
                >
                  {copiedNumber === number ? 'Copied!' : number}
                </button>
              ))}
            </div>
          </div>
        </div>

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
            className="relative mx-auto w-72 rounded-[3rem] border-4 border-white/20 bg-near-black p-4 shadow-2xl shadow-primary-red/20"
          >
            <div className="flex items-center justify-between px-2 text-xs text-stone-400">
              <span>9:41</span>

              <div className="flex items-center gap-1">
                <span className="text-amber-500">🔋 35%</span>
                <span>📶</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 py-16">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary-red/40" />

                <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary-red text-2xl font-bold text-white shadow-lg shadow-primary-red/40">
                  SOS
                </span>
              </div>

              <p className="text-xs text-stone-400">
                Triple tap or shake
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="glass absolute -right-8 top-16 rounded-xl px-3 py-2 text-xs text-white shadow-lg"
            >
              📍 Location shared with 3 contacts
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="glass absolute -left-8 bottom-16 rounded-xl px-3 py-2 text-xs text-white shadow-lg"
            >
              ✅ SOS alert sent — 2.3s
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
