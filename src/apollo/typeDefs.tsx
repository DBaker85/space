import gql from 'graphql-tag';

import { starTypes, starQueries } from './stars/typeDefs';
import { planetTypes, planetQueries } from './planets/typeDefs';
import { networkTypes, networkQueries } from './network/typeDefs';
import { contentTypes, contentQueries } from './content/typeDefs';

export const typeDefs = gql`
${starTypes}
${planetTypes}
${networkTypes}
${contentTypes}

extend type Query {
  ${starQueries}
  ${planetQueries}
  ${networkQueries}
  ${contentQueries}
}

extend type Mutation {
  moveStars(move: Boolean!): null
  activateContent(active: Boolean, type:String): null
}
`;
