import { EMERGENCY_NUMBERS } from '@/constants';

export default function EmergencyStrip(): React.JSX.Element {
  return (
    <section
      id="emergency"
      aria-labelledby="emergency-heading"
      className="bg-[#EDE3F8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[90%] max-w-6xl">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_0.8fr] md:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B527E]">
              A little information, a lot of reassurance
            </p>

            <h2
              id="emergency-heading"
              className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl lg:text-5xl"
            >
              Save these numbers.
              <span className="block font-medium text-[#7954A5]">
                They could matter.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8 md:pb-1">
            You don’t need to memorise every number. Keep the ones that may
            help you close by, so you know where to turn when you need support.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-12 lg:grid-cols-6">
          {EMERGENCY_NUMBERS.map((item, index) => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              aria-label={`Call ${item.label} at ${item.number}`}
              className="group relative flex min-h-40 flex-col items-start overflow-hidden rounded-2xl border border-[#7954A5]/10 bg-[#FBF9FF] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#7954A5]/30 hover:bg-white hover:shadow-[0_12px_28px_rgba(52,36,66,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7954A5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDE3F8] sm:p-5"
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8E4F0] text-xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <span className="text-[10px] font-semibold tracking-wider text-[#B7A8C5]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <span className="mt-5 text-2xl font-bold tabular-nums tracking-tight text-[#7954A5] sm:text-3xl">
                {item.number}
              </span>

              <span className="mt-2 text-xs font-medium leading-5 text-[#796B86] sm:text-sm">
                {item.label}
              </span>

              <span className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-[#9B527E] transition-colors group-hover:text-[#7954A5]">
                Call number
                <span aria-hidden="true">↗</span>
              </span>

              <span
                aria-hidden="true"
                className="absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#7954A5] to-[#C16B9B] transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </div>

        <div className="mt-8 flex items-start justify-center gap-3 rounded-2xl border border-[#7954A5]/10 bg-white/60 px-5 py-4 sm:items-center">
          <span className="mt-0.5 text-lg" aria-hidden="true">
            ♡
          </span>
          <p className="text-xs leading-6 text-[#796B86] sm:text-sm">
            <span className="font-semibold text-[#342442]">
              Keep this in mind:
            </span>{' '}
            Emergency calls may work without mobile data, but availability
            depends on cellular coverage and the service. Some calls may
            require an active SIM or network access.
          </p>
        </div>
      </div>
    </section>
  );
}
