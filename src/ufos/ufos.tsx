import React, { FunctionComponent, useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './ufos.module.scss';

import rocket2 from '../assets/images/rocket/color2.svg';
import rocket1 from '../assets/images/rocket/color.svg';
import flameIcon from '../assets/images/rocket/fire.svg';

const Ufos: FunctionComponent = () => {
  const rocketEl = useRef(null);
  const rocketEl2 = useRef(null);
  const flameEl = useRef(null);
  const flameEl2 = useRef(null);

  useEffect(() => {
    // gsap.to([rocketEl.current as any, rocketEl2.current as any], 5, {
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
    //   ease: 'power0.inOut'
    // });

    gsap.to(flameEl.current as any, 0.05, {
      x: '+=2',
      repeat: -1,
      yoyo: true
    });

    gsap.to(flameEl2.current as any, 0.05, {
      x: '+=2',
      repeat: -1,
      yoyo: true
    });
  });

  return (
    <div className={styles['ufo-wrapper']}>
      <div className={`${styles['rocket-holder']} ${styles['type1']}`}>
        <img
          src={rocket2}
          className={styles['rocket']}
          alt=""
          ref={rocketEl}
        ></img>
        <img
          alt="flame"
          className={styles['flame']}
          ref={flameEl}
          src={flameIcon}
        ></img>
      </div>
      <div className={`${styles['rocket-holder']} ${styles['type2']}`}>
        <img
          src={rocket1}
          alt=""
          className={styles['rocket']}
          ref={rocketEl2}
        ></img>
        <img
          alt="flame"
          className={styles['flame']}
          ref={flameEl2}
          src={flameIcon}
        />
      </div>
    </div>
  );
};

export default Ufos;
