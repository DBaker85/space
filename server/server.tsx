import { createSecureServer, constants } from "http2";
const destroyable = require("server-destroy");

import { readFile, readFileSync, readJSONSync } from "fs-extra";
import { resolve } from "path";

import serve from "koa-static";
import compress from "koa-compress";
import mount from "koa-mount";
import Koa, { Context } from "koa";
import send from "koa-send";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { getInitialFiles } from "./utils/getInitialFiles";

import App from "../client/src/App";

export type ManifestFile = {
  path: string;
  filePath: string;
};

export type PushManifest = {
  seperator: string;
  initial: ManifestFile[];
  fonts: {
    [key: string]: ManifestFile;
  };
  images: {
    [key: string]: ManifestFile;
  };
};

const sheet = new ServerStyleSheet();

const html = renderToString(sheet.collectStyles(<App />));
const styleTags = sheet.getStyleTags();

const indexFile = resolve(__dirname, "public", "index.html");
let index;
readFile(indexFile, "utf8").then((file) => {
  const rx = new RegExp('<div id="root"></div>', "g");
  index = file.replace(
    rx,
    `<div id="root">
        ${styleTags}
        ${html}
        </div>`
  );
});

// import { app } from './app';
declare const module: any;

const app = new Koa();
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

const clientPath = resolve(__dirname, "public");
app.use(compress());
app.use(mount("/", serve(clientPath, { index: "none" })));

// app.use(async (ctx: any) => {
//   ctx.body = index;
// });

// FIXME: Fix CTX types
app.use(async (ctx: Context, next) => {
  const fileList: PushManifest = readJSONSync(
    resolve(__dirname, "public", "push_manifest.json")
  );

  const initialFiles = getInitialFiles(fileList.initial, fileList.seperator);

  initialFiles.forEach((file) => {
    (ctx.res as any).stream.pushStream(
      { [constants.HTTP2_HEADER_PATH]: file.path },
      (err: any, pushStream: any) => {
        if (err) {
          console.error("push stream callback error: ", err);
          return;
        }
        if (pushStream.pushAllowed) {
          pushStream.respondWithFD(file.file, file.fd);
        }
        pushStream.on("error", (err: any) => {
          console.error("push stream error: ", err);
        });

        pushStream.on("close", () => {
          console.log("push stream closed");
        });
      }
    );
  });
  ctx.body = index;
  // await send(ctx, index);
});

if (process.env.NODE_ENV === "development") {
  // Here HMR story begins

  // You need only 3 lines of code to start accepting code changes coming through the HMR
  if (module.hot) {
    module.hot.accept();
    // Next callback is essential: After code changes were accepted     we need to restart the app. server.close() is here Express.JS-specific and can differ in other frameworks. The idea is that you should shut down your app here. Data/state saving between shutdown and new start is possible
    module.hot.dispose(() => server.destroy());
  }
}
