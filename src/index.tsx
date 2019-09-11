import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-client';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const initialState = {
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
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

const resolvers = {};

const cache = new InMemoryCache();

const client = new ApolloClient({
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

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
    stars @client {
      move
    }
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data);
  return null;
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
