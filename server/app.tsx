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
import { renderToNodeStream, renderToString } from "react-dom/server";
import styled, { ServerStyleSheet } from "styled-components";
import KoaLogger from "koa-logger";
import { Db, MongoClient } from "mongodb";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";

import { getInitialFiles } from "./utils/getInitialFiles";
import { logger } from "./utils/utils";

import App from "../client/src/App";

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

const fileList: PushManifest = readJSONSync(
  resolve(__dirname, "public", "push_manifest.json")
);

const clientPath = resolve(__dirname, "public");

const initialFiles = getInitialFiles(fileList.initial);

const app = new Koa();
const router = new Router();

router.all("(.*)", async (ctx: Context, next) => {
  if (ctx.request.url === "/graphql") {
    return next();
  }
  const sheet = new ServerStyleSheet();
  //     const client = new ApolloClient({
  //       ssrMode: true,
  //       link: createHttpLink({
  //         uri: 'http://localhost:5055',
  //         credentials: 'same-origin',
  //         // headers: {
  //         //   cookie: req.header('Cookie'),
  //         // },
  //       }),
  //       cache: new InMemoryCache(),
  //     });

  //     const WrappedApp = ()=> (<ApolloProvider client={client}>
  //     <App />
  //     </ApolloProvider>)

  const html = renderToString(sheet.collectStyles(<App />));
  const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
  sheet.seal();
  // // } catch (error) {
  // //   // handle error
  // //   console.error(error);
  // // } finally {
  // //   sheet.seal();
  // // }

  const indexFile = await resolve(__dirname, "public", "index.html");
  let index;

  const file = await readFile(indexFile, "utf8");

  const rx = new RegExp('<div id="root"></div>', "g");
  index = file.replace(
    rx,
    `<div id="root">
        ${styleTags}
        ${html}
        </div>`
  );

  // const content = await getDataFromTree(<WrappedApp/>)

  //   ctx.res.write('<html><head><title>Test</title></head><body>');

  // const Heading = styled.h1`
  // color: red;
  // `;

  // const sheet = new ServerStyleSheet();
  // const jsx = sheet.collectStyles(<Heading>Hello SSR!</Heading>);
  // const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

  // // you'd then pipe the stream into the response object until it's done
  // stream.pipe(ctx.res, { end: false });

  // // and finalize the response with closing HTML
  // stream.on('end', () => ctx.res.end('</body></html>'));

  // console.log(file); // => 'html'
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
  ctx.body = index;
});

if (!process.env.PRODUCTION) {
  app.use(KoaLogger());
}

app.use(compress());

app.use(mount("/", serve(clientPath, { index: "none" })));

app.use(router.routes());

export { app };
