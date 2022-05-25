import { createModule, gql } from "graphql-modules";
import { NeoTypes, NeoQuery } from "./typeDefs";
import { nearEarthObjectsQueries } from "./resolvers";

export const NEOModule = createModule({
  id: "NEO-module",

  typeDefs: [
    gql`
      type NeoObjectsType {
        size: Float
        orbit: Float
      }

      type NeoOutputType {
        elements: Float
        objects: [NeoObjectsType]
      }
      type Query {
        nearEarthObjects: NeoOutputType
      }
    `,
  ],
  resolvers: {
    Query: { ...nearEarthObjectsQueries },
  },
});
