import { createServer } from 'http2';

import { app } from './app';

const localPort = 5055;

const port = process.env.PORT || localPort;

console.log(process.env);

createServer(app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
);
