declare const module: any;

import { readFileSync } from "fs-extra";
import { createSecureServer } from "http2";
const destroyable = require("server-destroy");
import { resolve } from "path";

import { app } from "./app";

const localPort = 5055;

const port = process.env.PORT || localPort;

const h2Options = {
  key: readFileSync(resolve(__dirname, "..", "keys", "key.pem")),
  cert: readFileSync(resolve(__dirname, "..", "keys", "cert.pem")),
  allowHTTP1: true,
};

const server = createSecureServer(h2Options, app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
) as any;
destroyable(server);

// Here HMR story begins

// You need only 3 lines of code to start accepting code changes coming through the HMR
if (module.hot) {
  module.hot.accept();
  // Next callback is essential: After code changes were accepted     we need to restart the app. server.close() is here Express.JS-specific and can differ in other frameworks. The idea is that you should shut down your app here. Data/state saving between shutdown and new start is possible
  module.hot.dispose(() => server.destroy());
}
