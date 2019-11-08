import React, { FunctionComponent } from 'react';
import styles from './loader.module.scss';

// TODO: Add cool text to give user something to read
const Loader: FunctionComponent = () => {
  return (
    <div className={styles['loader']}>
      <div className={styles['circle-wrapper']}>
        <div className={styles['circle-top']}></div>
        <div className={styles['circle-right']}></div>
        <div className={styles['circle-bottom']}></div>
        <div className={styles['circle-left']}></div>
      </div>
    </div>
  );
};

export default Loader;
