import { TypeSocketIO } from '../../../server';

export function Main(_io: TypeSocketIO) {
  _io.on('connection', (socket) => {
    console.log('Client connected via WebSocket id: "%s"', socket.id);
  });
}
