// app/not-found.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue-50 to-white">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-brand-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-slate-800 mb-4">Page Not Found</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-brand-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-blue-700 transition-colors"
          >
            Go Back Home
          </Link>
          
          <div className="text-sm text-slate-500">
            <p>Or try one of these popular pages:</p>
            <div className="mt-2 space-x-4">
              <Link href="/about" className="text-brand-blue-600 hover:underline">About Us</Link>
              <Link href="/services" className="text-brand-blue-600 hover:underline">Services</Link>
              <Link href="/contact" className="text-brand-blue-600 hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}