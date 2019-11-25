import { createSecureServer } from 'http2';

import { resolve } from 'path';
import { readFileSync } from 'fs-extra';

import { app } from './app';

const localPort = 5055;

const port = process.env.PORT || localPort;

const h2Options = {
  // Private key
  key: readFileSync(resolve(__dirname, 'keys', 'key.pem')),
  // Fullchain file or cert file (prefer the former)
  cert: readFileSync(resolve(__dirname, 'keys', 'cert.pem')),
  // TODO: check if we should activate this for dev only
  allowHTTP1: true
};

createSecureServer(h2Options, app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
);
