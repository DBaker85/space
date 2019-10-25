import Koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import mount from 'koa-mount';

import graphqlHTTP from 'koa-graphql';
import { buildSchema } from 'graphql';

import { createSecureServer } from 'http2';

import { resolve } from 'path';
import { readFileSync } from 'fs-extra';

import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

import { Db, MongoClient } from 'mongodb';
import chalk from 'chalk';
import { GraphQLContext } from './models/models';

const localMongo = 'mongodb://localhost:27017';
const mongo = '';
const dbRetries = 3;
const MONGO_URL = process.env.PRODUCTION ? mongo : localMongo;

let db: Db;

const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const localPort = 5055;

const port = process.env.PORT || localPort;
const clientPath = resolve(__dirname, '..', 'build');

const h2Options = {
  // Private key
  key: readFileSync(resolve(__dirname, 'keys', 'key.pem')),
  // Fullchain file or cert file (prefer the former)
  cert: readFileSync(resolve(__dirname, 'keys', 'cert.pem'))
};

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

const app = new Koa();
app.use(compress());
app.use(serve(clientPath));
app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: buildSchema(typeDefs),
      rootValue: resolvers,
      graphiql: true,
      context: () => ({ db })
    })
  )
);

createSecureServer(h2Options, app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
);
