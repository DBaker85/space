import gql from 'graphql-tag';

import { starTypes, starQueries } from './stars/typeDefs';

export const typeDefs = gql`
${starTypes}

extend type Query {
  ${starQueries}
}

extend type Mutation {
  moveStars(move: Boolean!): null
}
`;
