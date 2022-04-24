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
    context: GraphQLContext
  ): Promise<QueryResponse> => {
    const db = context().db;
    const today = new Date().toISOString().slice(0, 10);
    let jsonResp: ApiResponse;
    const dbase = db
      ? await db.collection("weather").findOne({ date: today })
      : null;
    if (dbase) {
      jsonResp = dbase;
    } else {
      const response = (await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${process.env.WEATHER_API_LOCATION}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      )) as Response;

      jsonResp = (await response.json()) as ApiResponse;
      const { code, error } = jsonResp;
      if (!code && !error && db) {
        db.collection("weather").insertOne({
          ...{
            date: today,
          },
          ...jsonResp,
        });
      }
    }

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
