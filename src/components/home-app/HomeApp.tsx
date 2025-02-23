'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function HomeApp() {
  const router = useRouter();
  useEffect(() => {
    router.replace('todo-list/dashboard');
  }, [router]);
  return null;
}
