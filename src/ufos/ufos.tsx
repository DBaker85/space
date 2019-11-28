import React, { FunctionComponent, useRef, useEffect } from 'react';
import { random, MotionPathHelper } from 'gsap/all';
import gsap from 'gsap';
import Scanner from '../shared/scanner/scanner';

import styles from './ufos.module.scss';

import rocket2 from '../assets/images/rocket/color2.svg';
import rocket1 from '../assets/images/rocket/color.svg';
import flameIcon from '../assets/images/rocket/fire.svg';
import {
  analyticsEvent,
  eventActions,
  eventCategories
} from '../shared/analytics/events';

const Ufos: FunctionComponent = () => {
  const rocketEl = useRef(null);
  const rocketEl2 = useRef(null);
  const flameEl = useRef(null);
  const flameEl2 = useRef(null);

  const handleClick = () => {
    analyticsEvent({
      action: eventActions.clicked('rocket'),
      category: eventCategories.user
    });
  };

  useEffect(() => {
    //
    generateShipMotion(rocketEl);
    //   gsap.to(flameEl.current as any, 0.05, {
    //     x: '+=2',
    //     repeat: -1,
    //     yoyo: true
    //   });

    //   gsap.to(flameEl2.current as any, 0.05, {
    //     x: '+=2',
    //     repeat: -1,
    //     yoyo: true
    //   });
  });

  // Math.random() > 0.5 ? ship one, ship 2
  // function that randomly chooses between a ship.
  // random ship
  // random path up or down, left right is same 4 steps at 25% each
  // random timer

  const generateShipMotion = (element: any) => {
    let travelLength = 0;

    if (typeof window !== 'undefined') {
      travelLength = Math.round(window.innerWidth + 200);
    }
    gsap.set(element.current as any, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%'
    });
    gsap.to(element.current as any, {
      motionPath: {
        path: [
          { x: travelLength / 4, y: 0 },
          { x: travelLength / 3, y: 10 },
          {
            x: travelLength / 2,
            y: 0
          },
          { x: travelLength, y: -10 }
        ],
        autoRotate: 90,
        curviness: 2
      },
      ease: 'power1',

      duration: random(15, 20, 1),
      repeat: -1
    });
    MotionPathHelper.create(element.current);
  };

  return (
    <div className={styles['ufo-wrapper']}>
      <div
        className={`${styles['rocket-holder']} ${styles['type1']}`}
        ref={rocketEl}
        onClick={handleClick}
      >
        <Scanner startDelay={0} isVisible={true} />
        <img src={rocket2} className={styles['rocket']} alt=""></img>
        <img
          alt="flame"
          className={styles['flame']}
          ref={flameEl}
          src={flameIcon}
        ></img>
      </div>
      <div className={`${styles['rocket-holder']} ${styles['type2']}`}>
        <Scanner startDelay={0} isVisible={true} />
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
