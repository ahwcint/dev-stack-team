'use client';
import Toast from '@/components/toast/useToast';
import { Geist, Geist_Mono } from 'next/font/google';
import { PropsWithChildren } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function RootApp({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className="w-full h-full light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full`}
      >
        <main className="light text-foreground bg-background h-full w-full">
          {children}
        </main>
        <Toast.Toaster />
      </body>
    </html>
  );
}
