import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emergency Help',
  description:
    'Indian emergency numbers and what to do in an immediate emergency. Surakshak does not replace emergency services.',
  alternates: { canonical: '/emergency' },
  openGraph: {
    title: 'Emergency Help — Surakshak',
    description:
      'Indian emergency numbers and what to do in an immediate emergency. Surakshak does not replace emergency services.',
    url: '/emergency',
  },
};

export default function EmergencyPage(): React.JSX.Element {
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
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-red">
            Emergency Information
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Emergency Help</h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-400">
            If you are facing an immediate threat or emergency, contact the appropriate emergency
            service directly.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Important Disclaimer</h2>

          <p className="mt-3 text-sm leading-6 text-stone-400">
            Surakshak is a safety-support platform. It does not replace police, ambulance, fire
            services, or other official emergency services.
          </p>

          <p className="mt-4 text-sm font-semibold leading-6 text-white">
            In an immediate emergency, call the appropriate emergency service directly.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="tel:112"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
          >
            <p className="text-2xl font-bold text-primary-red">112</p>
            <p className="mt-1 font-semibold">National Emergency</p>
            <p className="mt-2 text-sm text-stone-400">For immediate emergency assistance.</p>
          </a>

          <a
            href="tel:100"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
          >
            <p className="text-2xl font-bold text-primary-red">100</p>
            <p className="mt-1 font-semibold">Police</p>
            <p className="mt-2 text-sm text-stone-400">For police assistance.</p>
          </a>

          <a
            href="tel:108"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
          >
            <p className="text-2xl font-bold text-primary-red">108</p>
            <p className="mt-1 font-semibold">Ambulance</p>
            <p className="mt-2 text-sm text-stone-400">For medical emergencies.</p>
          </a>

          <a
            href="tel:1091"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
          >
            <p className="text-2xl font-bold text-primary-red">1091</p>
            <p className="mt-1 font-semibold">Women Helpline</p>
            <p className="mt-2 text-sm text-stone-400">Women&apos;s helpline service.</p>
          </a>

          <a
            href="tel:181"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
          >
            <p className="text-2xl font-bold text-primary-red">181</p>
            <p className="mt-1 font-semibold">Women Helpline</p>
            <p className="mt-2 text-sm text-stone-400">Women&apos;s support helpline.</p>
          </a>

          <a
            href="tel:1098"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
          >
            <p className="text-2xl font-bold text-primary-red">1098</p>
            <p className="mt-1 font-semibold">Child Helpline</p>
            <p className="mt-2 text-sm text-stone-400">Assistance for children in need.</p>
          </a>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <Link href="/" className="text-sm font-semibold text-stone-400 hover:text-white">
            ← Back to Surakshak
          </Link>
        </div>
      </div>
    </main>
  );
}
