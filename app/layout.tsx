// app/layout.tsx
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Use next/font for optimized font loading
const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap', // This is a good default for performance
  variable: '--font-noto-sans', // Define it as a CSS variable (best practice)
});

export const metadata: Metadata = {
  title: 'People Partners Lao - Your Expert HR Partner in Laos',
  description: 'Compliant. Efficient. Reliable. We combine unmatched local expertise with international service standards to power your business growth in Laos.',
};

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