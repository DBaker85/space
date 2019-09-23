import gql from 'graphql-tag';

import { starTypes, starQueries } from './stars/typeDefs';
import { planetTypes, planetQueries } from './planets/typeDefs';

export const typeDefs = gql`
${starTypes}
${planetTypes}

extend type Query {
  ${starQueries}
  ${planetQueries}
}

extend type Mutation {
  moveStars(move: Boolean!): null
}
`;
