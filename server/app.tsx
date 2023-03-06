import { readFile, readJSONSync } from "fs-extra";
import { resolve } from "path";
import { constants } from "http2";
import serve from "koa-static";
import compress from "koa-compress";
import mount from "koa-mount";
import Koa, { Context } from "koa";
import Router from "@koa/router";
import React from "react";
import { renderToString, renderToNodeStream } from "react-dom/server";
import Styled, { ServerStyleSheet, StyleSheetManager } from "styled-components";
import KoaLogger from "koa-logger";
import bodyParser from "koa-bodyparser";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "graphql-tools";
import { Router as WouterRouter } from "wouter";
import staticLocationHook from "wouter/static-location";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

import { schema } from "./graphQL";

import { getInitialFiles } from "./utils/getInitialFiles";
import { logger } from "./utils/utils";

// const { messages } = require(`@lingui/loader!./locales/en/messages.po`);

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

const indexFile = resolve(__dirname, "public", "index.html");

const clientPath = resolve(__dirname, "public");

const initialFiles = getInitialFiles(fileList.initial);

const rootDivRegex = new RegExp('<div id="root"></div>', "g");

const app = new Koa();
const router = new Router();

router.all("(.*)", async (ctx: Context, next) => {
  if (ctx.request.url === "/graphql") {
    return next();
  }

  const sheet = new ServerStyleSheet();

  const WrappedApp = () => (
    <WouterRouter hook={staticLocationHook(ctx.path)}>
      <StyleSheetManager sheet={sheet.instance}>
        {/* <I18nProvider i18n={i18n}> */}
        <App />
        {/* </I18nProvider> */}
      </StyleSheetManager>
    </WouterRouter>
  );

  try {
    //   i18n.load("en", messages);
    //   i18n.activate("en");

    // const html = renderToString(sheet.collectStyles(<WrappedApp />));
    // const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();

    const indexContent = await readFile(indexFile, "utf8");

    // const index = indexContent.replace(
    //   rootDivRegex,
    //   `<div id="root">
    //     ${styleTags}
    //     ${html}
    // </div>`
    // );

    ctx.res.write("<html><head><title>Test</title></head><body>");

    const Heading = Styled.h1`
    color: red;
    `;

    const sheet = new ServerStyleSheet();
    const jsx = sheet.collectStyles(<Heading>Hello SSR!</Heading>);
    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

    // you'd then pipe the stream into the response object until it's done
    stream.pipe(ctx.res, { end: false });

    // and finalize the response with closing HTML
    stream.on("end", () => ctx.res.end("</body></html>"));

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

    // ctx.body = index;
  } catch (error) {
    console.log(error);
    ctx.body = "Welp that went wrong eh";
  } finally {
    sheet.seal();
  }
});

if (!process.env.PRODUCTION) {
  app.use(KoaLogger());
}

app.use(compress());

app.use(mount("/", serve(clientPath, { index: "none" })));

app.use(router.routes());
app.use(bodyParser());

export { app };
