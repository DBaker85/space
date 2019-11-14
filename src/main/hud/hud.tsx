import React, { FunctionComponent, useState } from 'react';

import hudImg from '../../assets/images/hud/hud.svg';
import styles from './hud.module.scss';

interface HudProps {
  scanDelay: number;
  targets: number;
}

const Hud: FunctionComponent<HudProps> = ({ scanDelay, targets }) => {
  const [scanComplete, setScanComplete] = useState(false);

  setTimeout(() => {
    setScanComplete(true);
  }, (scanDelay + 2) * 1000);

  return (
    <div className={styles['hud']}>
      <div className={styles['upper-hud']}>
        <img src={hudImg} alt="" />
        <span>
          {scanComplete
            ? `found ${targets} target${targets === 1 ? '' : 's'}`
            : `Scanning Targets`}
        </span>
      </div>
    </div>
  );
};

export default Hud;
