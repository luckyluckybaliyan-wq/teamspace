import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import { initSocket } from './sockets/socket';

async function start() {
  await connectDB();
  const server = http.createServer(app);
  initSocket(server);
  server.listen(env.port, () => console.log(`Server running on http://localhost:${env.port}`));
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
