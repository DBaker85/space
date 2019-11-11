import React, { FunctionComponent, useRef, useEffect } from 'react';
import { TweenMax } from 'gsap';

import styles from './ufos.module.scss';

import rocket2 from '../assets/images/rocket/color2.svg';

const Ufos: FunctionComponent = () => {
  const rocketEl = useRef(null);
  useEffect(() => {
    TweenMax.to(rocketEl.current as any, 5, { x: 10 });
  });

  return (
    <div className={styles['ufo-wrapper']}>
      <img src={rocket2} alt="" ref={rocketEl}></img>
    </div>
  );
};

export default Ufos;
