'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'Is Surakshak free?',
    answer:
      'Surakshak is designed to be free to use. Check the current app listing for availability and any updated terms before downloading.',
  },
  {
    question: 'Does it work without internet?',
    answer:
      "Some information saved on your device may remain available offline. SMS may work without mobile data when a cellular network and the required SIM or service are available. Location sharing and community features may need an internet connection.",
  },
  {
    question: 'How is my location shared?',
    answer:
      'Location sharing is intended for the trusted contacts you select. Review the app permissions and sharing controls, and check that sharing has stopped when you no longer need it.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Surakshak uses Firebase services for data storage. How your information is protected depends on the app configuration, access rules, and the information you choose to share. Avoid sharing sensitive information unnecessarily.',
  },
  {
    question: 'Does SOS work on iPhone?',
    answer:
      'Some emergency actions work differently on iPhone and Android. iOS may require you to confirm an SMS or call in a system screen, while supported Android features may allow certain actions with fewer manual steps. Check the platform comparison to understand the current limitations.',
  },
  {
    question: 'Which languages are supported?',
    answer:
      'The landing page currently lists English, Hindi (हिन्दी), and Marathi (मराठी). Check the app itself to confirm which screens and alert messages are available in your chosen language.',
  },
  {
    question: 'What happens when I trigger SOS?',
    answer:
      'The intended flow includes a short countdown that you can cancel, followed by emergency alerts to your configured contacts. The exact actions depend on your device, permissions, connectivity, and the app version. An alert cannot guarantee that someone receives or responds to it.',
  },
  {
    question: 'Can I use it as a guest?',
    answer:
      'Some information may be accessible without signing in, while personal features can require an account. Check the current app experience for which features are available to guests.',
  },
] as const;

export default function FAQ(): React.JSX.Element {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#FBF9FF] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-[90%] max-w-3xl">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B527E]">
            A little clarity goes a long way
          </p>

          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#342442] sm:text-4xl lg:text-5xl"
          >
            Questions you might have.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#796B86] sm:text-base sm:leading-8">
            Understand how Surakshak works, what to expect, and what to check
            before relying on its safety features.
          </p>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, index) => (
            <Accordion.Item
              key={item.question}
              value={item.question}
              className="group overflow-hidden rounded-2xl border border-[#7954A5]/10 bg-white shadow-[0_3px_14px_rgba(52,36,66,0.025)] transition-all duration-300 data-[state=open]:border-[#7954A5]/25 data-[state=open]:shadow-[0_8px_24px_rgba(52,36,66,0.05)]"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7954A5] sm:px-6">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0E8FA] text-xs font-bold text-[#7954A5] transition-colors group-data-[state=open]:bg-[#F9E8F1] group-data-[state=open]:text-[#9B527E]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="flex-1 text-sm font-semibold leading-6 text-[#342442] sm:text-base">
                    {item.question}
                  </span>

                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#7954A5] transition-transform duration-300 group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="overflow-hidden data-[state=open]:animate-fade-up">
                <div className="px-5 pb-5 pl-[4.5rem] sm:px-6 sm:pb-6 sm:pl-[5rem]">
                  <p className="text-sm leading-7 text-[#796B86]">
                    {item.answer}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mt-8 rounded-2xl border border-[#C16B9B]/15 bg-[#F9E8F1] px-5 py-5 sm:px-6">
          <p className="text-sm font-bold text-[#342442]">
            One important thing to remember
          </p>

          <p className="mt-2 text-sm leading-7 text-[#796B86]">
            Surakshak is a tool to support safety planning and access to
            information, not a replacement for emergency services. Test its
            features on your device and contact local emergency services
            directly when immediate help is needed.
          </p>
        </div>
      </div>
    </section>
  );
}
