import { EMERGENCY_NUMBERS } from '@/constants';

export default function EmergencyStrip(): React.JSX.Element {
  return (
    <section id="emergency" className="bg-near-black py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-stone-500">
          Emergency Numbers — Always Free
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {EMERGENCY_NUMBERS.map((item) => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center transition-colors hover:border-primary-red"
            >
              <span className="text-2xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-2xl font-bold text-white">{item.number}</span>
              <span className="text-xs text-stone-400">{item.label}</span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-stone-500">
          These numbers work even without internet or balance.
        </p>
      </div>
    </section>
  );
}
