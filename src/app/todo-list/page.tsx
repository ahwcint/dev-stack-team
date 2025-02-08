'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TodoListPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('todo-list/dashboard');
  }, [router]);
}
