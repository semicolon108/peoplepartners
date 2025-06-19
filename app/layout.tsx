// app/layout.tsx
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Optimized font configuration with better weight selection
const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
  preload: true, // Preload for better performance
});

// Enhanced metadata with structured data
export const metadata: Metadata = {
  title: {
    template: '%s | People Partners Lao',
    default: 'People Partners Lao - Your Expert HR Partner in Laos',
  },
  description: 'Compliant. Efficient. Reliable. We combine unmatched local expertise with international service standards to power your business growth in Laos.',
  keywords: ['HR services', 'Laos', 'human resources', 'business solutions', 'compliance'],
  authors: [{ name: 'People Partners Lao' }],
  creator: 'People Partners Lao',
  publisher: 'People Partners Lao',
  metadataBase: new URL('https://www.peoplepartners.la'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.peoplepartners.la',
    title: 'People Partners Lao - Your Expert HR Partner in Laos',
    description: 'Compliant. Efficient. Reliable. We combine unmatched local expertise with international service standards to power your business growth in Laos.',
    siteName: 'People Partners Lao',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'People Partners Lao - HR Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'People Partners Lao - Your Expert HR Partner in Laos',
    description: 'Compliant. Efficient. Reliable. We combine unmatched local expertise with international service standards.',
    images: ['/og-image.png'],
  },
  verification: {
    // Add your verification IDs when available
    // google: 'google-verification-id',
    // other: 'other-verification-id',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-brand-blue/10">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}