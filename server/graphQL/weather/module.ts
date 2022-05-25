import { createModule, gql } from "graphql-modules";
import { WeatherTypes, WeatherQuery } from "./typeDefs";
import { weatherQueries } from "./resolvers";

export const weatherModule = createModule({
  id: "weather-module",

  typeDefs: [
    gql`
      type SunType {
        rise: Float
        set: Float
      }
      type WindType {
        speed: Float
      }

      type WeatherOutputType {
        temperature: Float
        weather: String
        sun: SunType
        wind: WindType
      }
      type Query {
        weather: WeatherOutputType
      }
    `,
  ],
  resolvers: {
    Query: { ...weatherQueries },
  },
});
