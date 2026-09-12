'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'Is Surakshak free?',
    answer:
      'Yes. Surakshak is completely free to download and use. There are no in-app purchases, ' +
      'subscriptions, or ads.',
  },
  {
    question: 'Does it work without internet?',
    answer:
      "Most core features work offline. SMS alerts use your phone's SIM card and don't need " +
      'internet. Emergency contacts and legal information are cached locally. Location sharing ' +
      'and community features need internet.',
  },
  {
    question: 'How is my location shared?',
    answer:
      "Your location is shared with only the specific contacts you choose. It's never shared " +
      'publicly. You control when to start and stop sharing.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'All data is stored in Firebase (Google Cloud) with strict security rules. Only you can ' +
      'access your own data. Community posts are moderated and anonymous posting is supported.',
  },
  {
    question: 'Does SOS work on iPhone?',
    answer:
      "Yes, with one difference. On iPhone, Apple's OS policy requires one tap to send an SMS " +
      'and one tap to initiate a call — no app can bypass this. On Android, Surakshak sends SMS ' +
      'silently with no user interaction.',
  },
  {
    question: 'Which languages are supported?',
    answer:
      'English, Hindi (हिन्दी), and Marathi (मराठी). SMS alerts are sent in your chosen ' +
      'language.',
  },
  {
    question: 'What happens when I trigger SOS?',
    answer:
      'Surakshak starts a 5-second countdown (which you can cancel). After the countdown: SMS ' +
      'alerts with your location are sent to all your emergency contacts, and your live ' +
      'location starts sharing automatically.',
  },
  {
    question: 'Can I use it as a guest?',
    answer:
      'Yes — you can browse community posts, view the map, and read legal information without ' +
      'an account. SOS and location features require signing in with your phone number.',
  },
] as const;

export default function FAQ(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-center text-4xl font-bold text-ink">Common questions</h2>

      <Accordion.Root type="single" collapsible className="mt-12 space-y-3">
        {FAQ_ITEMS.map((item) => (
          <Accordion.Item
            key={item.question}
            value={item.question}
            className="overflow-hidden rounded-xl bg-white ring-1 ring-black/5"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-ink">
                {item.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-stone transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden px-5 text-sm text-stone data-[state=open]:animate-fade-up data-[state=open]:pb-4">
              {item.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
