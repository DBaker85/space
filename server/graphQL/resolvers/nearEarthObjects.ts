import { ApolloError } from 'apollo-server-express';
import fetch from 'node-fetch';

export const nearEarthObjectsQueries = {
  neo: async () => {
    // yyyy-mm-dd
    const today = new Date().toISOString().slice(0, 10);
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
    );
    const jsonResp = await response.json();
    const {
      links,
      element_count,
      near_earth_objects,
      code,
      error,
      http_error
    } = jsonResp;

    if (code && code > 400) {
      return new ApolloError(http_error, code);
    }
    if (error) {
      return new ApolloError(error.message, error.code);
    }

    return {
      links,
      element_count,
      near_earth_objects: near_earth_objects[today]
    };
  }
};
