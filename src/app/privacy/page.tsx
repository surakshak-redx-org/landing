import Link from 'next/link';

export default function PrivacyPage(): React.JSX.Element {
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
            Privacy Policy
          </h1>

          <p className="mt-5 text-sm text-stone-500">
            Last updated: October 1, 2026
          </p>
        </div>

        <div className="mt-10 space-y-8 text-sm leading-7 text-stone-400">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Introduction
            </h2>
            <p className="mt-3">
              Surakshak is a women&apos;s safety-support technology project.
              This Privacy Policy explains, at a general level, how information
              may be handled when users interact with the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Information We May Receive
            </h2>
            <p className="mt-3">
              Depending on the features used, the platform may process
              information that a user voluntarily provides or information
              required for a feature to function. Users should avoid sharing
              unnecessary sensitive or personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Location Information
            </h2>
            <p className="mt-3">
              Features involving live location or journey safety may require
              location access. Location permissions are controlled through the
              user&apos;s device or browser. Users can choose whether to grant
              such permissions where supported.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. How Information May Be Used
            </h2>
            <p className="mt-3">
              Information may be used to provide requested features, improve
              the platform, investigate technical problems, and respond to
              support requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Information Sharing
            </h2>
            <p className="mt-3">
              We do not intend to sell personal information. Information should
              only be shared with third parties when required to provide a
              requested service, operate a feature, comply with applicable
              requirements, or protect users and the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. External Services
            </h2>
            <p className="mt-3">
              Surakshak may use or link to external services. Those services
              have their own privacy practices and policies, which users should
              review before providing information to them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Data Security
            </h2>
            <p className="mt-3">
              Reasonable measures may be used to protect information handled by
              the platform. However, no internet-based system can guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Children&apos;s Privacy
            </h2>
            <p className="mt-3">
              Users should not provide personal information belonging to
              children through the platform unless appropriate permission and
              legal requirements are satisfied.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Changes to This Policy
            </h2>
            <p className="mt-3">
              This Privacy Policy may be updated as the Surakshak project
              develops. Any updated version will be published on this page with
              a revised update date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Contact
            </h2>
            <p className="mt-3">
              If you have questions about privacy or the handling of information
              on Surakshak, please visit our Contact / Support page.
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
