// app/layout.tsx
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  // Define a template for page titles
  title: {
    template: '%s | People Partners Lao',
    default: 'People Partners Lao - Your Expert HR Partner in Laos',
  },
  description: 'Compliant. Efficient. Reliable. We combine unmatched local expertise with international service standards to power your business growth in Laos.',
  // Add other global metadata
  metadataBase: new URL('https://www.peoplepartnerslao.la'), 
  openGraph: {
    title: 'People Partners Lao',
    description: 'Your Expert HR Partner in Laos',
    url: 'https://www.peoplepartnerslao.la',
    siteName: 'People Partners Lao',
    // Provide a URL for your main social sharing image
    images: [
      {
        url: '/og-image.png', // Place this image in your /public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
// Use next/font for optimized font loading
const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap', // This is a good default for performance
  variable: '--font-noto-sans', // Define it as a CSS variable (best practice)
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSans.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}