'use client';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export function useSocket(enabled = false) {
  const { current: socketIO } = useRef<ReturnType<typeof io>>(
    io(process.env.SOCKET_LOCAL),
  );
  useEffect(() => {
    socketIO.on('connect', () => {
      console.log('moew', socketIO.connected);
    });

    return () => {
      if (socketIO) socketIO.disconnect();
    };
  }, [socketIO]);

  useEffect(() => {
    if (enabled) socketIO.connect();
    if (!enabled) socketIO.disconnect();
  }, [socketIO, enabled]);

  return socketIO;
}
