import React, { FunctionComponent, useState, useEffect } from 'react';
import hudImg from '../../assets/images/hud/hud.svg';

interface HudProps {
  scanDelay: number;
  targets: number;
}

const Hud: FunctionComponent<HudProps> = ({ scanDelay, targets }) => {
  const [scanComplete, setScanComplete] = useState(false);

  setTimeout(() => {
    setScanComplete(true);
  }, scanDelay * 1000);

  return (
    <div>
      <div>
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
