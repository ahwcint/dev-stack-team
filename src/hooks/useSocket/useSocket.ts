'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export function useSocket(enabled = false) {
  const [{ current: socketIO }, setSocketIO] = useState<{
    current: ReturnType<typeof io> | null;
  }>({ current: null });
  useEffect(() => {
    socketIO?.on('connect', () => {
      console.log('moew', socketIO.connected);
    });

    return () => {
      if (socketIO) socketIO.disconnect();
    };
  }, [socketIO]);

  useEffect(() => {
    if (enabled) socketIO?.connect();
    if (!enabled) socketIO?.disconnect();
  }, [socketIO, enabled]);

  useEffect(() => {
    const IO = io(process.env.API_URL_PATH);
    setSocketIO((p) => {
      p.current = IO;
      return p;
    });
  }, []);

  return socketIO;
}
