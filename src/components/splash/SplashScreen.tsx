'use client';

import { motion } from 'framer-motion';
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

export type SplashPhase = 'intro' | 'opening' | 'revealing' | 'done';

/** How long the intro plays before it opens on its own. */
export const SPLASH_INTRO_MS = 3400;

interface SplashScreenProps {
  phase: SplashPhase;
  onSkip: () => void;
}

interface GlowPosition {
  x: number;
  y: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const WORDMARK = 'Surakshak'.split('');

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

const RING_DELAYS = [0, 1.2, 2.4] as const;

/* Floating light specks. Positions are fixed (no Math.random) so server and
   client markup always match, and every class is a full static string so
   Tailwind can see it. */
const SPARKS = [
  { position: 'left-[8%] top-[74%]', size: 'h-1.5 w-1.5', tone: 'bg-[#E8A4C5]', delay: 0.2, duration: 6.5 },
  { position: 'left-[18%] top-[48%]', size: 'h-1 w-1', tone: 'bg-[#D9C4F0]', delay: 1.4, duration: 7.5 },
  { position: 'left-[27%] top-[82%]', size: 'h-2 w-2', tone: 'bg-[#C16B9B]', delay: 0.8, duration: 8 },
  { position: 'left-[38%] top-[26%]', size: 'h-1 w-1', tone: 'bg-white', delay: 2.1, duration: 6 },
  { position: 'left-[52%] top-[88%]', size: 'h-1.5 w-1.5', tone: 'bg-[#E8A4C5]', delay: 0.5, duration: 7 },
  { position: 'left-[63%] top-[34%]', size: 'h-1 w-1', tone: 'bg-[#D9C4F0]', delay: 1.8, duration: 8.5 },
  { position: 'left-[72%] top-[70%]', size: 'h-2 w-2', tone: 'bg-[#7954A5]', delay: 1, duration: 7.2 },
  { position: 'left-[81%] top-[52%]', size: 'h-1.5 w-1.5', tone: 'bg-[#E8A4C5]', delay: 2.6, duration: 6.8 },
  { position: 'left-[90%] top-[80%]', size: 'h-1 w-1', tone: 'bg-white', delay: 0.3, duration: 9 },
  { position: 'left-[92%] top-[22%]', size: 'h-1.5 w-1.5', tone: 'bg-[#D9C4F0]', delay: 1.6, duration: 7.8 },
] as const;

export default function SplashScreen({
  phase,
  onSkip,
}: SplashScreenProps): React.JSX.Element {
  const [glow, setGlow] = useState<GlowPosition>({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<number | null>(null);
  const rippleIdRef = useRef<number>(0);

  const isIntro = phase === 'intro';
  const isRevealing = phase === 'revealing';

  // Keyboard users land on the skip button straight away.
  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  // Escape = skip.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSkip]);

  // Stop any pending animation frame on unmount.
  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>): void {
    if (frameRef.current !== null) {
      return;
    }

    const { clientX, clientY } = event;

    frameRef.current = window.requestAnimationFrame(() => {
      setGlow({
        x: clientX - window.innerWidth / 2,
        y: clientY - window.innerHeight / 2,
      });
      frameRef.current = null;
    });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>): void {
    if (!isIntro) {
      return;
    }

    const id = rippleIdRef.current;
    rippleIdRef.current += 1;

    setRipples((current) => [
      ...current.slice(-5),
      { id, x: event.clientX, y: event.clientY },
    ]);
  }

  function removeRipple(id: number): void {
    setRipples((current) => current.filter((ripple) => ripple.id !== id));
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Surakshak"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      animate={{ opacity: isRevealing ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className={`splash-failsafe fixed inset-0 z-[100] overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,#4B3361_0%,#342442_52%,#241830_100%)] motion-reduce:hidden ${
        isRevealing ? 'pointer-events-none' : ''
      }`}
    >
      {/* Dot-grid texture, faded toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]"
      />

      {/* Cursor-following glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[230px] -mt-[230px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(193,107,155,0.38)_0%,transparent_66%)]"
        animate={{ x: glow.x, y: glow.y }}
        transition={{ type: 'spring', stiffness: 55, damping: 18, mass: 0.8 }}
      />

      {/* Signal rings radiating from the centre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {RING_DELAYS.map((delay) => (
          <motion.div
            key={`ring-${delay}`}
            className="absolute h-[44vmin] w-[44vmin] rounded-full border border-[#C16B9B]/45"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.3, 2.5], opacity: [0.65, 0] }}
            transition={{
              duration: 3.6,
              delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Orbits with travelling lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="absolute h-[54vmin] w-[54vmin] rounded-full border border-white/10" />
        <div className="absolute h-[80vmin] w-[80vmin] rounded-full border border-white/5" />

        <motion.div
          className="absolute h-[54vmin] w-[54vmin]"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8A4C5] shadow-[0_0_22px_6px_rgba(232,164,197,0.55)]" />
        </motion.div>

        <motion.div
          className="absolute h-[80vmin] w-[80vmin]"
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9C4F0] shadow-[0_0_18px_5px_rgba(217,196,240,0.45)]" />
        </motion.div>
      </div>

      {/* Drifting specks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {SPARKS.map((spark) => (
          <motion.span
            key={spark.position}
            className={`absolute rounded-full ${spark.position} ${spark.size} ${spark.tone}`}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.9, 0], y: [0, -150] }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* The light bloom: floods outward from the centre when we "enter" */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          className="h-[160vmax] w-[160vmax] shrink-0 rounded-full border-[1.2vmax] border-[#C16B9B]/25 bg-gradient-to-br from-[#FBF9FF] via-[#FDF4FB] to-[#F8E4F0]"
          initial={{ scale: 0 }}
          animate={{ scale: isIntro ? 0 : 1 }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT }}
        />
      </div>

      {/* Centre content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        animate={
          isIntro ? { scale: 1, opacity: 1 } : { scale: 1.4, opacity: 0 }
        }
        transition={{ duration: 0.6, ease: [0.64, 0, 0.78, 0] }}
      >
        <motion.p
          className="font-serif text-lg italic text-[#E8D9F5] sm:text-2xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
        >
          Enter the world of
        </motion.p>

        <p className="mt-3 flex items-end justify-center text-5xl font-bold leading-[1.1] tracking-tight text-[#FBF9FF] sm:text-7xl lg:text-8xl">
          <span className="sr-only">Surakshak</span>

          <span
            aria-hidden="true"
            className="flex overflow-hidden pb-2"
          >
            {WORDMARK.map((letter, index) => (
              <motion.span
                key={`letter-${index}`}
                className="inline-block"
                initial={{ y: '115%', rotate: 6 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.55 + index * 0.055,
                  ease: EASE_OUT,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>

          {/* The brand dot — pops in last, then keeps a slow pulse */}
          <motion.span
            aria-hidden="true"
            className="mb-3 ml-1 inline-flex sm:mb-5 lg:mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.7, 1], opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.15, ease: 'easeOut' }}
          >
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-[#C16B9B] shadow-[0_0_18px_5px_rgba(193,107,155,0.6)] sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4"
              animate={{ scale: [1, 1.35, 1] }}
              transition={{
                duration: 1.8,
                delay: 1.9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.span>
        </p>

        <motion.p
          className="mt-5 font-devanagari text-lg text-[#E8A4C5] sm:text-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: EASE_OUT }}
        >
          हर कदम, सुरक्षित.
        </motion.p>

        <motion.p
          className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.9 }}
        >
          A women&apos;s safety platform
        </motion.p>
      </motion.div>

      {/* Tap ripples */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-24 w-24 rounded-full border-2 border-[#E8A4C5]/70"
          initial={{ x: ripple.x - 48, y: ripple.y - 48, scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 3.2, opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          onAnimationComplete={(): void => removeRipple(ripple.id)}
        />
      ))}

      {/* Enter / skip — focusable from the start; its fill shows the auto-enter countdown */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-[max(2rem,env(safe-area-inset-bottom))]">
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={onSkip}
          aria-label="Skip intro and enter the Surakshak website"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isIntro ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6, delay: isIntro ? 0.9 : 0 }}
          className="relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-[#FBF9FF] backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A4C5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#342442]"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 origin-left bg-gradient-to-r from-[#7954A5]/70 to-[#C16B9B]/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: SPLASH_INTRO_MS / 1000,
              ease: 'linear',
            }}
          />
          <span className="relative">
            Enter now <span aria-hidden="true">→</span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}