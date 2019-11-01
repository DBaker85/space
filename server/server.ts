import Koa, { Context } from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';

import { openSync, fstatSync } from 'fs-extra';
import { buildSchema } from 'graphql';
import { createSecureServer, constants } from 'http2';

import { Db, MongoClient } from 'mongodb';
import chalk from 'chalk';

import { resolve } from 'path';
import { readFileSync } from 'fs-extra';

import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

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

// TODO: create pushstream manifest of some kind from built index.html
// TODO: use resolve or join to get paths
const fd1 = openSync('./build/index.html', 'r');
const stat1 = fstatSync(fd1);

const fd2 = openSync('./build/static/css/main.1e4e9602.chunk.css', 'r');
const stat2 = fstatSync(fd1);

// TODO: Filter out request for only doc types somehow
app.use(async (ctx: Context, next) => {
  (ctx.res as any).stream.pushStream(
    { [constants.HTTP2_HEADER_PATH]: '/static/css/main.1e4e9602.chunk.css' },
    (err: any, pushStream: any) => {
      pushStream.respondWithFD(fd2, {
        'content-length': stat2.size,
        'last-modified': stat2.mtime.toUTCString(),
        'content-type': 'text/html'
      });
    }
  );
  (ctx.res as any).stream.respondWithFD(fd1, {
    'content-length': stat1.size,
    'last-modified': stat1.mtime.toUTCString(),
    'content-type': 'text/html'
  });
});

app.use(mount('/', serve(clientPath)));
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
