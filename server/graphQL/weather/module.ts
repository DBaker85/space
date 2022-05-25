import { createModule } from "graphql-modules";
import { WeatherTypes, WeatherQuery } from "./typeDefs";
import { weatherQueries } from "./resolvers";

export const weatherModule = createModule({
  id: "weather-module",
  typeDefs: [WeatherTypes, WeatherQuery],
  resolvers: {
    Query: { ...weatherQueries },
  },
});
