import { DownloadButtons } from '@/components/ui/DownloadButton';
import { SITE } from '@/constants';

export default function CTA(): React.JSX.Element {
  return (
    <section
      id="get-started"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-[#342442] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#7954A5]/30 blur-3xl sm:h-96 sm:w-96"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#C16B9B]/20 blur-3xl sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto w-[90%] max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-[#F5D9EA]">
          <span aria-hidden="true">♡</span>
          A thoughtful step towards preparedness
        </span>

        <h2
          id="cta-heading"
          className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Feel a little more prepared for the journeys ahead.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
          Explore Surakshak’s safety tools, set up your trusted contacts,
          and get familiar with the features that fit your needs — before
          you need them.
        </p>

        <DownloadButtons
          variant="solid"
          className="mt-8 justify-center"
        />

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium text-white/70 sm:text-sm">
          <span className="flex items-center gap-2">
            <span className="text-[#E8C8F4]" aria-hidden="true">
              ✦
            </span>
            Practical safety tools
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

          <span className="flex items-center gap-2">
            <span className="text-[#E8C8F4]" aria-hidden="true">
              ✦
            </span>
            Information in familiar languages
          </span>
        </div>

        <div className="mx-auto mt-10 flex max-w-lg flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#342442]"
          >
            Contact & support
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </a>

          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#342442]"
          >
            Explore our GitHub
            <span className="ml-2" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-xs leading-6 text-white/50">
          Surakshak supports safety planning and access to information. It
          cannot guarantee personal safety or emergency response.
        </p>
      </div>
    </section>
  );
}
