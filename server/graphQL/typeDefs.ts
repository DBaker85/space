import { gql } from "apollo-server-core";
import { NeoTypes, NeoQuery } from "./nearEarthObjects/types";
import { WeatherTypes, WeatherQuery } from "./weather/types";

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  ${NeoTypes}
  ${WeatherTypes}
  type Query {
    ${NeoQuery}
    ${WeatherQuery}
  }
  
`;
