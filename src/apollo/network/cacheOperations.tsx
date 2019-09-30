import { useApolloClient } from '@apollo/react-hooks';

export const useOnlineToggle = () => {
  const client = useApolloClient();

  const setOnlineStatus = (online: boolean) => {
    client.writeData({ data: { online } });
  };

  return setOnlineStatus;
};

export const useConnectedToggle = () => {
  const client = useApolloClient();

  const setConnectedStatus = (connected: boolean) => {
    client.writeData({ data: { connected } });
  };

  return setConnectedStatus;
};
