'use client';

import { motion } from 'framer-motion';

import {
  FADE_UP,
  STAGGER_CONTAINER,
  useScrollAnimation,
} from '@/hooks/useScrollAnimation';
import { HOW_IT_WORKS } from '@/constants';

const STEP_COLOR_CLASSES = [
  'text-[#7954A5]',
  'text-[#A34E83]',
  'text-[#7954A5]',
  'text-[#A34E83]',
] as const;

const STEP_BACKGROUNDS = [
  'bg-[#F0E8FA]',
  'bg-[#F9E8F1]',
  'bg-[#F0E8FA]',
  'bg-[#F9E8F1]',
] as const;

export default function HowItWorks(): React.JSX.Element {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-[#F8E4F0] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[90%] max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={FADE_UP}
          className="mb-12 grid items-end gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:mb-16"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B527E]">
              A few thoughtful steps
            </p>

            <h2
              id="how-it-works-heading"
              className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl lg:text-5xl"
            >
              Your safety tools, ready when you need them.
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8 md:pb-1">
            Start with the basics, choose the features that work for you, and
            get familiar with them before you need them. You can take it one
            step at a time.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4"
        >
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-[#7954A5]/20 via-[#C16B9B]/50 to-[#7954A5]/20 lg:block"
          />

          {HOW_IT_WORKS.map((step, index) => (
            <motion.article
              key={step.step}
              variants={FADE_UP}
              whileHover={{ y: -4 }}
              className="group relative flex h-full flex-col rounded-2xl border border-[#7954A5]/10 bg-[#FBF9FF] p-5 shadow-[0_3px_14px_rgba(52,36,66,0.03)] transition-all duration-300 hover:border-[#7954A5]/25 hover:bg-white hover:shadow-[0_12px_30px_rgba(52,36,66,0.07)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${STEP_BACKGROUNDS[index] ?? 'bg-[#F0E8FA]'} ${STEP_COLOR_CLASSES[index] ?? 'text-[#7954A5]'}`}
                >
                  {String(step.step).padStart(2, '0')}
                </span>

                <span className="text-xs font-semibold uppercase tracking-wider text-[#B7A8C5]">
                  Step {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold leading-snug text-[#342442]">
                {step.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-[#796B86]">
                {step.description}
              </p>

              <div
                aria-hidden="true"
                className="mt-6 h-0.5 w-10 origin-left rounded-full bg-gradient-to-r from-[#7954A5] to-[#C16B9B] transition-all duration-300 group-hover:w-16"
              />
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs leading-6 text-[#796B86] sm:text-sm">
          Take a moment to explore the features and understand how they work
          before relying on them in an emergency.
        </p>
      </div>
    </section>
  );
}
