import type { Metadata } from 'next';
import { HeroUIProvider } from '@heroui/react';
import './globals.css';
import { PropsWithChildren } from 'react';
import { RootApp } from '../components/root-app/RootApp';

export const metadata: Metadata = {
  title: 'DevStack',
  description: 'for dev that have things to do',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <RootApp>
      <HeroUIProvider className="w-full h-full">{children}</HeroUIProvider>
    </RootApp>
  );
}
