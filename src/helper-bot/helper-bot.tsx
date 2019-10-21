import React, {
  FunctionComponent,
  useEffect,
  useRef,
  MutableRefObject
} from 'react';
import { TweenMax, TimelineMax, Power1 } from 'gsap';

import helperBot from '../assets/images/helper/robot.svg';
import reflection from '../assets/images/helper/robot-reflection.svg';
import styles from './helper-bot.module.scss';

const HelperBot: FunctionComponent = () => {
  let botContainer = useRef(null);
  let botChest = useRef(null);
  let botTimeline = new TimelineMax({ paused: true, repeat: -1 });

  let chestRotate = (ref: MutableRefObject<null>) =>
    TweenMax.to(ref.current as any, Math.random() * 2, {
      rotation: () => Math.random() * 200,
      transformOrigin: '50%',
      onComplete: () => {
        chestRotate(ref);
      }
    });

  useEffect(() => {
    chestRotate(botChest);
    botTimeline
      .to(
        botContainer.current as any,
        2,
        {
          x: 20,
          ease: Power1.easeInOut,
          transformOrigin: '50% 80%'
        },
        0
      )
      .to(
        botContainer.current as any,
        2,
        {
          x: 0,
          ease: Power1.easeInOut,
          transformOrigin: '50% 80%'
        },
        2
      )

      .play();
  });

  return (
    <div className={styles['bot-container']} ref={botContainer}>
      <img src={reflection} alt="" />
      <div className={styles['face']}>
        <div className={styles['l-eye']}></div>
        <div className={styles['r-eye']}></div>
        <div className={styles['mouth']}></div>
      </div>
      <div className={styles['chest']} ref={botChest}></div>
      <img src={helperBot} className={styles['bot']} alt="" />
    </div>
  );
};

export default HelperBot;
