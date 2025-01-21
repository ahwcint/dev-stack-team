import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { HeroUIProvider } from '@heroui/react';
import './globals.css';
import { PropsWithChildren } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'I DO LIST',
  description: 'for dev that have things to do',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <RootApp>
      <HeroUIProvider>{children}</HeroUIProvider>
    </RootApp>
  );
}

function RootApp({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className="w-full h-full dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="dark text-foreground bg-background">{children}</main>
      </body>
    </html>
  );
}
