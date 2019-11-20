import { useApolloClient } from '@apollo/react-hooks';
import { ContentType } from './models';

export const useContentState = () => {
  const client = useApolloClient();

  const activateContent = (active: boolean, type: ContentType) => {
    client.writeData({
      data: { content: { active, type, __typename: 'Content' } }
    });
  };

  return activateContent;
};
