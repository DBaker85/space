import Koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import mount from 'koa-mount';

import graphqlHTTP from 'koa-graphql';
import { buildSchema } from 'graphql';

import { createSecureServer } from 'http2';

import { resolve } from 'path';
import { readFileSync } from 'fs-extra';

// import bodyParser from 'koa-bodyparser'
// import chalk from 'chalk';

import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

const localPort = 5055;

const port = process.env.PORT || localPort;
const clientPath = resolve(__dirname, '..', 'build');

const h2Options = {
  // Private key
  key: readFileSync(resolve(__dirname, 'keys', 'key.pem')),
  // Fullchain file or cert file (prefer the former)
  cert: readFileSync(resolve(__dirname, 'keys', 'cert.pem'))
};

const app = new Koa();
app.use(compress());
app.use(serve(clientPath));
app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: buildSchema(typeDefs),
      rootValue: resolvers,
      graphiql: true
    })
  )
);

createSecureServer(h2Options, app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
);
