import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './loader.module.scss';
import { loadingText } from './loading-texts';

const Loader: FunctionComponent = () => {
  const [loadingMsg, setLoadingMsg] = useState(
    loadingText[Math.floor(Math.random() * loadingText.length)]
  );

  let LoadingInterval: any;

  useEffect(() => {
    LoadingInterval = setInterval(() => {
      setLoadingMsg(
        loadingText[Math.floor(Math.random() * loadingText.length)]
      );
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
