import express, { Response, Request } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { socketConfig } from '../socket-io';
import { expressRoutesConfig } from '../routes';
import cookieParser from 'cookie-parser';
import customMiddleware from './middleware';
import { instrument } from '@socket.io/admin-ui';
import logger from '../utils/pino';

export const unProtectedPath = [
  '/user/sign-in',
  '/user/sign-up',
  '/user',
  '/auth/verify-session',
  '/auth/sign-out',
];

const _port = 3003;
const originPath = process.env.ORIGIN_PATH || 'http://localhost:3000';
const _app = express();
const _server = http.createServer(_app);
const _io = new Server(_server, {
  cors: {
    origin: [originPath, 'https://admin.socket.io'],
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

// Express Routes
_app.use(
  cors({
    origin: originPath,
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
_app.use(express.json()); // use express middleware
_app.use(cookieParser());
_app.use((req, res, next) => {
  const reCreatePath = `/${[req.path.split('/')[1], req.path.split('/')[2]]
    .filter(Boolean)
    .join('/')}`;
  if (!unProtectedPath.includes(reCreatePath))
    return customMiddleware(req, res, next);
  next();
});
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

const serverlessHandler = async (req: Request, res: Response) => {
  return _app(req, res);
};

export default serverlessHandler;

export type TypeSocketIO = typeof _io;
export type TypeExpress = typeof _app;
