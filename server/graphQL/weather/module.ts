import { createModule } from "graphql-modules";
import weatherTypeDefs from "./typeDefs.gql";
import { weatherQueries } from "./resolvers";

export const weatherModule = createModule({
  id: "weather-module",
  typeDefs: [weatherTypeDefs],
  resolvers: {
    Query: { ...weatherQueries },
  },
});
