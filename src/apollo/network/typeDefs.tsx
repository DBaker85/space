import gql from 'graphql-tag';

export const networkQueries = `
online: Boolean
connected: Boolean
`;

export const networkTypes = gql`
  {
    online: Boolean
    connected: Boolean
  }
`;
