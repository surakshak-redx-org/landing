import { SITE } from '@/constants';

export default function About(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-red">
            Who built this
          </p>
          <h2 className="mt-3 text-4xl font-bold text-ink">
            Built by {SITE.clubName}, K.J. Somaiya
          </h2>

          <p className="mt-6 text-stone">
            Surakshak was built by students at {SITE.collegeName}, Mumbai as part of the{' '}
            {SITE.clubName} — a student-led tech community focused on building products that matter.
          </p>

          <p className="mt-4 text-stone">
            It started with a simple question: why don&apos;t the women in our lives have a better
            way to call for help when it matters most? Every feature in Surakshak exists to answer
            that question.
          </p>
        </div>

        <div className="glass rounded-3xl bg-near-black p-10 text-center">
          <span className="text-5xl" aria-hidden="true">
            🛡️
          </span>
          <p className="mt-4 text-2xl font-bold text-primary-red">Surakshak</p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
            <div>
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-xs text-stone-400">languages</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-xs text-stone-400">safety features</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">6</p>
              <p className="text-xs text-stone-400">emergency numbers</p>
            </div>
          </div>

          <p className="mt-8 font-devanagari text-2xl text-white">हर कदम, सुरक्षित</p>
        </div>
      </div>
    </div>
  );
}
