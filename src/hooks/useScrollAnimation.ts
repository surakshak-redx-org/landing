'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

type UseInViewOptions = NonNullable<Parameters<typeof useInView>[1]>;

export function useScrollAnimation(options?: {
  once?: boolean;
  margin?: UseInViewOptions['margin'];
}): { ref: React.RefObject<HTMLDivElement | null>; isInView: boolean } {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? '0px 0px -80px 0px',
  });
  return { ref, isInView };
}

export const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const STAGGER_CONTAINER = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};
