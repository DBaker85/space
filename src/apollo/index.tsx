import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { initialState } from './state';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'graphql'
  }),
  typeDefs,
  resolvers
});

cache.writeData({
  data: initialState
});
