import { ApolloError } from 'apollo-server-express';
import fetch from 'node-fetch';

const asteroids = {
  neo: async () => {
    // yyyy-mm-dd
    const today = new Date().toISOString().slice(0, 10);
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
    );
    const json = await response.json();
    console.log(json.near_earth_objects[today]);
    if (json.error) {
      return new ApolloError(json.error.message);
    } else {
      return json;
    }
  }
};

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: { ...asteroids }
};
