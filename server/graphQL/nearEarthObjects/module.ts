import { createModule } from "graphql-modules";
import { NeoTypes, NeoQuery } from "./typeDefs";
import { nearEarthObjectsQueries } from "./resolvers";

export const NEOModule = createModule({
  id: "NEO-module",
  typeDefs: [NeoTypes, NeoQuery],
  resolvers: {
    Query: { ...nearEarthObjectsQueries },
  },
});
