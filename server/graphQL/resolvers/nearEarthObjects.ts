import fetch, { Response } from 'node-fetch';
import { NearEarthObjectList } from '../../models/NasaApis';
import { ApiErrorResponse } from '../../models/ApiResponses';
import { mapRange, findLargest, findSmallest } from '../../utils/utils';
import { GraphQLContext } from '../../models/models';

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

let neos: QueryResponse;

export const nearEarthObjectsQueries = {
  neo: async (parent: any, context: GraphQLContext): Promise<QueryResponse> => {
    const db = context().db;
    const today = new Date().toISOString().slice(0, 10);
    let jsonResp: ApiResponse;
    const dbase = db
      ? await db.collection('near-earth-objects').findOne({ date: today })
      : null;
    if (dbase) {
      jsonResp = dbase;
    } else {
      const response = (await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
      )) as Response;

      jsonResp = (await response.json()) as ApiResponse;
      const { code, error } = jsonResp;
      if (!code && !error && db) {
        db.collection('near-earth-objects').insertOne({
          ...{
            date: today
          },
          ...jsonResp
        });
      }
    }

    const {
      element_count,
      near_earth_objects,
      code,
      error,
      http_error = ''
    } = jsonResp;

    if (code && code > 400) {
      throw new Error(`${code.toString()} : ${http_error}`);
    }
    if (error) {
      throw new Error(`${error.code} : ${error.message}`);
    }

    const objects = near_earth_objects[today]
      .map(object => ({
        size: object.estimated_diameter.kilometers.estimated_diameter_min,
        orbit: object.close_approach_data[0].miss_distance.kilometers
      }))
      .map(object => ({
        size: Math.round(object.size * 100),
        orbit: Math.round(+object.orbit)
      }));

    const smallestSize = findSmallest(objects, 'size');
    const largestSize = findLargest(objects, 'size');
    const smallestOrbit = findSmallest(objects, 'orbit');
    const largestOrbit = findLargest(objects, 'orbit');

    const rangedObjects = objects.map(object => ({
      size: mapSizeRange(object.size, smallestSize, largestSize),
      orbit: mapOrbitRange(object.orbit, smallestOrbit, largestOrbit)
    }));

    neos = {
      elements: element_count,
      objects: rangedObjects
    };

    return neos;
  }
};
