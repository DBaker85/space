import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';

interface StarState {
  move: boolean;
  __typename: string;
}

interface FullState {
  stars: StarState;
}

const initialState: FullState = {
  stars: { move: false, __typename: 'Star' }
};

const typeDefs = gql`
  extend type Query {
    stars: Star
  }

  extend type Star {
    move: Boolean
  }

  extend type Mutation {
    moveStars(move: Boolean!): null
  }
`;

const resolvers = {
  Mutation: {
    moveStars: (
      _: {},
      { move }: StarState,
      { cache }: { cache: ApolloCache<FullState> }
    ) => {
      cache.writeData({ data: { stars: { move, __typename: 'Star' } } });
      return null;
    }
  }
};

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
