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
import { readFileSync, readJSONSync } from 'fs-extra';

import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

import { getInitialFiles } from './utils/getInitialFiles';

import { PushManifest } from './models/models';

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

const fileList: PushManifest = readJSONSync(
  resolve(__dirname, '..', 'build', 'push_manifest.json')
);
const initialFiles = getInitialFiles(fileList.initial);

// TODO: use resolve or join to get paths
const indexFd = openSync('./build/index.html', 'r');
const indexStat = fstatSync(indexFd);

// // TODO: Filter out request for only doc types somehow
app.use(async (ctx: Context, next) => {
  initialFiles.forEach(file => {
    (ctx.res as any).stream.pushStream(
      { [constants.HTTP2_HEADER_PATH]: file.path },
      (err: any, pushStream: any) => {
        pushStream.respondWithFD(file.file, file.fd);
      }
    );
  });
  (ctx.res as any).stream.respondWithFD(indexFd, {
    'content-length': indexStat.size,
    'last-modified': indexStat.mtime.toUTCString(),
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
