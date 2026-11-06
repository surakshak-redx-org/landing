'use client';

import { CircleCheck, Link2Off, Settings, WifiOff, Hourglass } from 'lucide-react';

import { useNow } from '@/hooks/useNow';
import { useTracking } from '@/hooks/useTracking';
import { useTrackingLocale } from '@/hooks/useTrackingLocale';
import { deriveLiveKind } from '@/lib/tracking/derive';
import { MESSAGES } from '@/lib/tracking/messages';
import { cn } from '@/lib/utils';

import { LanguageSwitch } from './LanguageSwitch';
import { StatusCard } from './StatusCard';
import { StatusSheet } from './StatusSheet';
import { TrackingFooter } from './TrackingFooter';
import { TrackingMap } from './TrackingMap';
import { TrackingSkeleton } from './TrackingSkeleton';

interface TrackingScreenProps {
  token: string;
}

const NOW_REFRESH_MS = 15_000;
const DEVANAGARI_FONT =
  '[font-family:var(--font-devanagari),var(--font-inter),system-ui,sans-serif]';

export function TrackingScreen({ token }: TrackingScreenProps): React.JSX.Element {
  const { state, configError } = useTracking(token);
  const { locale, setLocale } = useTrackingLocale();
  const nowMs = useNow(NOW_REFRESH_MS);
  const messages = MESSAGES[locale];

  const topBar = (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 px-3 pt-[max(0.5rem,env(safe-area-inset-top))]">
      <div>
        {state.reconnecting && (
          <p
            role="status"
            className="pointer-events-auto mt-1 inline-flex min-h-9 items-center gap-2 rounded-full bg-track-warn-bg px-3 text-sm font-medium text-track-warn-ink shadow-md"
          >
            <WifiOff className="h-4 w-4" aria-hidden="true" />
            {messages.reconnecting}
          </p>
        )}
      </div>
      <LanguageSwitch locale={locale} label={messages.languageLabel} onChange={setLocale} />
    </div>
  );

  const data = state.data;
  let content: React.JSX.Element;
  let hasSheet = false;

  if (configError) {
    content = (
      <StatusCard
        tone="neutral"
        icon={Settings}
        title={messages.configTitle}
        body={messages.configBody}
      />
    );
  } else if (state.phase === 'invalid') {
    content = (
      <StatusCard
        tone="neutral"
        icon={Link2Off}
        title={messages.invalidTitle}
        body={messages.invalidBody}
      />
    );
  } else if (state.phase === 'ended') {
    content = (
      <StatusCard
        tone="neutral"
        icon={Hourglass}
        title={messages.endedTitle}
        body={messages.endedBody}
      />
    );
  } else if (state.phase === 'live' && data !== null && data.state === 'arrived') {
    content = (
      <StatusCard
        tone="ok"
        icon={CircleCheck}
        title={messages.arrivedTitle(data.name)}
        body={messages.arrivedBody}
      />
    );
  } else if (state.phase === 'live' && data !== null && data.position !== null) {
    const kind = deriveLiveKind(data, nowMs);
    hasSheet = true;
    content = (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="relative min-h-0 flex-1">
          <TrackingMap
            messages={messages}
            position={data.position}
            trail={data.trail}
            heading={data.heading}
            accuracyM={data.accuracyM}
            destination={data.destination}
            muted={kind !== 'active'}
          />
        </div>
        <StatusSheet
          messages={messages}
          locale={locale}
          data={data}
          kind={kind}
          position={data.position}
          nowMs={nowMs}
        />
      </div>
    );
  } else {
    content = <TrackingSkeleton label={messages.loading} />;
  }

  // Every state except loading and the live sheet (which has its own footer) gets a footer.
  const showFooter = !hasSheet && (configError || state.phase !== 'loading');

  return (
    <div
      lang={locale}
      className={cn(
        'track-theme relative flex h-dvh w-full flex-col overflow-hidden bg-track-bg text-track-ink',
        locale !== 'en' && DEVANAGARI_FONT,
      )}
    >
      {topBar}
      {content}
      {showFooter && (
        <div className="shrink-0 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <TrackingFooter messages={messages} />
        </div>
      )}
    </div>
  );
}
