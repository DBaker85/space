import { useApolloClient } from '@apollo/react-hooks';
import { Planet } from './models';

export const usePlanetState = () => {
  const client = useApolloClient();

  const updatePlanets = (planets: Planet[]) => {
    const typedPlanets = planets.map(planet => ({
      ...planet,
      ...{ __typename: 'Planet' }
    }));
    client.writeData({ data: { planets: typedPlanets } });
  };

  return updatePlanets;
};
