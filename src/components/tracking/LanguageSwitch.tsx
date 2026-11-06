import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/tracking/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitchProps {
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
}

export function LanguageSwitch({
  locale,
  label,
  onChange,
}: LanguageSwitchProps): React.JSX.Element {
  return (
    <div
      role="group"
      aria-label={label}
      className="pointer-events-auto flex rounded-full bg-track-surface p-0.5 shadow-md ring-1 ring-track-line"
    >
      {LOCALES.map((option) => {
        const selected = option === locale;
        return (
          <button
            key={option}
            type="button"
            lang={option}
            aria-pressed={selected}
            aria-label={LOCALE_LABELS[option].full}
            onClick={() => onChange(option)}
            className={cn(
              'min-h-11 min-w-11 rounded-full px-3 text-sm font-semibold transition-colors',
              selected
                ? 'bg-track-ink text-track-surface'
                : 'text-track-muted hover:text-track-ink',
            )}
          >
            {LOCALE_LABELS[option].short}
          </button>
        );
      })}
    </div>
  );
}
