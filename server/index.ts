import express from 'express';

const _app = express();
const _port = 3003;

_app.listen(_port, () => {
  console.log('hello there on port', _port);
});
