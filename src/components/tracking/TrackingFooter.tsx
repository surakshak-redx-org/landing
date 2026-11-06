import { SITE } from '@/constants';
import type { Messages } from '@/lib/tracking/messages';

interface TrackingFooterProps {
  messages: Messages;
}

/** Privacy reassurance plus a quiet link to the site. Deliberately small. */
export function TrackingFooter({ messages }: TrackingFooterProps): React.JSX.Element {
  return (
    <footer className="mt-3 border-t border-track-line pt-2 text-xs leading-relaxed text-track-muted">
      <p>{messages.privacy}</p>
      <a
        href={SITE.url}
        target="_blank"
        rel="noopener noreferrer"
        className="-my-1 inline-flex min-h-11 items-center underline underline-offset-2"
      >
        {messages.getSurakshak}
      </a>
    </footer>
  );
}
