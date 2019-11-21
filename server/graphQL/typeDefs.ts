import { NeoTypes, NeoQuery } from './types/nearEarthObjects';

// Construct a schema, using GraphQL schema language
export const typeDefs = `
  ${NeoTypes}

  type Query {
    ${NeoQuery}
  }
`;
