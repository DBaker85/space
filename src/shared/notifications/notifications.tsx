import React, { FunctionComponent, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { cssConstants as css } from '../css-constants';

import offlineIcon from '../../assets/images/wifi/disconnected.png';
import onlineIcon from '../../assets/images/wifi/connected.png';
import noInternetIcon from '../../assets/images/wifi/no-internet.png';

import styles from './notifications.module.scss';

type NetworkState = {
  icon: string;
  alt: string;
  text: string;
  color: string;
  textColor: string;
};
const onlineStatus: NetworkState = {
  icon: onlineIcon,
  alt: 'Network status online',
  text: 'You are connected to the internet',
  color: css.colors.colorGreen,
  textColor: css.colors.colorWhite
};
const offlineStatus: NetworkState = {
  icon: offlineIcon,
  alt: 'Network status offline',
  text: 'You are offline',
  color: css.colors.colorRed,
  textColor: css.colors.colorWhite
};
const disconnectedStatus: NetworkState = {
  icon: noInternetIcon,
  alt: 'Network status no internet',
  text: 'You are online but do not have internet',
  color: css.colors.colorYellow,
  textColor: css.colors.colorBlack
};

const Notifications: FunctionComponent = () => {
  const [notification, showNotification] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<NetworkState>(
    onlineStatus
  );

  const { loading, error, data } = useQuery(gql`
    {
      online @client
      connected @client
    }
  `) as any;

  useEffect(() => {
    if (data && !data.online) {
      setNetworkStatus(offlineStatus);
      if (!notification) showNotification(true);
    }
    if (data && data.online && !data.connected) {
      setNetworkStatus(disconnectedStatus);
      if (!notification) showNotification(true);
    }
    if (data && data.online && data.connected) {
      setNetworkStatus(onlineStatus);
      setTimeout(() => showNotification(false), 5000);
    }
  }, [data, notification]);

  if (loading) return null;
  if (error) return null;

  if (notification) {
    return (
      <div className={styles['notification-wrapper']}>
        <div
          className={styles['notification']}
          style={{ backgroundColor: networkStatus.color }}
        >
          <img
            className={styles['network-icon']}
            src={networkStatus.icon}
            alt={networkStatus.alt}
          />
          <div className={styles['network-text']}>{networkStatus.text}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default Notifications;
