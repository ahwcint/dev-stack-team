import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { socketConfig } from '../socket-io';
import { expressRoutesConfig } from '../routes';
import cookieParser from 'cookie-parser';
import customMiddleware from './middleware';
import { instrument } from '@socket.io/admin-ui';
import logger from '../utils/pino';

export const unProtectedPath = ['/user/sign-in', '/user/sign-up', '/user'];

const _port = 3003;
const _app = express();
const _server = http.createServer(_app);
const _io = new Server(_server, {
  cors: {
    origin: [`${process.env.ORIGIN_PATH}`, 'https://admin.socket.io'],
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

// Express Routes
_app.use(cookieParser());
_app.use(
  cors({
    origin: process.env.ORIGIN_PATH,
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
_app.use((req, res, next) => {
  if (
    !unProtectedPath.includes(req.path) &&
    !req.path.startsWith('/auth/verify-session')
  )
    customMiddleware(req, res, next);
  next();
});
_app.use(express.json()); // use express middleware
_app.options('*', cors());
expressRoutesConfig(_app);

// Socket Admin
instrument(_io, {
  auth: false,
  namespaceName: '/',
  mode: 'development',
});

// Socket Io Actions
socketConfig(_io);

_server.listen(_port, () => {
  logger.info('[SERVER] running on port: %s', _port);
  logger.info(
    '[SERVER] connect socket admin ui with this link %s',
    'https://admin.socket.io',
  );
});

export type TypeSocketIO = typeof _io;
export type TypeExpress = typeof _app;
