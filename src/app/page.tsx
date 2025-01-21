'use client';
import { useSocket } from '@/hooks/useSocket/useSocket';
import { Divider, Button, Card, CardBody, CardHeader } from '@heroui/react';

export default function Home() {
  useSocket(true);
  return (
    <div>
      <Button>TEST</Button>
      <Card>
        <CardHeader>Title</CardHeader>
        <Divider />
        <CardBody>This is content</CardBody>
      </Card>
    </div>
  );
}
