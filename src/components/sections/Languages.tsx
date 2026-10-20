const LANGUAGE_CARDS = [
  {
    flag: '🇬🇧',
    native: 'English',
    supportLabel: 'Full support',
    englishName: 'English',
    sample: 'SOS alert sent to your emergency contacts.',
    devanagari: false,
  },
  {
    flag: '🇮🇳',
    native: 'हिन्दी',
    supportLabel: 'पूर्ण समर्थन',
    englishName: 'Hindi',
    sample: 'आपका एसओएस अलर्ट भेज दिया गया है।',
    devanagari: true,
  },
  {
    flag: '🇮🇳',
    native: 'मराठी',
    supportLabel: 'पूर्ण आधार',
    englishName: 'Marathi',
    sample: 'तुमचा एसओएस अलर्ट पाठवला गेला आहे.',
    devanagari: true,
  },
] as const;

export default function Languages(): React.JSX.Element {
  return (
    <section
      id="languages"
      aria-labelledby="languages-heading"
      className="bg-[#FBF9FF] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[90%] max-w-6xl">
        <div className="grid items-end gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B527E]">
              Safety should feel familiar
            </p>

            <h2
              id="languages-heading"
              className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl lg:text-5xl"
            >
              Help feels closer when it speaks your language.
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8 md:pb-1">
            Important moments can be overwhelming. Clear, familiar language
            can make safety information easier to understand when it matters.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-14">
          {LANGUAGE_CARDS.map((lang, index) => (
            <article
              key={lang.englishName}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#7954A5]/10 bg-white p-6 shadow-[0_3px_14px_rgba(52,36,66,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#7954A5]/25 hover:shadow-[0_14px_32px_rgba(52,36,66,0.07)] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8E4F0] text-2xl"
                  aria-hidden="true"
                >
                  {lang.flag}
                </span>

                <span className="text-xs font-semibold tracking-wider text-[#B7A8C5]">
                  0{index + 1}
                </span>
              </div>

              <p
                className={`mt-6 text-3xl font-bold tracking-tight text-[#342442] ${
                  lang.devanagari ? 'font-devanagari' : ''
                }`}
              >
                {lang.native}
              </p>

              <p
                className={`mt-2 text-sm font-medium text-[#7954A5] ${
                  lang.devanagari ? 'font-devanagari' : ''
                }`}
              >
                {lang.supportLabel}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#9B527E]">
                {lang.englishName}
              </p>

              <div className="mt-7 flex flex-1 flex-col rounded-2xl bg-[#F8F3FC] p-4 sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9B527E]">
                  Example alert
                </p>

                <p
                  className={`mt-3 text-sm leading-7 text-[#594B67] ${
                    lang.devanagari ? 'font-devanagari' : ''
                  }`}
                >
                  “{lang.sample}”
                </p>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#7954A5] to-[#C16B9B] transition-transform duration-300 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-sm leading-7 text-[#796B86]">
            The goal is simple: make important messages easier to recognise
            and understand in the language you choose.
          </p>

          <div className="rounded-2xl border border-[#C16B9B]/15 bg-[#F9E8F1] px-5 py-4">
            <p className="text-xs font-semibold leading-6 text-[#793E68]">
              Emergency numbers stay in digits: 112, 100, 1091.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
