import { gql } from "graphql-modules";

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

export const NeoQuery = gql`
  type Query {
    nearEarthObjects: NeoOutputType
  }
`;
