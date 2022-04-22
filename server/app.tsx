import { readFile, readJSONSync } from "fs-extra";
import { resolve } from "path";
import { buildSchema } from "graphql";
import { constants } from "http2";
import serve from "koa-static";
import compress from "koa-compress";
import mount from "koa-mount";
import Koa, { Context } from "koa";
// import send from "koa-send";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { graphqlHTTP } from "koa-graphql";

import KoaLogger from "koa-logger";
import { Db, MongoClient } from "mongodb";

import { getInitialFiles } from "./utils/getInitialFiles";
import { logger } from "./utils/utils";
import { resolvers } from "./graphQL/resolvers";
import { typeDefs } from "./graphQL/typeDefs";

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

const sheet = new ServerStyleSheet();

const localMongo = "mongodb://127.0.0.1:27017";
const mongo = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@space.npaeb.azure.mongodb.net/space?retryWrites=true&w=majority`;
const dbRetries = 3;
const MONGO_URL = process.env.PRODUCTION ? mongo : localMongo;
let db: Db;

const mongoClient = new MongoClient(MONGO_URL);

(async () => {
  let i;
  for (i = 0; i < dbRetries; ++i) {
    try {
      await mongoClient.connect();
      console.log("Connection to database successfull");
      db = mongoClient.db("space");
      db.command({ ping: 1 });
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

const fileList: PushManifest = readJSONSync(
  resolve(__dirname, "public", "push_manifest.json")
);

const clientPath = resolve(__dirname, "public");

const initialFiles = getInitialFiles(fileList.initial);

const app = new Koa();

if (!process.env.PRODUCTION) {
  app.use(KoaLogger());
}

app.use(compress());

app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: buildSchema(typeDefs),
      rootValue: resolvers,
      graphiql: process.env.PRODUCTION ? false : true,
      context: () => ({ db }),
    })
  )
);

app.use(mount("/", serve(clientPath, { index: "none" })));

// FIXME: Fix CTX types
app.use(async (ctx: Context, next) => {
  initialFiles.forEach((file) => {
    (ctx.res as any).stream.pushStream(
      { [constants.HTTP2_HEADER_PATH]: file.path },
      (err: any, pushStream: any) => {
        if (err) {
          logger.error("push stream callback error: ", err);
          return;
        }
        if (pushStream.pushAllowed) {
          pushStream.respondWithFD(file.file, file.fd);
          logger.log("file pushed");
        }
        pushStream.on("error", (err: any) => {
          logger.error("push stream error: ", err);
        });

        pushStream.on("close", () => {
          logger.log("push stream closed");
        });
      }
    );
  });
  ctx.body = index;
});

export { app };
