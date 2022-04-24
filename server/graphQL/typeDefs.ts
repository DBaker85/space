import { NeoTypes, NeoQuery } from "./nearEarthObjects/types";
import { WeatherTypes, WeatherQuery } from "./weather/types";

// Construct a schema, using GraphQL schema language
export const typeDefs = `
  ${NeoTypes}
  ${WeatherTypes}
  type Query {
    ${NeoQuery}
    ${WeatherQuery}
  }
  
`;
