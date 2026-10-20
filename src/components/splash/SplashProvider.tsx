'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';

import { SPLASH_SESSION_KEY } from '@/components/splash/splash-boot';
import SplashScreen, {
  SPLASH_INTRO_MS,
  type SplashPhase,
} from '@/components/splash/SplashScreen';

const SESSION_KEY = SPLASH_SESSION_KEY;

type TimedPhase = Exclude<SplashPhase, 'done'>;

interface PhaseStep {
  next: SplashPhase;
  ms: number;
}

const PHASE_TIMELINE: Record<TimedPhase, PhaseStep> = {
  intro: { next: 'opening', ms: SPLASH_INTRO_MS },
  opening: { next: 'revealing', ms: 800 },
  revealing: { next: 'done', ms: 750 },
};

/* true  = the page behind the splash may start its own entrance animation.
   Defaults to true so components keep working if no provider wraps them. */
const SplashReadyContext = createContext<boolean>(true);

export function useSplashReady(): boolean {
  return useContext(SplashReadyContext);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function shouldSkipSplash(): boolean {
  // `?splash` forces a replay, handy for demos and design reviews.
  if (new URLSearchParams(window.location.search).has('splash')) {
    return false;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  // Someone arriving at /#features wants that section, not an intro.
  if (window.location.hash.length > 1) {
    return true;
  }

  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    // Storage blocked (private mode, strict settings): just play it.
    return false;
  }
}

function markSplashSeen(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Storage unavailable: the splash may replay on reload, which is harmless.
  }
}

interface SplashProviderProps {
  children: ReactNode;
}

export default function SplashProvider({
  children,
}: SplashProviderProps): React.JSX.Element {
  const [phase, setPhase] = useState<SplashPhase>('intro');

  // Decide before first paint whether this visitor needs the splash at all.
  useIsomorphicLayoutEffect(() => {
    if (shouldSkipSplash()) {
      setPhase('done');
    }
  }, []);

  // Remember the visit only once the splash has finished. Doing this at mount
  // breaks in dev: React StrictMode runs effects twice, and the second run
  // would see its own flag and skip the splash after a single frame.
  useEffect(() => {
    if (phase === 'done') {
      markSplashSeen();
    }
  }, [phase]);

  // Walk intro -> opening -> revealing -> done.
  useEffect(() => {
    if (phase === 'done') {
      return;
    }

    const step = PHASE_TIMELINE[phase];
    const timeoutId = window.setTimeout(() => {
      setPhase(step.next);
    }, step.ms);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [phase]);

  // Lock page scroll only while the splash is fully covering it.
  useEffect(() => {
    if (phase !== 'intro' && phase !== 'opening') {
      return;
    }

    const root = document.documentElement;
    root.classList.add('overflow-hidden');

    return () => {
      root.classList.remove('overflow-hidden');
    };
  }, [phase]);

  const handleSkip = useCallback((): void => {
    setPhase((current) => (current === 'intro' ? 'opening' : current));
  }, []);

  const heroReady = phase === 'revealing' || phase === 'done';

  return (
    <SplashReadyContext.Provider value={heroReady}>
      {children}
      {phase !== 'done' && <SplashScreen phase={phase} onSkip={handleSkip} />}
    </SplashReadyContext.Provider>
  );
}
