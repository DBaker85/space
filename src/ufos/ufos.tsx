import React, { FunctionComponent, useRef, useEffect } from 'react';
import { random } from 'gsap/all';
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

interface UfoProps {
  delay: number;
}

const Ufos: FunctionComponent<UfoProps> = ({ delay = 0 }) => {
  const rocketEl = useRef(null);
  const rocketEl2 = useRef(null);
  const flameEl = useRef(null);
  const flameEl2 = useRef(null);

  let activeFlameAnim: GSAPStatic.Tween;
  let activeRocketAnim: GSAPStatic.Tween;

  const handleClick = (type: number) => {
    console.log(`clicked rocket ${type}`);
    analyticsEvent({
      action: eventActions.clicked(`rocket ${type}`),
      category: eventCategories.user
    });
  };

  useEffect(() => {
    setTimeout(
      () => generateShipMotion(random(1, 2, 1)),
      delay * 1000 + random(5000, 8000, 500)
    );
  });

  const generateShipMotion = (type: number) => {
    console.log('motion', type);
    let travelLength = 0;
    let travelHeight = 0;
    let element;
    let flame;

    if (type === 2) {
      element = rocketEl2;
      flame = flameEl2;
    } else {
      element = rocketEl;
      flame = flameEl;
    }

    if (typeof window !== 'undefined') {
      travelLength = Math.round(window.innerWidth + 100);
      travelHeight = Math.round(window.innerHeight) / 2;
    }
    activeFlameAnim = gsap.to(flame.current as any, 0.05, {
      x: '+=2',
      repeat: -1,
      yoyo: true
    });
    gsap.set(element.current as any, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%',
      x: 0,
      y: 0,
      opacity: 1
    });
    activeRocketAnim = gsap.to(element.current as any, {
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
      repeat: 0,
      duration: random(15, 20, 1),
      onComplete: () => {
        activeFlameAnim.kill();
        activeRocketAnim.kill();
        setTimeout(
          () => generateShipMotion(random(1, 2, 1)),
          random(6000, 10000, 500)
        );
      }
    });
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
        ref={rocketEl2}
      >
        <img src={rocket1} alt="" className={styles['rocket']}></img>
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
