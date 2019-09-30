import gql from 'graphql-tag';

import { starTypes, starQueries } from './stars/typeDefs';
import { planetTypes, planetQueries } from './planets/typeDefs';
import { networkTypes, networkQueries } from './network/typeDefs';

export const typeDefs = gql`
${starTypes}
${planetTypes}
${networkTypes}

extend type Query {
  ${starQueries}
  ${planetQueries}
  ${networkQueries}
}

extend type Mutation {
  moveStars(move: Boolean!): null
}
`;
