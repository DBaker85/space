import { createServer } from 'http2';

import { app } from './app';

const localPort = 5055;

const port = process.env.PORT || localPort;

createServer(app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
);
