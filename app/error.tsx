// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
          <h2 className="text-3xl font-semibold text-slate-800 mb-4">Something went wrong</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            We&apos;re sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors mr-4"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-block bg-slate-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left bg-slate-100 p-4 rounded-lg max-w-2xl mx-auto">
            <summary className="cursor-pointer font-semibold">Error Details (Development Only)</summary>
            <pre className="mt-2 text-sm text-slate-700 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}