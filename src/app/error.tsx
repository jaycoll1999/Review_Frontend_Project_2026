'use client'; // Error boundaries must be Client Components

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Something went wrong!</h2>
      <p className="text-slate-500 font-medium max-w-md mb-8">
        We've automatically logged this issue and our team has been notified. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all active:scale-95"
      >
        Try Again
      </button>
    </div>
  );
}
