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

type NetworkState = {
  icon: string;
  alt: string;
  hoverText: string;
};
const onlineStatus: NetworkState = {
  icon: onlineIcon,
  alt: 'Network status online',
  hoverText: 'You are connected to the internet'
};
const offlineStatus: NetworkState = {
  icon: offlineIcon,
  alt: 'Network status offline',
  hoverText: 'You not online'
};
const disconnectedStatus: NetworkState = {
  icon: noInternetIcon,
  alt: 'Network status no internet',
  hoverText: 'You online but do not have internet'
};

const NetworkStatus: FunctionComponent = () => {
  const isOnline = useOnlineToggle();
  const isConnected = useConnectedToggle();
  const [networkStatus, setNetworkStatus] = useState<NetworkState>(
    onlineStatus
  );

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
      setNetworkStatus(offlineStatus);
    }
    if (data && data.online && !data.connected) {
      setNetworkStatus(disconnectedStatus);
    }
    if (data && data.online && data.connected) {
      setNetworkStatus(onlineStatus);
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
          <img src={networkStatus.icon} alt={networkStatus.alt}></img>
        </div>
      </div>
      {networkStatus.hoverText}
    </div>
  );
};

export default NetworkStatus;
