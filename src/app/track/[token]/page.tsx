import type { Metadata, Viewport } from 'next';

import { TrackingScreen } from '@/components/tracking/TrackingScreen';

// A static title: the token and coordinates must never reach document.title.
export const metadata: Metadata = {
  title: 'Live location',
  description: 'A live location shared with you through Surakshak.',
  // The root layout sets index: true and a canonical of "/"; override both for this route.
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: { title: 'Live location', siteName: 'Surakshak', type: 'website' },
  twitter: { card: 'summary', title: 'Live location' },
};

// viewport-fit=cover lets the sheet respect the safe-area insets on notched phones.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

interface TrackPageProps {
  params: Promise<{ token: string }>;
}

export default async function TrackPage({ params }: TrackPageProps): Promise<React.JSX.Element> {
  const { token } = await params;
  return <TrackingScreen token={token} />;
}
