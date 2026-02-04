// app/layout.tsx
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"
import { Noto_Sans_Lao_Looped, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next"

// Google Sans alternative (Geometric Sans)
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

// Noto Sans Lao Loop for Lao text
const notoSansLaoLoop = Noto_Sans_Lao_Looped({
  subsets: ['lao'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-noto-lao',
  adjustFontFallback: false, // Essential for Lao Loop script sometimes
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
    title: 'People Partners Lao - Your Expert HR Partner in Laos',
    description: 'Compliant. Efficient. Reliable. We combine unmatched local expertise with international service standards to power your business growth in Laos.',
    url: 'https://peoplepartners.la',
    siteName: 'People Partners Lao',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'People Partners Lao - Your Expert HR Partner in Laos',
    description: 'Compliant. Efficient. Reliable. We combine unmatched local expertise with international service standards to power your business growth in Laos.',
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
    <html lang="en" className={`${outfit.variable} ${notoSansLaoLoop.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-brand-blue/10">
        <Header />
        <main className="min-h-screen">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}