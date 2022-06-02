import React, { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  makeVar,
} from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const isLoggedInVar = makeVar<boolean>(true);

// Initializes to an empty array
export const cartItemsVar = makeVar<string[]>(["1", "2", "3"]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
      },
    },
  },
});

// await before instantiating ApolloClient, else queries might run before the cache is persisted
(async function boot() {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
})();

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:5055/graphql",
  cache,
  typeDefs,
});
import "./i18n";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root");

const Core = () => (
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);

if (process.env.NODE_ENV === "production") {
  hydrateRoot(container!, <Core />);
}

if (process.env.NODE_ENV === "development") {
  const root = createRoot(container!);
  root.render(<Core />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
