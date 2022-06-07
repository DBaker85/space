import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  makeVar,
} from "@apollo/client";

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
