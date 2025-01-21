import type { Server } from 'socket.io';
import SocketController from '../utils/functions.controller';
import { Main } from './actions/main';

export const socketConfig = <T extends Server>(_io: T) =>
  SocketController(_io, [Main]);
