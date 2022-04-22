import { nearEarthObjectsQueries } from "./nearEarthObjects/resolvers";
import { weatherQueries } from "./weather/resolvers";

export const resolvers = { ...nearEarthObjectsQueries, ...weatherQueries };
