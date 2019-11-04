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

// TODO: check if this regex can be better
// TODO: refactor to different file.
app.use(async (ctx: Context, next) => {
  if (
    !/([a-z0-9_\-]{1,5}:\/\/)?(([a-z0-9_\-]{1,}):([a-z0-9_\-]{1,})\@)?((www\.)|([a-z0-9_\-]{1,}\.)+)?([a-z0-9_\-]{3,})(\.[a-z]{2,4})(\/([a-z0-9_\-]{1,}\/)+)?([a-z0-9_\-]{1,})?(\.[a-z]{2,})?(\?)?(((\&)?[a-z0-9_\-]{1,}(\=[a-z0-9_\-]{1,})?)+)?/.test(
      ctx.request.url
    )
  ) {
    initialFiles.forEach(file => {
      (ctx.res as any).stream.pushStream(
        { [constants.HTTP2_HEADER_PATH]: file.path },
        (err: any, pushStream: any) => {
          if (err) {
            console.error('push stream callback error: ', err);
            return;
          }
          if (pushStream.pushAllowed) {
            pushStream.respondWithFD(file.file, file.fd);
          }
          pushStream.on('error', (err: any) => {
            console.error('push stream error: ', err);
          });

          pushStream.on('close', () => {
            // console.log('push stream closed');
          });
        }
      );
    });
    (ctx.res as any).stream.respondWithFD(indexFd, {
      'content-length': indexStat.size,
      'last-modified': indexStat.mtime.toUTCString(),
      'content-type': 'text/html'
    });
  } else {
    await next();
  }
});

app.use(mount('/', serve(clientPath)));

createSecureServer(h2Options, app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
);
