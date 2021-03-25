import { createSecureServer, constants } from "http2";
const destroyable = require("server-destroy");

import { readFile, readFileSync, readJSONSync } from "fs-extra";
import { resolve } from "path";
import { buildSchema } from "graphql";
import logger from "koa-logger";
import serve from "koa-static";
import compress from "koa-compress";
import mount from "koa-mount";
import Koa, { Context } from "koa";
import send from "koa-send";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { getInitialFiles } from "./utils/getInitialFiles";
import { resolvers } from "./graphQL/resolvers";
import { typeDefs } from "./graphQL/typeDefs";
import App from "../client/src/App";
import graphqlHTTP from "koa-graphql";

import { Db, MongoClient } from "mongodb";

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

const localMongo = "mongodb://localhost:27017";
const mongo = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@space.npaeb.azure.mongodb.net/space?retryWrites=true&w=majority`;
const dbRetries = 3;
const MONGO_URL = process.env.PRODUCTION ? mongo : localMongo;
let db: Db;

const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  let i;
  for (i = 0; i < dbRetries; ++i) {
    try {
      await mongoClient.connect();
      console.log("Connection to database successfull");
      db = mongoClient.db("space");
      break;
    } catch (err) {
      console.log("Connection to database failed");
      console.log(err);
    }
  }
})();

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

app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: buildSchema(typeDefs),
      rootValue: resolvers,
      graphiql: true,
      context: () => ({ db }),
    })
  )
);

app.use(mount("/", serve(clientPath, { index: "none" })));

app.use(logger());

const fileList: PushManifest = readJSONSync(
  resolve(__dirname, "public", "push_manifest.json")
);

const initialFiles = getInitialFiles(fileList.initial);

// FIXME: Fix CTX types
app.use(async (ctx: Context, next) => {
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
          console.log("file pushed");
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
