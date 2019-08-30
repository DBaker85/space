import express, { static as Static } from 'express';
import gzip from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { resolve } from 'path';

import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

const localPort = 5055;

const port = process.env.PORT || localPort;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(gzip());

server.applyMiddleware({ app });

const clientPath = resolve(__dirname, '..', 'build');

app.use(Static(clientPath));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(resolve(clientPath, 'index.html'));
});

app.listen(port);

console.log('App is listening on port ' + port);
