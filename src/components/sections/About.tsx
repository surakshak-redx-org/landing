import { SITE } from '@/constants';

const PROJECT_HIGHLIGHTS = [
  { value: '3', label: 'Languages' },
  { value: '8', label: 'Safety features' },
  { value: '6', label: 'Emergency numbers' },
] as const;

export default function About(): React.JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#FBF9FF] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[90%] max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B527E]">
              The people behind the purpose
            </p>

            <h2
              id="about-heading"
              className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl lg:text-5xl"
            >
              Technology with a little more heart.
            </h2>

            <p className="mt-6 text-base leading-8 text-[#796B86]">
              Surakshak is built by students at {SITE.collegeName}, Mumbai,
              as part of {SITE.clubName} — a student-led tech community
              exploring how technology can make a meaningful difference.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8">
              The idea starts with a simple question: how can we make it
              easier for women to access useful safety tools, trusted
              contacts, and important information when they need them?
              Surakshak is our effort to explore that question through
              thoughtful, practical technology.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#7954A5]/15 bg-[#F0E8FA] px-4 py-2 text-xs font-semibold text-[#7954A5]">
                Student-led initiative
              </span>

              <span className="rounded-full border border-[#C16B9B]/15 bg-[#F9E8F1] px-4 py-2 text-xs font-semibold text-[#9B527E]">
                Built with purpose
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#F8E4F0] sm:-right-5 sm:-top-5 sm:h-32 sm:w-32"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-20 w-20 rounded-full bg-[#EDE3F8] sm:-bottom-5 sm:-left-5 sm:h-28 sm:w-28"
            />

            <div className="relative overflow-hidden rounded-3xl border border-[#7954A5]/10 bg-gradient-to-br from-[#F0E8FA] via-[#FBF9FF] to-[#F9E8F1] p-6 shadow-[0_12px_40px_rgba(52,36,66,0.06)] sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B527E]">
                    A project with purpose
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#342442] sm:text-4xl">
                    Surakshak
                  </h3>
                </div>

                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-sm"
                  aria-hidden="true"
                >
                  🛡️
                </span>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#796B86]">
                Useful tools. Familiar information. More ways to stay
                connected to the people you trust.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 border-y border-[#7954A5]/15 py-6 sm:gap-4">
                {PROJECT_HIGHLIGHTS.map((highlight) => (
                  <div key={highlight.label}>
                    <p className="text-2xl font-bold tabular-nums text-[#7954A5] sm:text-3xl">
                      {highlight.value}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#796B86]">
                      {highlight.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-white/80 bg-white/65 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B527E]">
                  Our intention
                </p>

                <p className="mt-3 font-devanagari text-2xl font-bold text-[#342442] sm:text-3xl">
                  हर कदम, सुरक्षित
                </p>

                <p className="mt-2 text-xs leading-6 text-[#796B86]">
                  Every step, with safety in mind.
                </p>
              </div>

              <p className="mt-5 text-xs leading-6 text-[#796B86]">
                Surakshak is designed to support safety planning and access
                to information. It cannot guarantee personal safety or
                emergency response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
