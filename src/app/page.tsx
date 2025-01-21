'use client';
import { useSocket } from '@/hooks/useSocket/useSocket';
import { useState } from 'react';

export default function Home() {
  const check = useState(true);
  useSocket(check[0]);
  return (
    <div>
      <button onClick={() => check[1](true)} className="block">
        connect
      </button>
      <button onClick={() => check[1](false)}>disconnect</button>
    </div>
  );
}
