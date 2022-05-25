import { gql } from "graphql-modules";

export const WeatherTypes = gql`
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
`;

export const WeatherQuery = gql`
  type Query {
    weather: WeatherOutputType
  }
`;
