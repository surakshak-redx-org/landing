import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Report a Problem',
  description: 'Report a technical issue, incorrect information, or a broken feature in Surakshak.',
  alternates: { canonical: '/report-problem' },
  openGraph: {
    title: 'Report a Problem — Surakshak',
    description:
      'Report a technical issue, incorrect information, or a broken feature in Surakshak.',
    url: '/report-problem',
  },
};

export default function ReportProblemPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-near-black px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/contact"
          className="inline-flex items-center text-sm font-semibold text-stone-400 transition-colors hover:text-white"
        >
          ← Back to Contact / Support
        </Link>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-red">Support</p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Report a Problem</h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-400">
            Found a technical issue, incorrect information, or a broken feature? Let the Surakshak
            team know so it can be reviewed.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">What to report</h2>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-400">
            <li>• Technical errors or broken features</li>
            <li>• Incorrect or outdated safety information</li>
            <li>• Accessibility or usability issues</li>
            <li>• Broken links or unexpected website behaviour</li>
          </ul>

          <p className="mt-6 text-sm leading-6 text-stone-400">
            Please include a short description of the problem, the page where it occurred, and any
            relevant screenshots or details.
          </p>

          <a
            href="mailto:support@surakshak.app?subject=Surakshak%20Problem%20Report"
            className="mt-6 inline-flex rounded-full bg-primary-red px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Email Support
          </a>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm font-semibold text-stone-400 hover:text-white">
            ← Back to Surakshak
          </Link>
        </div>
      </div>
    </main>
  );
}
