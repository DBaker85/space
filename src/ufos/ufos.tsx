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

  const handleClick = (type: number) => {
    console.log(`clicked rocket ${type}`);
    analyticsEvent({
      action: eventActions.clicked(`rocket ${type}`),
      category: eventCategories.user
    });
  };

  useEffect(() => {
    generateShipMotion(rocketEl);
  });

  const generateShipMotion = (element: any) => {
    let travelLength = 0;
    let travelHeight = 0;

    if (typeof window !== 'undefined') {
      travelLength = Math.round(window.innerWidth + 100);
      travelHeight = Math.round(window.innerHeight) / 2;
    }
    gsap.set(element.current as any, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%'
    });
    gsap.to(element.current as any, {
      motionPath: {
        path: [
          {
            x: travelLength,
            y: random(-travelHeight / 2, travelHeight / 2, 1)
          },
          { x: travelLength, y: random(-travelHeight, travelHeight, 1) }
        ],
        autoRotate: 90,
        curviness: 1
      },
      ease: 'power1',

      duration: random(15, 20, 1)
    });
    // FIXME: remove this
    MotionPathHelper.create(element.current);
  };

  return (
    <div className={styles['ufo-wrapper']}>
      <div
        className={`${styles['rocket-holder']} ${styles['type1']}`}
        ref={rocketEl}
        onClick={() => handleClick(1)}
      >
        <img src={rocket2} className={styles['rocket']} alt=""></img>
        <img
          alt="flame"
          className={styles['flame']}
          ref={flameEl}
          src={flameIcon}
        ></img>
        <Scanner startDelay={0} isVisible={true} />
      </div>
      <div
        className={`${styles['rocket-holder']} ${styles['type2']}`}
        onClick={() => handleClick(2)}
      >
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
        <Scanner startDelay={0} isVisible={true} />
      </div>
    </div>
  );
};

export default Ufos;
