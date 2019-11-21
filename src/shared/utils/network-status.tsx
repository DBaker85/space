import { FunctionComponent, useEffect } from 'react';

import {
  useOnlineToggle,
  useConnectedToggle
} from '../../apollo/network/cacheOperations';

const NetworkStatus: FunctionComponent = () => {
  const isOnline = useOnlineToggle();
  const isConnected = useConnectedToggle();

  const checkNetwork = () => {
    const webPing = setInterval(() => {
      fetch('//google.com', {
        mode: 'no-cors'
      }).then(() => {
        isConnected(true);
        clearInterval(webPing);
      });
    }, 2000);
  };

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'offline') {
      isOnline(false);
      isConnected(false);
    }
    if (condition === 'online') {
      isOnline(true);
      checkNetwork();
    }
  };

  useEffect(() => {
    return function cleanup() {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  });

  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);

  return null;
};

export default NetworkStatus;
