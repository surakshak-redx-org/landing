'use client';

import {
  Battery,
  BatteryCharging,
  BatteryLow,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Flag,
  Gauge,
  Phone,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import { useId, useState } from 'react';

import {
  batteryPercent,
  googleMapsLink,
  isBatteryLow,
  speedToShow,
  type LiveKind,
} from '@/lib/tracking/derive';
import { formatClock, formatRelative, type Locale } from '@/lib/tracking/i18n';
import type { Messages } from '@/lib/tracking/messages';
import type { TrackingData, TrackingPosition } from '@/lib/tracking/types';
import { cn } from '@/lib/utils';

import { TrackingFooter } from './TrackingFooter';

interface StatusSheetProps {
  messages: Messages;
  locale: Locale;
  data: TrackingData;
  kind: LiveKind;
  position: TrackingPosition;
  nowMs: number;
}

interface ChipProps {
  icon: LucideIcon;
  text: string;
  tone?: 'default' | 'danger';
}

function Chip({ icon: Icon, text, tone = 'default' }: ChipProps): React.JSX.Element {
  return (
    <li
      className={cn(
        'inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 py-1 text-sm ring-1',
        tone === 'danger'
          ? 'bg-track-danger-bg text-track-danger-ink ring-track-danger-ink/30'
          : 'bg-track-bg text-track-ink ring-track-line',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {text}
    </li>
  );
}

function announcementFor(
  messages: Messages,
  locale: Locale,
  data: TrackingData,
  kind: LiveKind,
  position: TrackingPosition,
): string {
  if (kind === 'lost_contact') {
    return messages.lostContactTitle(data.name, formatClock(position.at, locale));
  }
  if (kind === 'stale') return messages.staleAnnouncement;
  return messages.sharing(data.name);
}

export function StatusSheet({
  messages,
  locale,
  data,
  kind,
  position,
  nowMs,
}: StatusSheetProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  const headline =
    kind === 'lost_contact'
      ? messages.lostContactTitle(data.name, formatClock(position.at, locale))
      : messages.sharing(data.name);
  const relative = formatRelative(position.at, nowMs, locale);
  const speed = speedToShow(data.speedMps);

  return (
    <section className="max-h-[60dvh] shrink-0 overflow-y-auto rounded-t-2xl bg-track-surface px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] ring-1 ring-track-line">
      {/* Announces status changes (active, stale, lost contact) without chattering every tick. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcementFor(messages, locale, data, kind, position)}
      </p>

      <div className="flex items-start justify-between gap-2">
        <h1
          className={cn(
            'pt-2 text-base font-semibold leading-snug',
            kind === 'lost_contact' ? 'text-track-danger-ink' : 'text-track-ink',
          )}
        >
          {headline}
        </h1>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={detailsId}
          aria-label={expanded ? messages.hideDetails : messages.showDetails}
          onClick={() => setExpanded((value) => !value)}
          className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-track-muted hover:bg-track-bg"
        >
          {expanded ? (
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {kind === 'lost_contact' && (
        <div className="mt-2 rounded-xl bg-track-danger-bg p-3 text-track-danger-ink">
          <p className="flex items-start gap-2 text-sm leading-relaxed">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {messages.lostContactAdvice}
          </p>
          <a
            href="tel:112"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-red px-5 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {messages.call112}
          </a>
        </div>
      )}

      {kind === 'stale' && (
        <p className="mt-2 flex items-center gap-2 rounded-xl bg-track-warn-bg px-3 py-2 text-sm font-medium text-track-warn-ink">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          {messages.lastUpdated(relative)}
        </p>
      )}

      <ul className="mt-3 flex flex-wrap gap-2">
        {kind === 'active' && <Chip icon={Clock} text={messages.updated(relative)} />}
        {data.eta !== null && (
          <Chip
            icon={Flag}
            text={messages.eta(Math.round(data.eta.minutes), data.destination?.name ?? null)}
          />
        )}
        {data.battery !== null && (
          <Chip
            icon={
              data.battery.charging
                ? BatteryCharging
                : isBatteryLow(data.battery.level)
                  ? BatteryLow
                  : Battery
            }
            text={messages.battery(batteryPercent(data.battery.level), data.battery.charging)}
            tone={isBatteryLow(data.battery.level) ? 'danger' : 'default'}
          />
        )}
        {speed !== null && kind === 'active' && <Chip icon={Gauge} text={messages.speed(speed)} />}
      </ul>

      <div id={detailsId} hidden={!expanded} className="mt-3 space-y-3 text-sm">
        <dl className="space-y-2">
          <div>
            <dt className="text-xs text-track-muted">
              {kind === 'lost_contact' ? messages.lastKnownPosition : messages.currentPosition}
            </dt>
            <dd className="font-medium tabular-nums text-track-ink">
              {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
              {data.accuracyM !== null && (
                <span className="block text-xs font-normal text-track-muted">
                  {messages.accuracy(Math.round(data.accuracyM))}
                </span>
              )}
            </dd>
          </div>
          {data.destination !== null && (
            <div>
              <dt className="text-xs text-track-muted">{messages.headingTo}</dt>
              <dd className="font-medium text-track-ink">{data.destination.name}</dd>
            </div>
          )}
        </dl>
        <p className="text-track-muted">
          {messages.sharingSince(formatClock(data.startedAt, locale))}
          {' · '}
          {messages.sharingEndsBy(formatClock(data.expiresAt, locale))}
        </p>
        <a
          href={googleMapsLink(position)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-track-line px-4 font-semibold text-track-ink"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {messages.openInMaps}
        </a>
      </div>

      <TrackingFooter messages={messages} />
    </section>
  );
}
