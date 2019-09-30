import express, { static as Static } from 'express';
import gzip from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { resolve } from 'path';

import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

import { MongoClient, Db } from 'mongodb';
import chalk from 'chalk';

// // ssr test
// import App from "../src/App";
// import { renderToString } from "react-dom/server"
// import { createElement } from "react";

// // @ts-ignore
// console.log(renderToString(createElement(App)));

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
