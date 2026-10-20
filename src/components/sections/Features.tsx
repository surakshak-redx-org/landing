'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';

import { FEATURES } from '@/constants';
import { JourneyConnector, JourneyRoadmap } from './JourneyLine';

const FEATURE_NUMBERS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
] as const;

const FEATURE_ACCENTS = [
  {
    surface: 'bg-[#FBE8F1]',
    ink: 'text-[#B84F89]',
    glow: 'bg-[#E8A4C5]/30',
    label: 'A moment for reassurance',
  },
  {
    surface: 'bg-[#EDE5FA]',
    ink: 'text-[#7954A5]',
    glow: 'bg-[#B9A0E6]/30',
    label: 'A little more connection',
  },
  {
    surface: 'bg-[#F9EDE1]',
    ink: 'text-[#A66B42]',
    glow: 'bg-[#E8C3A0]/30',
    label: 'A journey with a plan',
  },
  {
    surface: 'bg-[#E8F3EC]',
    ink: 'text-[#438263]',
    glow: 'bg-[#A9D6BA]/30',
    label: 'Stronger, together',
  },
  {
    surface: 'bg-[#E8ECFC]',
    ink: 'text-[#5C6DB1]',
    glow: 'bg-[#AAB8ED]/30',
    label: 'More awareness around you',
  },
  {
    surface: 'bg-[#FBEEDC]',
    ink: 'text-[#A57834]',
    glow: 'bg-[#E8CA91]/30',
    label: 'Knowledge that empowers',
  },
  {
    surface: 'bg-[#F7E6F4]',
    ink: 'text-[#A45191]',
    glow: 'bg-[#E2A6D7]/30',
    label: 'Your choices, your control',
  },
  {
    surface: 'bg-[#EDE5FA]',
    ink: 'text-[#7954A5]',
    glow: 'bg-[#B9A0E6]/30',
    label: 'Privacy when you need it',
  },
] as const;

