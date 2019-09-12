import { useApolloClient } from '@apollo/react-hooks';
const client = useApolloClient();

export const writeStarCache = (move: boolean) => {
  client.writeData({ data: { stars: { move, __typename: 'Star' } } });
};
