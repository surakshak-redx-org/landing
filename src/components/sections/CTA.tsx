import { DownloadButtons } from '@/components/ui/DownloadButton';
import { SITE } from '@/constants';

export default function CTA(): React.JSX.Element {
  return (
    <div className="bg-gradient-to-br from-primary-red to-shakti-purple py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          Your safety doesn&apos;t wait.
          <br />
          Neither should you.
        </h2>

        <p className="mt-4 text-lg text-white/80">
          Download Surakshak — free, no ads, works offline.
        </p>

        <DownloadButtons variant="solid" className="mt-8 justify-center" />

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact / Support
          </a>

          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Visit GitHub
          </a>
        </div>

        <p className="mt-6 text-sm text-white/70">
          Surakshak is designed to support safer journeys and emergency preparedness.
        </p>
      </div>
    </div>
  );
}
