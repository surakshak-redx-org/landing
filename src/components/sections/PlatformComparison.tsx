const ANDROID_FEATURES = [
  'Silent SMS — no user tap needed',
  'Direct call — no dialpad, no delay',
  'Background shake detection (foreground service)',
  'Works completely offline',
  'Parallel SMS to all contacts at once',
] as const;

const IOS_FEATURES = [
  'SMS compose sheet pre-filled (one tap)',
  'Dialer pre-filled (one tap)',
  'All other features identical',
  'Works offline',
] as const;

function AndroidIcon(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 8v8a1 1 0 0 0 1 1h1v3a1.5 1.5 0 0 0 3 0v-3h2v3a1.5 1.5 0 0 0 3 0v-3h1a1 1 0 0 0 1-1V8H6Z" />
      <path d="M6.5 4.5 5 2.7a.5.5 0 1 1 .8-.6l1.6 1.9A6.9 6.9 0 0 1 12 3c1.4 0 2.7.4 3.7 1l1.6-1.9a.5.5 0 1 1 .8.6l-1.5 1.8A6 6 0 0 1 19 9H5a6 6 0 0 1 1.5-4.5ZM9 6.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm6 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
      <rect x="2" y="8" width="2" height="7" rx="1" />
      <rect x="20" y="8" width="2" height="7" rx="1" />
    </svg>
  );
}

function AppleGlyph(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.7 12.3c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.4-.9-2.4-3.9ZM14.6 5.9c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z" />
    </svg>
  );
}

export default function PlatformComparison(): React.JSX.Element {
  return (
    <section
      id="platform-comparison"
      aria-labelledby="platform-comparison-heading"
      className="bg-[#FBF9FF] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[90%] max-w-6xl">
        <div className="grid items-end gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B527E]">
              Designed for your device
            </p>

            <h2
              id="platform-comparison-heading"
              className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl lg:text-5xl"
            >
              Same intention.
              <span className="block font-medium text-[#7954A5]">
                Different capabilities.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8 md:pb-1">
            Your phone’s operating system affects how some emergency actions
            work. Here’s what to know before choosing the features you rely on.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          <article className="group relative overflow-hidden rounded-3xl border border-[#7954A5]/15 bg-white p-6 shadow-[0_4px_20px_rgba(52,36,66,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(52,36,66,0.08)] sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7954A5] to-[#C16B9B]"
            />

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0E8FA] text-[#7954A5]">
                <AndroidIcon />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#342442] sm:text-2xl">
                  Android
                </h3>
                <p className="mt-1 text-sm font-medium text-[#7954A5]">
                  More background capabilities
                </p>
              </div>

              <span className="ml-auto hidden rounded-full bg-[#F0E8FA] px-3 py-1.5 text-xs font-semibold text-[#7954A5] sm:inline-flex">
                Android
              </span>
            </div>

            <p className="mt-6 text-sm leading-7 text-[#796B86]">
              Android can allow certain emergency actions to run with fewer
              manual steps, depending on granted permissions and system
              restrictions.
            </p>

            <ul className="mt-6 space-y-4">
              {ANDROID_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-[#594B67]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0E8FA] text-xs font-bold text-[#7954A5]"
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl bg-[#F8F3FC] p-4">
              <p className="text-xs leading-6 text-[#796B86]">
                <span className="font-semibold text-[#342442]">
                  Good to know:
                </span>{' '}
                Background features may depend on permissions, battery
                optimisation, network availability, and your device.
              </p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-[#C16B9B]/15 bg-white p-6 shadow-[0_4px_20px_rgba(52,36,66,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(52,36,66,0.08)] sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C16B9B] to-[#7954A5]"
            />

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F9E8F1] text-[#A34E83]">
                <AppleGlyph />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#342442] sm:text-2xl">
                  iPhone
                </h3>
                <p className="mt-1 text-sm font-medium text-[#A34E83]">
                  Clear, user-confirmed actions
                </p>
              </div>

              <span className="ml-auto hidden rounded-full bg-[#F9E8F1] px-3 py-1.5 text-xs font-semibold text-[#A34E83] sm:inline-flex">
                iOS
              </span>
            </div>

            <p className="mt-6 text-sm leading-7 text-[#796B86]">
              iOS places stricter limits on some background actions. Certain
              messaging and calling features open the relevant system screen
              for you to confirm.
            </p>

            <ul className="mt-6 space-y-4">
              {IOS_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-[#594B67]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F9E8F1] text-xs font-bold text-[#A34E83]"
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}

              <li className="flex items-start gap-3 text-sm leading-6 text-[#594B67]">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F9E8F1] text-xs font-bold text-[#A34E83]"
                >
                  i
                </span>
                Silent messaging and direct calling may not be available in
                the same way as on Android.
              </li>
            </ul>

            <div className="mt-7 rounded-2xl bg-[#FCF4F8] p-4">
              <p className="text-xs leading-6 text-[#796B86]">
                <span className="font-semibold text-[#342442]">
                  Good to know:
                </span>{' '}
                Review the confirmation screens and permissions so you know
                what to expect when using these features.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#7954A5]/10 bg-[#F0E8FA]/60 px-5 py-4">
          <span className="text-lg" aria-hidden="true">
            ♡
          </span>
          <p className="text-xs leading-6 text-[#796B86] sm:text-sm">
            <span className="font-semibold text-[#342442]">
              A small but important note:
            </span>{' '}
            Actual behaviour can vary by operating-system version, device
            settings, permissions, and network availability. Test the
            configured features on your own device before relying on them.
          </p>
        </div>
      </div>
    </section>
  );
}
