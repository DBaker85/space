import gql from 'graphql-tag';

export const starQueries = `stars: Star`;

export const starTypes = gql`
  extend type Star {
    move: Boolean
  }
`;
