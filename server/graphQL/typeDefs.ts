import { gql } from 'apollo-server-koa';
import { NeoTypes, NeoQuery } from './types/nearEarthObjects';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  ${NeoTypes}

  type Query {
    ${NeoQuery}
  }
`;
