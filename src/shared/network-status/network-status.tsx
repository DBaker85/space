import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import {
  useOnlineToggle,
  useConnectedToggle
} from '../../apollo/network/cacheOperations';

import offlineIcon from '../../assets/images/wifi/disconnected.png';
import onlineIcon from '../../assets/images/wifi/connected.png';
import noInternetIcon from '../../assets/images/wifi/no-internet.png';

const NetworkDetector: FunctionComponent = () => {
  const isOnline = useOnlineToggle();
  const isConnected = useConnectedToggle();
  const [statusIcon, setStatusIcon] = useState(onlineIcon);

  const { data } = useQuery(gql`
    {
      online @client
      connected @client
    }
  `) as any;

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

  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);

  useEffect(() => {
    if (data && !data.online) {
      setStatusIcon(offlineIcon);
    }
    if (data && data.online && !data.connected) {
      setStatusIcon(noInternetIcon);
    }
    if (data && data.online && data.connected) {
      setStatusIcon(onlineIcon);
    }
  }, [data]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <div>
        <div>
          <img src={statusIcon} alt="Wifi status"></img>
        </div>
      </div>
      hover help text
    </div>
  );
};

export default NetworkDetector;
