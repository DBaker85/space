import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './loader.module.scss';
import { getRandomText } from './loading-texts';

const Loader: FunctionComponent = () => {
  const [loadingMsg, setLoadingMsg] = useState(getRandomText());

  let LoadingInterval: any;

  useEffect(() => {
    LoadingInterval = setInterval(() => {
      setLoadingMsg(getRandomText());
    }, 2000);
    return () => {
      if (LoadingInterval) {
        clearTimeout(LoadingInterval);
      }
    };
  }, []);

  return <div className={styles['loader']}>{loadingMsg}...</div>;
};

export default Loader;
