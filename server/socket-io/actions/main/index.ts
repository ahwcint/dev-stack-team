import { TypeSocketIO } from '../../../server';

export function Main(_io: TypeSocketIO) {
  _io.on('connection', (socket) => {
    console.log('Client connected via WebSocket id: "%s"', socket.id);

    socket.on('message', (msg) => {
      console.log('receive message: %s', msg);
    });

    socket.on('login', (msg) => {
      console.log('login as ', JSON.stringify(msg));
    });
  });
}
