import { createSecureServer } from 'http2';
import { readFileSync } from 'fs-extra';
import { app } from './app';
import { resolve } from 'path';

const localPort = 5055;

const port = process.env.PORT || localPort;

const h2Options = {
  key: readFileSync(resolve(__dirname, 'keys', 'key.pem')),
  cert: readFileSync(resolve(__dirname, 'keys', 'cert.pem')),
  allowHTTP1: true
};

createSecureServer(h2Options, app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
);
