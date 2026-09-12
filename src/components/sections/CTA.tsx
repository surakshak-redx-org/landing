import { SITE } from '@/constants';

function GooglePlayIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.4c-.4.3-.6.8-.6 1.4v16.4c0 .6.2 1.1.6 1.4l.1.1L13 12.5v-.2L3.7 2.3l-.1.1Z" />
      <path d="M16.2 15.7 13 12.5v-.2l3.2-3.2 4 2.3c1.1.6 1.1 1.6 0 2.2l-4 2.1Z" />
      <path d="m4.5 21.4 8.5-8.5 3.1 3.1L4.7 21.5c-.1 0-.2 0-.2-.1Z" />
      <path d="m13 11.7-8.5-8.5c.1 0 .2 0 .3.1l11.4 6.5-3.2 1.9Z" />
    </svg>
  );
}

function AppleIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.3c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.4-.9-2.4-3.9ZM14.6 5.9c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z" />
    </svg>
  );
}

function CTADownloadButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}): React.JSX.Element {
  const isPlaceholder = href === '#';
  return (
    <div className="relative">
      <a
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-primary-red transition-transform hover:scale-[1.02]"
      >
        {icon}
        {label}
      </a>
      {isPlaceholder && (
        <span className="absolute -top-2 -right-2 rounded-full bg-near-black px-2 py-0.5 text-[10px] font-bold text-white">
          Coming Soon
        </span>
      )}
    </div>
  );
}

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

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CTADownloadButton
            href={SITE.playStoreUrl}
            icon={<GooglePlayIcon />}
            label="Get it on Google Play"
          />
          <CTADownloadButton
            href={SITE.appStoreUrl}
            icon={<AppleIcon />}
            label="Download on the App Store"
          />
        </div>

        <p className="mt-6 text-sm text-white/70">Available for Android and iOS • Free forever</p>
      </div>
    </div>
  );
}
