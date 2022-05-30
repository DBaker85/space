import { createModule } from "graphql-modules";
import neoTypeDefs from "./typeDefs.gql";
import { nearEarthObjectsQueries } from "./resolvers";

export const NEOModule = createModule({
  id: "NEO-module",
  typeDefs: [neoTypeDefs],
  resolvers: {
    Query: { ...nearEarthObjectsQueries },
  },
});
