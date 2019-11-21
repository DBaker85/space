import { useApolloClient } from '@apollo/react-hooks';

export const useStarToggle = () => {
  const client = useApolloClient();

  const moveStars = (move: boolean) => {
    client.writeData({ data: { stars: { move, __typename: 'Star' } } });
  };

  return moveStars;
};
