import { nearEarthObjectsQueries } from './resolvers/nearEarthObjects';

export const resolvers = {
  Query: { ...nearEarthObjectsQueries }
};
