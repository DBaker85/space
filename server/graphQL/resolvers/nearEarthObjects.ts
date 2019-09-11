import { ApolloError } from 'apollo-server-express';
import fetch, { Response } from 'node-fetch';
import { NearEarthObjectList } from '../../models/NasaApis';
import { ApiErrorResponse } from '../../models/ApiResponses';
import { mapRange, findLargest, findSmallest } from '../../utils/utils';

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

const mapOrbitRange = (value: number, in_min: number, in_max: number) =>
  mapRange(value, in_min, in_max, 60, 100);

export const nearEarthObjectsQueries = {
  neo: async (): Promise<QueryResponse | ApolloError> => {
    // yyyy-mm-dd
    // const today = new Date().toISOString().slice(0, 10);
    // const response = (await fetch(
    //   `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
    // )) as Response;

    // const jsonResp = (await response.json()) as ApiResponse;

    // const {
    //   element_count,
    //   near_earth_objects,
    //   code,
    //   error,
    //   http_error = ''
    // } = jsonResp;

    // if (code && code > 400) {
    //   return new ApolloError(http_error, code.toString());
    // }
    // if (error) {
    //   return new ApolloError(error.message, error.code);
    // }

    // const objects = near_earth_objects[today]
    //   .map(object => ({
    //     size: object.estimated_diameter.kilometers.estimated_diameter_min,
    //     orbit: object.close_approach_data[0].miss_distance.kilometers
    //   }))
    //   .map(object => ({
    //     size: Math.round(object.size * 100),
    //     orbit: Math.round(+object.orbit)
    //   }));

    // const smallestSize = findSmallest(objects, 'size');
    // const largestSize = findLargest(objects, 'size');
    // const smallestOrbit = findSmallest(objects, 'orbit');
    // const largestOrbit = findLargest(objects, 'orbit');

    // const rangedObjects = objects.map(object => ({
    //   size: mapSizeRange(object.size, smallestSize, largestSize),
    //   orbit: mapOrbitRange(object.orbit, smallestOrbit, largestOrbit)
    // }));

    // return {
    //   elements: element_count,
    //   objects: rangedObjects
    // };
    return {
      elements: 15,
      objects: [
        {
          size: 25,
          orbit: mapOrbitRange(80, 0, 100)
        },
        {
          size: 23,
          orbit: mapOrbitRange(86, 0, 100)
        },
        {
          size: 7,
          orbit: mapOrbitRange(65, 0, 100)
        },
        {
          size: 9,
          orbit: mapOrbitRange(100, 0, 100)
        },
        {
          size: 9,
          orbit: mapOrbitRange(73, 0, 100)
        },
        {
          size: 8,
          orbit: mapOrbitRange(21, 0, 100)
        },
        {
          size: 16,
          orbit: mapOrbitRange(51, 0, 100)
        },
        {
          size: 7,
          orbit: mapOrbitRange(38, 0, 100)
        },
        {
          size: 9,
          orbit: mapOrbitRange(48, 0, 100)
        },
        {
          size: 6,
          orbit: mapOrbitRange(17, 0, 100)
        },
        {
          size: 8,
          orbit: mapOrbitRange(40, 0, 100)
        },
        {
          size: 5,
          orbit: mapOrbitRange(0, 0, 100)
        },
        {
          size: 6,
          orbit: mapOrbitRange(11, 0, 100)
        },
        {
          size: 6,
          orbit: mapOrbitRange(3, 0, 100)
        },
        {
          size: 16,
          orbit: mapOrbitRange(32, 0, 100)
        }
      ]
    };
  }
};
