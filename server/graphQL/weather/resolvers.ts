import fetch, { Response } from "node-fetch";
import { ApiErrorResponse } from "../../models/apiResponses";
import { GraphQLContext } from "../../models/models";
import { OpenWeatherResponse } from "../../models/OpenWeatherApi";

interface ApiResponse extends OpenWeatherResponse, ApiErrorResponse {}

interface QueryResponse {
  temperature: number;
  weather: string;
  sun: {
    rise: number;
    set: number;
  };
  wind: {
    speed: number;
  };
}

let weatherResponse: QueryResponse;

export const weatherQueries = {
  weather: async (
    parent: any,
    args: any,
    context: GraphQLContext
  ): Promise<QueryResponse> => {
    let jsonResp: ApiResponse;

    const response = (await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${process.env.WEATHER_API_LOCATION}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    )) as Response;

    jsonResp = (await response.json()) as ApiResponse;

    console.log(`api response`);

    const {
      weather,
      main: { temp },
      wind: { speed },
      sys: { sunrise, sunset },
      code,
      error,
      http_error = "",
    } = jsonResp;

    if (code && code > 400) {
      throw new Error(`${code.toString()} : ${http_error}`);
    }
    if (error) {
      throw new Error(`${error.code} : ${error.message}`);
    }

    weatherResponse = {
      weather: weather[0].main,
      temperature: temp,
      wind: {
        // speed is in m/s.
        speed,
      },
      sun: {
        rise: sunrise,
        set: sunset,
      },
    };

    return weatherResponse;
  },
};
