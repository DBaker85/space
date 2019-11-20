import gql from 'graphql-tag';

export const contentQueries = `content: Content`;

export const contentTypes = gql`
  extend type Content {
    active: Boolean
    type: String
  }
`;
