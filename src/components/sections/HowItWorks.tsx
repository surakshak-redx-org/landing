'use client';

import { motion } from 'framer-motion';

import { FADE_UP, STAGGER_CONTAINER, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { HOW_IT_WORKS } from '@/constants';

export default function HowItWorks(): React.JSX.Element {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-4xl font-bold text-ink">Up and running in 4 steps.</h2>

      <motion.div
        ref={ref}
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-4"
      >
        {HOW_IT_WORKS.map((step, index) => (
          <motion.div key={step.step} variants={FADE_UP} className="relative">
            {index < HOW_IT_WORKS.length - 1 && (
              <span
                className="absolute top-6 left-full hidden h-px w-10 bg-stone-200 lg:block"
                aria-hidden="true"
              />
            )}
            <span className={`text-5xl font-extrabold ${STEP_COLOR_CLASSES[index]}`}>
              {step.step}
            </span>
            <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-stone">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const STEP_COLOR_CLASSES = [
  'text-primary-red',
  'text-shakti-purple',
  'text-saffron',
  'text-forest-green',
] as const;
