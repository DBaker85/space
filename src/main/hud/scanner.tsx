import React, { FunctionComponent } from 'react';

import inner from '../../assets/images/hud/scanner-inner.svg';
import outer from '../../assets/images/hud/scanner-outer.svg';
import ring from '../../assets/images/hud/scanner-ring.svg';

import styles from './scanner.module.scss';

const Scanner: FunctionComponent = () => {
  return (
    <div className={styles['scanner']}>
      <img src={inner} alt="" />
      <img src={outer} alt="" />
      <img src={ring} alt="" />
    </div>
  );
};

export default Scanner;
