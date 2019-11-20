import gql from 'graphql-tag';

export const planetQueries = `planets: [Planet]`;

export const planetTypes = gql`
  extend type Planet {
    size: Float
    type: Float
    color: String
    orbit: Float
    orbit2: Float
  }
`;
