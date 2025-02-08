'use client';
import Toast from '@/components/toast/useToast';
import { Kanit } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const kanitSans = Kanit({
  variable: '--font-kanit-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
      <body className={`${kanitSans.variable} antialiased h-full w-full`}>
        <main className={`h-full w-full`}>{children}</main>
      </body>
    </html>
  );
}
