'use client';

import { motion } from 'framer-motion';

import {
  FADE_UP,
  STAGGER_CONTAINER,
  useScrollAnimation,
} from '@/hooks/useScrollAnimation';
import { HOW_IT_WORKS } from '@/constants';

const STEP_COLOR_CLASSES = [
  'text-indigo-light',
  'text-indigo-light',
  'text-indigo-light',
  'text-indigo-light',
] as const;

export default function HowItWorks(): React.JSX.Element {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="how-it-works" className="bg-[#0b1020] py-24 text-white">
      <div className="mx-auto w-[92%] max-w-6xl">
        {/* Section Heading */}
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[1.3px] text-[#a59aff]">
            Simple Setup
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Four steps. Then you&apos;re protected.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#aeb5c5] sm:text-lg">
            Getting started with Surakshak is simple. Set up your safety
            network and keep your emergency tools ready.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          ref={ref}
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HOW_IT_WORKS.map((step, index) => (
            <motion.div
              key={step.step}
              variants={FADE_UP}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition-colors duration-300 hover:bg-white/[0.09]"
            >
              <span
                className={`text-3xl font-extrabold ${STEP_COLOR_CLASSES[index]}`}
              >
                {String(step.step).padStart(2, '0')}
              </span>

              <h3 className="mt-5 text-lg font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#aeb5c5]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
