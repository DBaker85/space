import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { persistCache } from 'apollo-cache-persist';

import { initialState } from './state';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const createApolloClient: Promise<
  ApolloClient<NormalizedCacheObject>
> = new Promise(async (resolve, reject) => {
  const cache = new InMemoryCache();
  await persistCache({
    cache,
    storage: window.localStorage as any
  });

  const apolloClient = new ApolloClient({
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

  resolve(apolloClient);
});

export { createApolloClient };
