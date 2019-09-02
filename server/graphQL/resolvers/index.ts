import { ApolloError } from 'apollo-server-express';
import fetch from 'node-fetch';

const asteroids = {
  neo: async () => {
    const response = await fetch(
      'https://api.nasa.gov/neo/rest/v1/feed/today?detailed=false&api_key=DEMO_KEY'
    );
    const json = await response.json();
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
