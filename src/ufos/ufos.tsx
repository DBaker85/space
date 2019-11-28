import React, { FunctionComponent, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './ufos.module.scss';

import rocket2 from '../assets/images/rocket/color2.svg';
import rocket1 from '../assets/images/rocket/color.svg';
import flameIcon from '../assets/images/rocket/fire.svg';

const Ufos: FunctionComponent = () => {
  const rocketEl = useRef(null);
  const rocketEl2 = useRef(null);
  useEffect(() => {
    gsap.to([rocketEl.current as any, rocketEl2.current as any], 5, {
      bezier: {
        type: 'soft',
        values: [
          {
            x: () => Math.floor(Math.random() * 10),
            y: () => -Math.floor(Math.random() * 10)
          },
          { x: () => Math.floor(Math.random() * 20), y: 0 },
          {
            x: () => Math.floor(Math.random() * 10),
            y: () => Math.floor(Math.random() * 10)
          },
          { x: 0, y: 0 }
        ],
        autoRotate: true
      },
      ease: 'power0.inOut'
    });
  });

  return (
    <div className={styles['ufo-wrapper']}>
      <div>
        <img src={rocket2} alt="" ref={rocketEl}></img>
        <img alt="flame" className={styles['flame']} src={flameIcon} />
      </div>
      <div>
        <img src={rocket1} alt="" ref={rocketEl2}></img>
        <img alt="flame" className={styles['flame']} src={flameIcon} />
      </div>
    </div>
  );
};

export default Ufos;
