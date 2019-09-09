import { gql } from 'apollo-server-express';

export const NeoTypes = gql`
  type NeoObjectsType {
    size: Float
    orbit: Float
  }

  type NeoOutputType {
    elements: Float
    objects: [NeoObjectsType]
  }
`;

export const NeoQuery = `neo: NeoOutputType`;
