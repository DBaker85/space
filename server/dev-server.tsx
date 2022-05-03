declare const module: any;

import { ApolloServer } from "apollo-server-koa";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import Koa from "koa";
import http from "http";

import { readFileSync } from "fs-extra";
import { createSecureServer } from "http2";
const destroyable = require("server-destroy");
import { resolve } from "path";
import { resolvers } from "./graphQL/resolvers";
import { typeDefs } from "./graphQL/typeDefs";

import { Db, MongoClient } from "mongodb";

import { app } from "./app";

const localPort = 5055;

const port = process.env.PORT || localPort;

// const h2Options = {
//   key: readFileSync(resolve(__dirname, "..", "keys", "key.pem")),
//   cert: readFileSync(resolve(__dirname, "..", "keys", "cert.pem")),
//   allowHTTP1: true,
// };

// const server = createSecureServer(h2Options, app.callback()).listen(port, () =>
//   console.log(`static assets served on ${port}`)
// ) as any;

const localMongo = "mongodb://127.0.0.1:27017";
const mongo = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@space.npaeb.azure.mongodb.net/space?retryWrites=true&w=majority`;
const dbRetries = 3;
const MONGO_URL = process.env.PRODUCTION ? mongo : localMongo;
let db: Db;

const mongoClient = new MongoClient(MONGO_URL);

async function startApolloServer() {
  const httpServer = http.createServer();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // process.env.NODE_ENV === "production"
      // ? ApolloServerPluginLandingPageDisabled()
      // :
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: async () => {
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
      return db;
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  httpServer.on("request", app.callback());
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );

  // destroyable(server);

  // // Here HMR story begins

  // // You need only 3 lines of code to start accepting code changes coming through the HMR
  // if (module.hot) {
  //   module.hot.accept();
  //   // Next callback is essential: After code changes were accepted     we need to restart the app. server.close() is here Express.JS-specific and can differ in other frameworks. The idea is that you should shut down your app here. Data/state saving between shutdown and new start is possible
  //   module.hot.dispose(() => (server as any).destroy());
  // }

  return { server, app };
}

startApolloServer();
