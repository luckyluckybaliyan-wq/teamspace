import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { env } from '../config/env';
import { requireMember } from '../services/access';
import { verifyToken } from '../utils/token';

let io: IOServer | undefined;

export function initSocket(server: HttpServer): IOServer {
  io = new IOServer(server, { cors: { origin: env.clientUrl } });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token as string;
      socket.data.userId = verifyToken(token).id;
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('project:join', async (projectId: string) => {
      try {
        await requireMember(projectId, socket.data.userId);
        socket.join(projectId);
      } catch {
        /* ignore users who are not members */
      }
    });
    socket.on('project:leave', (projectId: string) => socket.leave(projectId));
  });

  return io;
}

export function emitToProject(projectId: string, event: string, payload: unknown): void {
  io?.to(projectId).emit(event, payload);
}
