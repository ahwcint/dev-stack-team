import { NavigationBar } from '@/components/navigation-bar/NavigationBar';
import { Card } from '@heroui/react';
import { PropsWithChildren } from 'react';

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex size-full p-3 gap-3">
      <NavigationBar />
      <Card className="flex-1">{children}</Card>
    </div>
  );
}
