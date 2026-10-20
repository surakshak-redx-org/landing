const OFFLINE_ITEMS = [
  {
    icon: '📲',
    title: 'SMS via SIM',
    description:
      "SMS can work without mobile data when a compatible cellular network is available. Sending may still require an active SIM and service.",
    category: 'Mobile network',
    categoryStyle: 'bg-[#F9E8F1] text-[#9B527E]',
  },
  {
    icon: '📍',
    title: 'Cached Location',
    description:
      'A previously saved location may remain available on your device. Sharing or sending it still depends on the feature and connectivity available.',
    category: 'Device dependent',
    categoryStyle: 'bg-[#F0E8FA] text-[#7954A5]',
  },
  {
    icon: '⚖️',
    title: 'Laws & FAQs offline',
    description:
      'Legal information cached after it has been loaded can remain accessible without an internet connection.',
    category: 'Available if cached',
    categoryStyle: 'bg-[#F0E8FA] text-[#7954A5]',
  },
  {
    icon: '💾',
    title: 'Contacts cached',
    description:
      'Emergency contacts saved locally can remain accessible when the internet is unavailable.',
    category: 'Available if saved',
    categoryStyle: 'bg-[#F0E8FA] text-[#7954A5]',
  },
  {
    icon: '🗂️',
    title: 'SMS history',
    description:
      'Locally stored alert history can remain on your device without a cloud connection.',
    category: 'Local storage',
    categoryStyle: 'bg-[#F0E8FA] text-[#7954A5]',
  },
  {
    icon: '🔋',
    title: 'Low battery alert',
    description:
      'A low-battery warning depends on device support, permissions, and whether the relevant monitoring feature is running.',
    category: 'Device dependent',
    categoryStyle: 'bg-[#F9E8F1] text-[#9B527E]',
  },
] as const;

export default function OfflineCapabilities(): React.JSX.Element {
  return (
    <section
      id="offline-capabilities"
      aria-labelledby="offline-heading"
      className="bg-[#EDE3F8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[90%] max-w-6xl">
        <div className="grid items-end gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B527E]">
              Made for the real world
            </p>

            <h2
              id="offline-heading"
              className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl lg:text-5xl"
            >
              When the internet drops, what stays within reach?
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8 md:pb-1">
            Not every safety tool depends on the same connection. Some
            information may be available on your phone, while sending an alert
            can require a mobile network.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {OFFLINE_ITEMS.map((item, index) => (
            <article
              key={item.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#7954A5]/10 bg-[#FBF9FF] p-5 shadow-[0_3px_14px_rgba(52,36,66,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#7954A5]/25 hover:bg-white hover:shadow-[0_12px_30px_rgba(52,36,66,0.07)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8E4F0] text-2xl">
                  <span aria-hidden="true">{item.icon}</span>
                </span>

                <span className="text-xs font-semibold tracking-wider text-[#B7A8C5]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#342442]">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-[#796B86]">
                {item.description}
              </p>

              <div className="mt-5 border-t border-[#F0EAF5] pt-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${item.categoryStyle}`}
                >
                  {item.category}
                </span>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#7954A5] to-[#C16B9B] transition-transform duration-300 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#7954A5]/10 bg-white/70 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <span className="text-xl" aria-hidden="true">
              ♡
            </span>

            <div>
              <h3 className="text-sm font-bold text-[#342442]">
                A little preparation goes a long way
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#796B86]">
                Load important information in advance, save your trusted
                contacts, and familiarise yourself with the features on your
                device. Offline access does not guarantee that an emergency
                message can be delivered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
