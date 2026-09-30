import Link from 'next/link';

export default function ContactPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-near-black px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-stone-400 transition-colors hover:text-white"
        >
          ← Back to Surakshak
        </Link>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-red">
            Support
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Contact / Support
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-400">
            Need help with Surakshak, want to report an issue, or have feedback?
            We&apos;re here to help.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">General Support</h2>

            <p className="mt-2 text-sm leading-6 text-stone-400">
              For questions about the Surakshak platform, features, accessibility,
              or general assistance.
            </p>

            <a
              href="mailto:support@surakshak.app"
              className="mt-5 inline-block font-semibold text-primary-red hover:underline"
            >
              support@surakshak.app
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Report a Problem</h2>

            <p className="mt-2 text-sm leading-6 text-stone-400">
              Found a technical issue, incorrect information, or a broken feature?
              Please report it so the team can investigate.
            </p>

            <Link
              href="/report-problem"
              className="mt-5 inline-block font-semibold text-primary-red hover:underline"
            >
              Report a Problem →
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Emergency</h2>

          <p className="mt-2 text-sm leading-6 text-stone-400">
            Surakshak is a safety-support platform. It does not replace police,
            ambulance, fire, or other emergency services.
          </p>

          <p className="mt-4 text-sm font-semibold text-white">
            In an immediate emergency, contact the appropriate emergency service
            directly.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:112"
              className="rounded-full bg-primary-red px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Call 112
            </a>

            <Link
              href="/emergency"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Emergency Information
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-stone-500">
            Surakshak · REDX Club · K.J. Somaiya Institute of Technology
          </p>
        </div>
      </div>
    </main>
  );
}