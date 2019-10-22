import Koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import Router from 'koa-router';
import { createSecureServer } from 'http2';
import { ApolloServer } from 'apollo-server-koa';
import { resolve } from 'path';
import { readFileSync } from 'fs-extra';
import { MongoClient, Db } from 'mongodb';
import chalk from 'chalk';

import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

const localPort = 5055;
const localMongo = 'mongodb://localhost:27017';

const mongo = '';

const dbRetries = 3;

const MONGO_URL = process.env.PRODUCTION ? mongo : localMongo;
const port = process.env.PORT || localPort;

let db: Db;

const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

(async () => {
  let i;
  for (i = 0; i < dbRetries; ++i) {
    try {
      await mongoClient.connect();
      console.log('Connection to database successfull');
      db = mongoClient.db('space');
      break;
    } catch (err) {
      console.log(chalk.red('Connection to database failed'));
    }
  }
})();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphiQL'
  },
  context: () => ({ db })
});

const app = new Koa();
const router = new Router();

server.applyMiddleware({ app });

const clientPath = resolve(__dirname, '..', 'build');

app.use(compress());

app.use(serve(clientPath));

// Handles any requests that don't match the ones above
router.get('*', (ctx, res) => {
  console.log(ctx);
  ctx.body = readFileSync(resolve(clientPath, 'index.html'));
});

app.use(router.routes());

const h2Options = {
  // Private key
  key: readFileSync(resolve(__dirname, 'keys', 'key.pem')),

  // Fullchain file or cert file (prefer the former)
  cert: readFileSync(resolve(__dirname, 'keys', 'cert.pem'))
};

createSecureServer(h2Options, app.callback()).listen(port);
