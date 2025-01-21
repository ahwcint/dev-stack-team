import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketConfig } from './socket-io';
import { expressRoutesConfig } from './routes';

const _port = 3003;
const _app = express();
const _server = http.createServer(_app);
const _io = new Server(_server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Express Routes
_app.use(express.json()); // use express middleware
expressRoutesConfig(_app);

// Socket Io Actions
socketConfig(_io);

_server.listen(_port, () => {
  console.log('[SERVER] running on port: %s', _port);
});

export type TypeSocketIO = typeof _io;
export type TypeExpress = typeof _app;