export default function Features(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const featuresContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionScroll } = useScroll({
    target: featuresContainerRef,
    offset: ['start 75%', 'end 70%'],
  });

  const smoothScroll = useSpring(sectionScroll, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001,
  });

  const reveal = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.65,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="ambient-tech-bg relative isolate scroll-mt-24 overflow-hidden bg-[#FBF9FF] py-20 sm:py-28 lg:py-32"
    >
      {/* Soft colour washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-[#EDE3F8]/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[42%] -z-10 h-80 w-80 rounded-full bg-[#F8E4F0]/70 blur-3xl"
      />

      <div className="mx-auto w-[90%] max-w-6xl">
        {/* STORY OPENING */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="mx-auto mb-16 max-w-3xl text-center sm:mb-24"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#7954A5]/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7954A5]">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#C16B9B]"
            />
            Made for your everyday
          </span>

          <h2
            id="features-heading"
            className="mt-6 text-4xl font-bold leading-[1.12] tracking-tight text-[#342442] sm:text-5xl lg:text-6xl"
          >
            With you,
            <span className="mt-1 block bg-gradient-to-r from-[#7954A5] via-[#C16B9B] to-[#A34E83] bg-clip-text text-transparent">
              in every moment.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#796B86] sm:text-lg sm:leading-8">
            Every day brings its own little uncertainties. Surakshak brings
            together safety tools and useful information, so you can explore
            your options and decide what support works for you.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-8 flex items-center justify-center gap-2"
          >
            <span className="h-px w-12 bg-[#DCC9EC]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#C16B9B]" />
            <span className="h-px w-12 bg-[#DCC9EC]" />
          </div>
        </motion.div>

        {/* CINEMATIC STORY OPENING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative isolate mb-16 min-h-[480px] overflow-hidden rounded-[2rem] border border-[#7954A5]/10 bg-[#F8E4F0] shadow-[0_18px_55px_rgba(52,36,66,0.08)] sm:min-h-[540px] lg:mb-24 lg:min-h-[560px]"
        >
          <Image
            src="/images/surakshak-story-opening.png"
            alt="A college student standing near campus at sunset, holding her phone as she prepares for the journey ahead"
            fill
            priority={false}
            sizes="(max-width: 1024px) 90vw, 1152px"
            className="-z-20 object-cover object-[32%_center]"
          />

          {/* Blend the illustration into the text area */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#FBF9FF]/95 via-[#FBF9FF]/75 to-transparent lg:from-transparent lg:via-[#FBF9FF]/10 lg:to-[#FBF9FF]/95"
          />

          <div className="relative flex min-h-[480px] items-end p-6 sm:min-h-[540px] sm:p-10 lg:min-h-[560px] lg:items-center lg:justify-end lg:p-14">
            <div className="w-full rounded-[1.5rem] border border-white/70 bg-white/75 p-6 shadow-lg shadow-[#342442]/5 backdrop-blur-md sm:p-8 lg:max-w-[440px] lg:bg-white/85">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A34E83]">
                A little story about everyday life
              </p>

              <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl">
                The last lecture ends.
                <span className="mt-1 block font-serif italic text-[#A34E83]">
                  Your day is still yours.
                </span>
              </h3>

              <p className="mt-5 text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8">
                Your friends head home. The evening rush begins. You have places
                to go, people to meet, and plans of your own. You deserve useful
                information and support that help you make informed choices
                along the way.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-[#C16B9B]" />
                <p className="text-sm font-semibold text-[#7954A5]">
                  Your plans deserve room to grow.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Narrative transition & Interactive SVG Journey Roadmap */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-xl italic text-[#7954A5] sm:text-2xl"
          >
            And for the moments when a little support matters…
          </motion.p>

          <JourneyRoadmap
            scrollProgress={smoothScroll}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* FEATURE STORY */}
        <div ref={featuresContainerRef} className="relative">
          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-16">
            {FEATURES.map((feature, index) => {
              const accent =
                FEATURE_ACCENTS[index % FEATURE_ACCENTS.length] ??
                FEATURE_ACCENTS[0];

              const isReversed = index % 2 === 1;
              const isLast = index === FEATURES.length - 1;

              return (
                <motion.div
                  key={feature.id}
                  id={`chapter-${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.18 }}
                  variants={reveal}
                  className={`relative flex flex-col scroll-mt-28 ${isReversed ? 'lg:mt-16' : ''}`}
                >
                  <motion.article
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -6,
                            scale: 1.015,
                            transition: {
                              type: "spring",
                              stiffness: 280,
                              damping: 22,
                            },
                          }
                    }
                    className="group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[2rem] border border-[#7954A5]/10 bg-white/90 p-6 shadow-[0_8px_35px_rgba(52,36,66,0.045)] transition-shadow duration-300 hover:shadow-[0_18px_48px_rgba(52,36,66,0.09)] sm:min-h-[320px] sm:p-8 lg:p-9"
                  >
                    {/* Decorative glow */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-2xl ${accent.glow}`}
                    />

                    <div className="relative flex items-center justify-between gap-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${accent.surface} ${accent.ink}`}
                      >
                        Chapter {FEATURE_NUMBERS[index] ?? '01'}
                      </span>

                      <span
                        aria-hidden="true"
                        className="font-serif text-3xl text-[#D8C8E6] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                      >
                        {FEATURE_NUMBERS[index] ?? '01'}
                      </span>
                    </div>

                    <div className="relative mt-7 flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105 ${feature.bg}`}
                      >
                        {feature.icon}
                      </div>

                      <div className="min-w-0 flex-1 pt-1">
                        <p
                          className={`text-[11px] font-bold uppercase tracking-[0.14em] ${accent.ink}`}
                        >
                          {accent.label}
                        </p>

                        <h3 className="mt-2 text-xl font-bold leading-snug text-[#342442] sm:text-2xl">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    <p className={`relative mt-6 text-sm font-semibold leading-6 ${accent.ink}`}>
                      {feature.subtitle}
                    </p>

                    <p className="relative mt-2 flex-1 text-sm leading-7 text-[#796B86] sm:text-base">
                      {feature.description}
                    </p>

                    {'platform' in feature && feature.platform && (
                      <div className="relative mt-6 flex flex-wrap gap-2 border-t border-[#F0EAF5] pt-5">
                        <span className="rounded-full bg-[#E8F3EC] px-3 py-1.5 text-xs font-semibold text-[#438263]">
                          Android · Full support
                        </span>

                        <span className="rounded-full bg-[#F3EFF6] px-3 py-1.5 text-xs font-semibold text-[#796B86]">
                          iOS · Limited
                        </span>
                      </div>
                    )}

                    {/* Animated underline */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-8 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#7954A5] to-[#C16B9B] transition-transform duration-500 group-hover:scale-x-100 ${
                        prefersReducedMotion ? 'hidden' : ''
                      }`}
                    />
                  </motion.article>

                  {/* SVG Journey connector drawing with scroll percentage */}
                  {!isLast && (
                    <JourneyConnector
                      index={index}
                      isReversed={isReversed}
                      prefersReducedMotion={prefersReducedMotion}
                      scrollProgress={smoothScroll}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* STORY ENDING */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-[#EDE3F8] via-[#F9E8F1] to-[#FBF6EF] px-6 py-12 text-center shadow-[0_12px_45px_rgba(52,36,66,0.05)] sm:mt-24 sm:px-12 sm:py-16 lg:px-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 -top-16 h-48 w-48 rounded-full bg-white/50 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-8 h-56 w-56 rounded-full bg-[#D8BCEB]/40 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7954A5]">
              A little reminder
            </p>

            <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl lg:text-5xl">
              Your life is yours to live.
              <span className="mt-2 block font-serif italic text-[#A34E83]">
                Keep making it yours.
              </span>
            </h3>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8">
              Take what helps, learn what matters, and make the choices that
              feel right for you. Surakshak is here to offer tools and
              information along the way.
            </p>

            <a
              href="#how-it-works"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#7954A5] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(121,84,165,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#68438F] hover:shadow-[0_12px_26px_rgba(121,84,165,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2"
            >
              See how it works
              <span aria-hidden="true">→</span>
            </a>

            <p className="mt-5 text-xs leading-5 text-[#796B86]">
              Safety tools can help you prepare, but no tool can guarantee
              safety in every situation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
