import React, { FunctionComponent, useRef, useEffect } from 'react';
// import { TweenMax } from 'gsap';

import styles from './ufos.module.scss';

import rocket2 from '../assets/images/rocket/color2.svg';

const Ufos: FunctionComponent = () => {
  const rocketEl = useRef(null);
  useEffect(() => {
    // TweenMax.to(rocketEl.current as any, 5, {
    //   bezier: {
    //     type: 'soft',
    //     values: [
    //       {
    //         x: () => Math.floor(Math.random() * 10),
    //         y: () => -Math.floor(Math.random() * 10)
    //       },
    //       { x: () => Math.floor(Math.random() * 20), y: 0 },
    //       {
    //         x: () => Math.floor(Math.random() * 10),
    //         y: () => Math.floor(Math.random() * 10)
    //       },
    //       { x: 0, y: 0 }
    //     ],
    //     autoRotate: true
    //   },
    //   ease: "power0.inOut"
    // });
  });

  return (
    <div className={styles['ufo-wrapper']}>
      <img src={rocket2} alt="" ref={rocketEl}></img>
    </div>
  );
};

export default Ufos;
