import { SITE } from '@/constants';
import { cn } from '@/lib/utils';

type DownloadButtonVariant = 'glass' | 'solid';

const BUTTON_CLASSES: Record<DownloadButtonVariant, string> = {
  glass: 'border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20',
  solid: 'bg-white text-primary-red transition-transform hover:scale-[1.02]',
};

const BADGE_CLASSES: Record<DownloadButtonVariant, string> = {
  glass: 'bg-saffron text-near-black',
  solid: 'bg-near-black text-white',
};

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

interface DownloadButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  variant: DownloadButtonVariant;
}

function DownloadButton({ href, icon, label, variant }: DownloadButtonProps): React.JSX.Element {
  const isPlaceholder = href === '#';
  return (
    <div className="relative">
      <a
        href={href}
        aria-disabled={isPlaceholder}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold',
          BUTTON_CLASSES[variant],
        )}
      >
        {icon}
        {label}
      </a>
      {isPlaceholder && (
        <span
          className={cn(
            'absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-bold',
            BADGE_CLASSES[variant],
          )}
        >
          Coming Soon
        </span>
      )}
    </div>
  );
}

interface DownloadButtonsProps {
  variant: DownloadButtonVariant;
  className?: string;
}

export function DownloadButtons({ variant, className }: DownloadButtonsProps): React.JSX.Element {
  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      <DownloadButton
        href={SITE.playStoreUrl}
        icon={<GooglePlayIcon />}
        label="Get it on Google Play"
        variant={variant}
      />
      <DownloadButton
        href={SITE.appStoreUrl}
        icon={<AppleIcon />}
        label="Download on the App Store"
        variant={variant}
      />
    </div>
  );
}
