import { readFile, readJSONSync } from "fs-extra";
import { resolve } from "path";
import { buildSchema } from "graphql";
import { constants } from "http2";
import serve from "koa-static";
import compress from "koa-compress";
import mount from "koa-mount";
import Koa, { Context } from "koa";
import Router from "@koa/router";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import KoaLogger from "koa-logger";
import { Db, MongoClient } from "mongodb";

import { getInitialFiles } from "./utils/getInitialFiles";
import { logger } from "./utils/utils";

// import App from "../client/src/App";

export type ManifestFile = {
  path: string[];
  extension: string;
  mimeType: string;
};

export type PushManifest = {
  initial: ManifestFile[];
  fonts: {
    [key: string]: ManifestFile;
  };
  images: {
    [key: string]: ManifestFile;
  };
};

const sheet = new ServerStyleSheet();

// const html = renderToString(sheet.collectStyles(<App />));
// const styleTags = sheet.getStyleTags();

const indexFile = resolve(__dirname, "public", "index.html");
let index;

// readFile(indexFile, "utf8").then((file) => {
//   const rx = new RegExp('<div id="root"></div>', "g");
//   index = file.replace(
//     rx,
//     `<div id="root">
//         ${styleTags}
//         ${html}
//         </div>`
//   );
// });

const fileList: PushManifest = readJSONSync(
  resolve(__dirname, "public", "push_manifest.json")
);

const clientPath = resolve(__dirname, "public");

const initialFiles = getInitialFiles(fileList.initial);

const app = new Koa();
const router = new Router();

router.all(
  "(.*)",
  // FIXME: Fix CTX types
  async (ctx: Context, next) => {
    console.log(ctx.request.url);
    if (ctx.request.url === "/graphql") {
      return next();
    }
    // ctx.is('html'); // => 'html'
    // initialFiles.forEach((file) => {
    //   (ctx.res as any).stream.pushStream(
    //     { [constants.HTTP2_HEADER_PATH]: file.path },
    //     (err: any, pushStream: any) => {
    //       if (err) {
    //         logger.error("push stream callback error: ", err);
    //         return;
    //       }
    //       if (pushStream.pushAllowed) {
    //         pushStream.respondWithFD(file.file, file.fd);
    //         logger.log("file pushed");
    //       }
    //       pushStream.on("error", (err: any) => {
    //         logger.error("push stream error: ", err);
    //       });

    //       pushStream.on("close", () => {
    //         logger.log("push stream closed");
    //       });
    //     }
    //   );
    // });
    // ctx.body = index;
    ctx.body = indexFile;
  }
);

if (!process.env.PRODUCTION) {
  app.use(KoaLogger());
}

app.use(compress());

app.use(mount("/", serve(clientPath, { index: "none" })));

app.use(router.routes());

export { app };
