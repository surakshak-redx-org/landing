import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Surakshak — Har Kadam, Surakshit',
  description:
    "Women's safety app for India. Emergency SOS, live location, community support, " +
    'and legal rights — in English, Hindi, and Marathi. Free to download.',
  keywords: [
    'women safety app india',
    'surakshak',
    'SOS app india',
    'emergency alert app',
    'women helpline india',
    'safety app hindi',
    'suraksha app',
  ],
  openGraph: {
    title: 'Surakshak — Har Kadam, Surakshit',
    description: 'Emergency SOS, live location sharing, and community support for women in India.',
    url: 'https://surakshak.app',
    siteName: 'Surakshak',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surakshak — Har Kadam, Surakshit',
    description: "Women's safety app for India.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://surakshak.app' },
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Surakshak',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Android, iOS',
              description:
                "Women's safety app for India with SOS alerts, live location, " +
                'and community support in English, Hindi, and Marathi.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
              },
              creator: {
                '@type': 'Organization',
                name: 'REDX Club, K.J. Somaiya Institute of Technology',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
