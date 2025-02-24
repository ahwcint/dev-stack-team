'use client';
import { FallbackProps } from 'react-error-boundary';
export function ErrorPageFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  console.error('error =>', error);
  return (
    <>
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>RESET ERROR</button>
      </div>
    </>
  );
}
