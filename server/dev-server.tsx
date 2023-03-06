declare const module: any;

import "regenerator-runtime/runtime";
// import { ApolloServer } from "apollo-server-koa";
// import {
//   ApolloServerPluginDrainHttpServer,
//   ApolloServerPluginLandingPageGraphQLPlayground,
//   ApolloServerPluginLandingPageDisabled,
//   ApolloServerPluginCacheControl,
// } from "apollo-server-core";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";

import responseCachePlugin from "@apollo/server-plugin-response-cache";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";

import http from "http";

import { readFileSync } from "fs-extra";
import { createSecureServer } from "http2";
const destroyable = require("server-destroy");
import { resolve } from "path";
import { schema, executor } from "./graphQL";

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

// async function startApolloServer() {
//   const httpServer = http.createServer();
//   const server = new ApolloServer({
//     schema,
//     executor,
//     plugins: [
//       ApolloServerPluginDrainHttpServer({ httpServer }),
//       ApolloServerPluginCacheControl(),
//       responseCachePlugin(),
//       process.env.NODE_ENV === "production"
//         ? ApolloServerPluginLandingPageDisabled()
//         : ApolloServerPluginLandingPageGraphQLPlayground(),
//     ],
//     cache: new InMemoryLRUCache({
//       // ~50MiB
//       maxSize: Math.pow(2, 20) * 50,
//     }),
//     context: async () => {
//       if (db instanceof Db === false) {
//         let i;
//         for (i = 0; i < dbRetries; ++i) {
//           try {
//             await mongoClient.connect();
//             console.log("Connection to database successfull");
//             db = mongoClient.db("space");
//             db.command({ ping: 1 });
//             break;
//           } catch (err) {
//             console.log("Connection to database failed");
//             console.log(err);
//           }
//         }
//       }
//       return db;
//     },
//   });

//   await server.start();
//   server.applyMiddleware({ app });
//   httpServer.on("request", app.callback());
//   await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
//   console.log(
//     `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
//   );

//   // destroyable(server);

//   // // Here HMR story begins

//   // // You need only 3 lines of code to start accepting code changes coming through the HMR
//   // if (module.hot) {
//   //   module.hot.accept();
//   //   // Next callback is essential: After code changes were accepted     we need to restart the app. server.close() is here Express.JS-specific and can differ in other frameworks. The idea is that you should shut down your app here. Data/state saving between shutdown and new start is possible
//   //   module.hot.dispose(() => (server as any).destroy());
//   // }

//   return { server, app };
// }

async function startApolloServer() {
  const httpServer = http.createServer(app.callback());
  const cache = new InMemoryLRUCache({
    // ~50MiB
    maxSize: Math.pow(2, 20) * 50,
  });

  // Set up Apollo Server
  const server = new ApolloServer({
    gateway: {
      async load() {
        return { executor };
      },
      onSchemaLoadOrUpdate(callback) {
        callback({ apiSchema: schema } as any);
        return () => {};
      },
      async stop() {},
    },

    cache,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      responseCachePlugin(),
    ],
  });
  await server.start();

  app.use(
    koaMiddleware(server, {
      context: async ({ ctx }) => {
        return { token: ctx.headers.token, cache };
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
}

startApolloServer();
