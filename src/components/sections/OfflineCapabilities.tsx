const OFFLINE_ITEMS = [
  {
    icon: '📲',
    title: 'SMS via SIM',
    description: "Alerts use your phone's SIM card, not the internet.",
  },
  {
    icon: '📍',
    title: 'Cached Location',
    description: 'Your last location is saved locally and sent even offline.',
  },
  {
    icon: '⚖️',
    title: 'Laws & FAQs offline',
    description: 'Legal information cached on your device after first load.',
  },
  {
    icon: '💾',
    title: 'Contacts cached',
    description: 'Emergency contacts saved locally — always available.',
  },
  {
    icon: '🗂️',
    title: 'SMS history',
    description: 'Alert history stored on-device — no cloud needed.',
  },
  {
    icon: '🔋',
    title: 'Low battery alert',
    description: 'Triggered at 20% — before the phone dies.',
  },
] as const;

export default function OfflineCapabilities(): React.JSX.Element {
  return (
    <div className="bg-near-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold text-white">
          Works when the internet doesn&apos;t.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {OFFLINE_ITEMS.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="text-3xl" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-stone-400">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-stone-500">
          Built for India — where connectivity isn&apos;t always guaranteed.
        </p>
      </div>
    </div>
  );
}
