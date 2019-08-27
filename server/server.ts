import express, { static as Static } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { resolve } from 'path';

const localPort = 5055;

const port = process.env.PORT || localPort;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const clientPath = resolve(__dirname, '..', 'build');

app.use(Static(clientPath));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(resolve(clientPath, 'index.html'));
});

app.listen(port);

console.log('App is listening on port ' + port);
