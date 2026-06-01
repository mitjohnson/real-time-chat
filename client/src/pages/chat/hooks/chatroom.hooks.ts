import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client';
import { useAuthStore } from '@store/auth.store';
import { useToastStore } from '@store/toast.store';

export function useSocket(url: string) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);
  const { token } = useAuthStore.getState();
  const { add } = useToastStore.getState();

  useEffect(() => {
    const socket = io(url, { auth: { token } });
    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('error', (err) => add({ type: 'error', message: `Socket error: ${err.message || err}` }));
    
    return () => void socket.close();
  }, [])
  
  const on = useCallback((event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback);
    return () => void socketRef.current?.off(event, callback);
  }, [])

  const emit = useCallback((event: string, ...args: any[]) => {
    socketRef.current?.emit(event, ...args);
    return () => void socketRef.current?.off(event);
  }, [])

  return { isConnected, on, emit };
};
