'use client';

import { motion } from 'framer-motion';

import {
  FADE_UP,
  STAGGER_CONTAINER,
  useScrollAnimation,
} from '@/hooks/useScrollAnimation';
import { FEATURES } from '@/constants';

export default function Features(): React.JSX.Element {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="features" className="bg-[#f7f8fc] py-24">
      <div className="mx-auto w-[92%] max-w-6xl">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[1.3px] text-[#5b4ce6]">
            Safety Toolkit
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#101426] sm:text-4xl lg:text-5xl">
            Everything you need when it matters most.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#667085] sm:text-lg">
            A focused set of tools for emergencies, journeys,
            awareness and support.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={FADE_UP}
              whileHover={{ y: -5 }}
              className="group rounded-3xl border border-[#e8eaf1] bg-white p-6 shadow-[0_10px_35px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(16,20,38,0.10)]"
            >
              {/* Icon */}
              <div
                className={`mb-5 flex h-[42px] w-[42px] items-center justify-center rounded-[15px] text-xl ${feature.bg}`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 font-bold text-[#101426]">
                {feature.title}
              </h3>

              {/* Subtitle */}
              <p className="mb-3 text-sm font-semibold text-[#5b4ce6]">
                {feature.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#667085]">
                {feature.description}
              </p>

              {/* Platform Support */}
              {'platform' in feature && feature.platform && (
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    Android
                  </span>

                  <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-600">
                    iOS
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
