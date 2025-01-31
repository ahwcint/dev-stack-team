'use client';
import Toast from '@/components/toast/useToast';
import { Geist, Geist_Mono } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const queryClient = new QueryClient();

const defaultTheme = 'light';

export function AppClient({ children }: Readonly<PropsWithChildren>) {
  return (
    <App>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toast.Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </App>
  );
}

function App({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className={`w-full h-full ${defaultTheme}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full`}
      >
        <main className={`h-full w-full`}>{children}</main>
      </body>
    </html>
  );
}
