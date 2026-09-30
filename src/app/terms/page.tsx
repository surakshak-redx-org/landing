import Link from 'next/link';

export default function TermsPage(): React.JSX.Element {
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
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Terms &amp; Conditions
          </h1>

          <p className="mt-5 text-sm text-stone-500">
            Last updated: October 1, 2026
          </p>
        </div>

        <div className="mt-10 space-y-8 text-sm leading-7 text-stone-400">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. About Surakshak
            </h2>
            <p className="mt-3">
              Surakshak is a women&apos;s safety-support platform developed as
              a technology project. It provides safety-related information and
              features intended to support users in everyday safety situations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Emergency Services
            </h2>
            <p className="mt-3">
              Surakshak does not replace police, ambulance, fire services, or
              other official emergency services. In an immediate emergency,
              users should contact the appropriate official emergency service
              directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Use of Information
            </h2>
            <p className="mt-3">
              Safety information provided through Surakshak is intended for
              general informational purposes. Users should verify important
              information with appropriate official sources when necessary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. User Responsibility
            </h2>
            <p className="mt-3">
              Users are responsible for how they use the information and
              features provided by the platform. Users should exercise their
              own judgment and contact appropriate authorities when required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Availability
            </h2>
            <p className="mt-3">
              We aim to keep the platform available and information useful, but
              we cannot guarantee uninterrupted availability or that every
              feature will always operate without errors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. External Links
            </h2>
            <p className="mt-3">
              Surakshak may provide links to external websites or services.
              These websites are operated independently, and their own terms
              and policies may apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Changes to These Terms
            </h2>
            <p className="mt-3">
              These terms may be updated as the Surakshak platform develops.
              Updated terms will be published on this page with a revised
              update date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Contact
            </h2>
            <p className="mt-3">
              For questions about these terms or the Surakshak platform, please
              visit our Contact / Support page.
            </p>

            <Link
              href="/contact"
              className="mt-3 inline-block font-semibold text-primary-red hover:underline"
            >
              Contact / Support →
            </Link>
          </section>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <Link
            href="/"
            className="text-sm font-semibold text-stone-400 hover:text-white"
          >
            ← Back to Surakshak
          </Link>
        </div>
      </div>
    </main>
  );
}