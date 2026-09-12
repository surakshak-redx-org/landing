'use client';

import { motion } from 'framer-motion';

import { FADE_UP, STAGGER_CONTAINER, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FEATURES } from '@/constants';

const SUBTITLE_TEXT_CLASSES: Record<string, string> = {
  'bg-red-50': 'text-primary-red',
  'bg-purple-50': 'text-shakti-purple',
  'bg-green-50': 'text-forest-green',
  'bg-orange-50': 'text-saffron',
  'bg-stone-50': 'text-stone',
};

export default function Features(): React.JSX.Element {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-red">
          Everything You Need
        </p>
        <h2 className="mt-3 text-4xl font-bold text-ink">Built for real emergencies.</h2>
        <p className="mt-4 text-lg text-stone">
          Not just another safety app. Features that work when it matters most.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.id}
            variants={FADE_UP}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${feature.bg}`}
            >
              {feature.icon}
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">{feature.title}</h3>
            <p
              className={`mt-1 text-sm font-semibold ${
                SUBTITLE_TEXT_CLASSES[feature.bg] ?? 'text-primary-red'
              }`}
            >
              {feature.subtitle}
            </p>
            <p className="mt-3 text-sm text-stone">{feature.description}</p>

            {'platform' in feature && feature.platform && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-forest-green">
                  Android ✅
                </span>
                <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-stone">
                  iOS ⚠️
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
