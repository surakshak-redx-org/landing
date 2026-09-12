const LANGUAGE_CARDS = [
  {
    flag: '🇬🇧',
    native: 'English',
    supportLabel: 'Full support',
    englishName: 'English',
    sample: 'SOS alert sent to your emergency contacts.',
    devanagari: false,
  },
  {
    flag: '🇮🇳',
    native: 'हिन्दी',
    supportLabel: 'पूर्ण समर्थन',
    englishName: 'Hindi',
    sample: 'आपका एसओएस अलर्ट भेज दिया गया है।',
    devanagari: true,
  },
  {
    flag: '🇮🇳',
    native: 'मराठी',
    supportLabel: 'पूर्ण आधार',
    englishName: 'Marathi',
    sample: 'तुमचा एसओएस अलर्ट पाठवला गेला आहे.',
    devanagari: true,
  },
] as const;

export default function Languages(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-4xl font-bold text-ink">Surakshak speaks your language.</h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {LANGUAGE_CARDS.map((lang) => (
          <div
            key={lang.englishName}
            className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5"
          >
            <span className="text-4xl" aria-hidden="true">
              {lang.flag}
            </span>
            <p
              className={`mt-3 text-2xl font-bold text-ink ${
                lang.devanagari ? 'font-devanagari' : ''
              }`}
            >
              {lang.native}
            </p>
            <p className={`mt-1 text-sm text-stone ${lang.devanagari ? 'font-devanagari' : ''}`}>
              {lang.supportLabel}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary-red">
              {lang.englishName}
            </p>
            <p
              className={`mt-6 rounded-xl bg-off-white p-4 text-sm text-stone ${
                lang.devanagari ? 'font-devanagari' : ''
              }`}
            >
              {lang.sample}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-stone">
        SMS alerts are sent in YOUR chosen language.
      </p>

      <div className="mx-auto mt-6 max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-primary-red">
        Emergency numbers (112, 100, 1091) never change — always digits.
      </div>
    </div>
  );
}
