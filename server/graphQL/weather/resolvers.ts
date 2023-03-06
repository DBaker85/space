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

    console.log("request");

    const {
      weather,
      main,
      wind,
      sys,
      cod,
      code,
      error,
      message = "",
      http_error = "",
    } = jsonResp;

    const httpErrorCode = cod || code;
    const httpErrorMessage = message + http_error;

    if (httpErrorCode && httpErrorCode > 400) {
      throw new Error(`${httpErrorCode.toString()} : ${httpErrorMessage}`);
    }
    if (error) {
      throw new Error(`${error.code} : ${error.message}`);
    }

    weatherResponse = {
      weather: weather[0].main,
      temperature: main.temp,
      wind: {
        // speed is in m/s.
        speed: wind.speed,
      },
      sun: {
        rise: sys.sunrise,
        set: sys.sunset,
      },
    };

    return weatherResponse;
  },
};
