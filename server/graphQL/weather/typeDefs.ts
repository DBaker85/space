export const WeatherTypes = `

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

export const WeatherQuery = `weather: WeatherOutputType`;
