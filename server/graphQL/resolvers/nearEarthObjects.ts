import { ApolloError } from 'apollo-server-express';
import fetch, { Response } from 'node-fetch';
import { NearEarthObjectList } from '../../models/NasaApis';
import { ApiErrorResponse } from '../../models/ApiResponses';
import { mapRange } from '../../utils/utils';

interface ApiResponse extends NearEarthObjectList, ApiErrorResponse {}

interface NearEarthObject {
  size: number;
  orbit: number;
}

interface QueryResponse {
  elements: number;
  objects: NearEarthObject[];
}

const mapSizeRange = (value: number, in_min: number, in_max: number) =>
  mapRange(value, in_min, in_max, 5, 25);

export const nearEarthObjectsQueries = {
  neo: async (): Promise<QueryResponse | ApolloError> => {
    // yyyy-mm-dd
    const today = new Date().toISOString().slice(0, 10);
    const response = (await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
    )) as Response;

    const jsonResp = (await response.json()) as ApiResponse;

    const {
      element_count,
      near_earth_objects,
      code,
      error,
      http_error = ''
    } = jsonResp;

    if (code && code > 400) {
      return new ApolloError(http_error, code.toString());
    }
    if (error) {
      return new ApolloError(error.message, error.code);
    }

    const objects = near_earth_objects[today]
      .map(object => ({
        size: object.estimated_diameter.kilometers.estimated_diameter_min,
        orbit: object.close_approach_data[0].miss_distance.kilometers
      }))
      .map(object => ({
        size: Math.round(object.size * 100),
        orbit: +object.orbit
      }))
      .sort((a, b) => a.size - b.size)
      .map((object, i, array) => ({
        ...object,
        ...{
          size: mapSizeRange(
            object.size,
            array[0].size,
            array[array.length - 1].size
          )
        }
      }));

    return {
      elements: element_count,
      objects
    };
  }
};
