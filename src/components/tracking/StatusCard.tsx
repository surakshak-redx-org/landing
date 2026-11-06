import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export type StatusTone = 'neutral' | 'ok' | 'danger';

interface StatusCardProps {
  tone: StatusTone;
  icon: LucideIcon;
  title: string;
  body: string;
}

const TONE_CLASSES: Record<StatusTone, string> = {
  neutral: 'bg-track-line/60 text-track-muted',
  ok: 'bg-track-ok-bg text-track-ok-ink',
  danger: 'bg-track-danger-bg text-track-danger-ink',
};

/** Full-page message for states without a map: arrived, ended, invalid, configuration error. */
export function StatusCard({ tone, icon: Icon, title, body }: StatusCardProps): React.JSX.Element {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <div
        role="status"
        className="w-full max-w-sm rounded-3xl bg-track-surface p-6 text-center shadow-sm ring-1 ring-track-line"
      >
        <div
          className={cn(
            'mx-auto flex h-14 w-14 items-center justify-center rounded-full',
            TONE_CLASSES[tone],
          )}
        >
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-xl font-semibold leading-snug text-track-ink">{title}</h1>
        <p className="mt-2 text-base leading-relaxed text-track-muted">{body}</p>
      </div>
    </div>
  );
}
