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
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
      <path d="M6 8v8a1 1 0 0 0 1 1h1v3a1.5 1.5 0 0 0 3 0v-3h2v3a1.5 1.5 0 0 0 3 0v-3h1a1 1 0 0 0 1-1V8H6Z" />
      <path d="M6.5 4.5 5 2.7a.5.5 0 1 1 .8-.6l1.6 1.9A6.9 6.9 0 0 1 12 3c1.4 0 2.7.4 3.7 1l1.6-1.9a.5.5 0 1 1 .8.6l-1.5 1.8A6 6 0 0 1 19 9H5a6 6 0 0 1 1.5-4.5ZM9 6.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm6 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
      <rect x="2" y="8" width="2" height="7" rx="1" />
      <rect x="20" y="8" width="2" height="7" rx="1" />
    </svg>
  );
}

function AppleGlyph(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.3c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.4-.9-2.4-3.9ZM14.6 5.9c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z" />
    </svg>
  );
}

export default function PlatformComparison(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-4xl font-bold text-ink">How it works on your device</h2>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-forest-green bg-white p-8">
          <div className="flex items-center gap-3 text-forest-green">
            <AndroidIcon />
            <div>
              <h3 className="text-xl font-bold text-ink">Android</h3>
              <p className="text-sm text-forest-green">Full power</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {ANDROID_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-stone">
                <span className="text-forest-green">✅</span>
                {feature}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs font-medium text-stone-500">
            95%+ of Indian smartphones run Android
          </p>
        </div>

        <div className="rounded-2xl border-2 border-stone-300 bg-white p-8">
          <div className="flex items-center gap-3 text-stone">
            <AppleGlyph />
            <div>
              <h3 className="text-xl font-bold text-ink">iPhone</h3>
              <p className="text-sm text-stone">One tap needed</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {IOS_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-stone">
                <span className="text-forest-green">✅</span>
                {feature}
              </li>
            ))}
            <li className="flex items-start gap-2 text-sm text-stone">
              <span>ℹ️</span>
              Apple restricts silent SMS and direct calls for all apps
            </li>
          </ul>

          <p className="mt-6 text-xs font-medium text-stone-500">
            Apple OS policy prevents fully silent SMS and direct calls. One tap is the minimum any
            iOS app can achieve.
          </p>
        </div>
      </div>
    </div>
  );
}
