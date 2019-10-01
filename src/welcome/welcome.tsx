import React, { FunctionComponent, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { TimelineLite, TweenMax } from 'gsap';

import { useStarToggle } from '../apollo/stars/cacheOperations';

import rocketIcon from '../assets/images/rocket/bw.svg';
import rocketColorIcon from '../assets/images/rocket/color.svg';
import flameIcon from '../assets/images/rocket/fire.svg';

import styles from './welcome.module.scss';

interface WelcomeProps extends RouteComponentProps {}

const Welcome: FunctionComponent<WelcomeProps> = ({ history }) => {
  let bwRocketEl = useRef(null);
  let launchTextEl = useRef(null);
  let rocketEl = useRef(null);
  let flameEl = useRef(null);
  let launchButtonEl = useRef(null);

  const moveStars = useStarToggle();

  const launchTimeline = new TimelineLite({ paused: true });
  const arriveTimeline = new TimelineLite({ paused: true });

  useEffect(() => {
    TweenMax.to(flameEl.current as any, 0.05, {
      x: '+=4',
      repeat: -1,
      yoyo: true
    });

    TweenMax.to(rocketEl.current as any, 0.05, {
      x: '+=1',
      repeat: -1,
      yoyo: true
    });

    launchTimeline
      .set(flameEl.current as any, { rotation: 180 })
      // object, duration, actions, position in timeline in seconds
      .to(launchTextEl.current as any, 0.3, { opacity: 0 })
      .to(launchButtonEl.current as any, 1, { width: 80 }, 0.5)
      .to(
        launchTextEl.current as any,
        1,
        { width: 0, margin: 0, display: 'none' },
        0.5
      )
      .to(
        rocketEl.current as any,
        2,
        { rotation: -45, scale: 2, opacity: 1 },
        0.5
      )
      .to(
        bwRocketEl.current as any,
        2,
        { rotation: -45, scale: 2, opacity: 0 },
        0.5
      )
      .to(
        launchButtonEl.current as any,
        0.5,
        { backgroundColor: 'transparent' },
        1.5
      )
      .call(() => {
        moveStars(true);
        arriveTimeline.play();
      })
      .to(flameEl.current as any, 0.5, { height: 80 }, 2.5);

    arriveTimeline
      .to(rocketEl.current as any, 0.3, { y: 20 }, 1.7)
      .to(rocketEl.current as any, 1, { y: '-100vh' }, 2)
      .to(flameEl.current as any, 0.3, { y: 20 }, 1.7)
      .to(flameEl.current as any, 1, { y: '-100vh' }, 2)
      .call(() => moveStars(false), undefined, null, 2)
      .call(() => {
        history.push('/main');
      });
  });

  return (
    <div
      className={styles['launch-button']}
      ref={launchButtonEl}
      onClick={() => launchTimeline.play()}
    >
      <div ref={launchTextEl} className={styles['launch-text']}>
        Launch
      </div>
      <div className={styles['icon-holder']}>
        <img
          alt="Rocket Icon"
          className={styles['rocket']}
          ref={bwRocketEl}
          src={rocketIcon}
        />
        <img
          alt="Rocket Icon color"
          className={styles['rocket']}
          ref={rocketEl}
          src={rocketColorIcon}
        />

        <img
          alt="flame"
          className={styles['flame']}
          ref={flameEl}
          src={flameIcon}
        />
      </div>
    </div>
  );
};

export default Welcome;
