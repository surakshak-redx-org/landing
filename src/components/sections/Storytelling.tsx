'use client';

import { motion, useReducedMotion } from 'framer-motion';

const STORIES = [
  {
    number: '01',
    title: 'The ride back home',
    description:
      'College ran late? Keep your emergency contacts ready before the journey begins.',
    color: '#9B527E',
  },
  {
    number: '02',
    title: 'When plans change',
    description:
      'Plans change. Know which safety tools and emergency information you can turn to.',
    color: '#7952B3',
  },
  {
    number: '03',
    title: 'The people you trust',
    description:
      'Keep the important people in your life close when you need to reach out.',
    color: '#946A4B',
  },
] as const;

export default function Storytelling(): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="storytelling-heading"
      className="overflow-hidden bg-[#FBF6EF] py-12 text-[#342442] sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid w-[90%] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9B527E]">
              The moments that matter
            </p>

            <h2
              id="storytelling-heading"
              className="mt-3 max-w-lg text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            >
              Every journey has someone waiting.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#716675] sm:text-base">
              A little reassurance. A familiar voice. Knowing what to do
              when plans change.
            </p>
          </motion.div>

          <div className="mt-6">
            {STORIES.map((story, index) => (
              <motion.article
                key={story.number}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="grid grid-cols-[32px_1fr] gap-3 border-t border-[#DFD1C2] py-4 sm:grid-cols-[38px_1fr] sm:gap-4"
              >
                <span
                  className="pt-0.5 text-xs font-bold"
                  style={{ color: story.color }}
                >
                  {story.number}
                </span>

                <div>
                  <h3 className="text-base font-bold sm:text-lg">
                    {story.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-6 text-[#716675]">
                    {story.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-3 font-devanagari text-base text-[#7952B3]">
            हर कदम, सुरक्षित.
          </p>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[#EDE3F8] blur-2xl" />
          <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-[#F9DDED] blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-[#E7D8CA] bg-white p-2 shadow-[0_16px_40px_rgba(75,49,65,0.10)]">
            <div className="relative overflow-hidden rounded-[1.35rem]">
              <img
                src="/images/surakshak-story.png"
                alt="An Indian mother warmly welcoming her daughter home after a journey"
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F9DDED] text-xl text-[#7952B3]"
                  >
                    ♡
                  </span>

                  <div>
                    <h3 className="text-base font-bold leading-snug text-[#342442] sm:text-lg">
                      You deserve to feel confident in the life you choose to live.
                    </h3>
                    <p className="mt-2 text-sm leading-5 text-[#716675]">
                      Your plans. Your journeys. Your people. Keep the tools you need
                      close, and take things one step at a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
