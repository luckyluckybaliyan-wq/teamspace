import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { Task } from '../types';

interface Handlers {
  onCreated: (task: Task) => void;
  onUpdated: (task: Task) => void;
  onDeleted: (payload: { _id: string }) => void;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export function useProjectSocket(projectId: string | undefined, handlers: Handlers) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!projectId) return;

    const socket: Socket = io(SOCKET_URL, { auth: { token: localStorage.getItem('token') } });
    socket.on('connect', () => socket.emit('project:join', projectId));
    socket.on('task:created', (t: Task) => handlersRef.current.onCreated(t));
    socket.on('task:updated', (t: Task) => handlersRef.current.onUpdated(t));
    socket.on('task:deleted', (p: { _id: string }) => handlersRef.current.onDeleted(p));

    return () => {
      socket.emit('project:leave', projectId);
      socket.disconnect();
    };
  }, [projectId]);
}
