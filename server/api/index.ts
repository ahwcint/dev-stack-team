import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { socketConfig } from '../socket-io';
import { expressRoutesConfig } from '../routes';

const _port = 3003;
const _app = express();
const _server = http.createServer(_app);
const _io = new Server(_server, {
  cors: {
    origin: process.env.ORIGIN_PATH,
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  },
});

// Express Routes
_app.use(cors({ origin: process.env.ORIGIN_PATH, credentials: true }));
_app.use(express.json()); // use express middleware
expressRoutesConfig(_app);

// Socket Io Actions
socketConfig(_io);

_server.listen(_port, () => {
  console.log('[SERVER] running on port: %s', _port);
});

export type TypeSocketIO = typeof _io;
export type TypeExpress = typeof _app;
