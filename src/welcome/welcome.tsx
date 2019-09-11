import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useApolloClient } from '@apollo/react-hooks';
import { TimelineLite, TweenMax } from 'gsap';

import RocketIcon from '../icons/rocket-icon';
import RocketColorIcon from '../icons/rocket-icon-color';
import { cssConstants } from '../shared/constants';
import flameIcon from '../assets/images/rocket/fire.svg';

import styles from './welcome.module.scss';

interface WelcomeProps extends RouteComponentProps {}

const Welcome: FunctionComponent<WelcomeProps> = ({ history }) => {
  let bwRocket: any;
  let launchText: any;
  let rocket: any;
  let flame: any;
  let launchButton: any;

  const client = useApolloClient();
  const launchTimeline = new TimelineLite({ paused: true });
  const arriveTimeline = new TimelineLite({ paused: true });

  useEffect(() => {
    TweenMax.to(flame, 0.05, {
      x: '+=4',
      repeat: -1,
      yoyo: true
    });

    TweenMax.to(rocket, 0.05, {
      x: '+=1',
      repeat: -1,
      yoyo: true
    });

    launchTimeline
      .set(flame, { rotation: 180 })
      // object, duration, actions, position in timeline in seconds
      .to(launchText, 0.3, { opacity: 0 })
      .to(launchButton, 1, { width: 80 }, 0.5)
      .to(launchText, 1, { width: 0, margin: 0, display: 'none' }, 0.5)
      .to(rocket, 2, { rotation: -45, scale: 2, opacity: 1 }, 0.5)
      .to(bwRocket, 2, { rotation: -45, scale: 2, opacity: 0 }, 0.5)
      .to(launchButton, 0.5, { backgroundColor: 'transparent' }, 1.5)
      // add shake and launch

      .call(() => {
        // if (toggleStars) {
        client.writeData({
          data: { stars: { move: true, __typename: 'Star' } }
        });
        arriveTimeline.play();
        // }
      })
      .to(flame, 0.5, { height: 80 }, 2.5);

    arriveTimeline
      .to(rocket, 0.3, { y: 20 }, 1.7)
      .to(rocket, 1, { y: '-100vh' }, 2)
      .to(flame, 0.3, { y: 20 }, 1.7)
      .to(flame, 1, { y: '-100vh' }, 2)
      .call(() =>
        client.writeData({
          data: { stars: { move: false, __typename: 'Star' } }
        })
      )
      .call(() => {
        history.push('/main');
      });
    // launch
  });

  return (
    <div
      className={styles['launch-button']}
      ref={(el: any) => (launchButton = el)}
      onClick={() => launchTimeline.play()}
    >
      <div
        ref={(el: any) => (launchText = el)}
        className={styles['launch-text']}
      >
        Launch
      </div>
      <div className={styles['icon-holder']}>
        <RocketIcon
          inputRef={(el: any) => (bwRocket = el)}
          color={cssConstants.colors.colorWhite}
        />

        <RocketColorIcon inputRef={(el: any) => (rocket = el)} />
        <img
          alt="flame"
          className={styles['flame']}
          ref={(el: any) => (flame = el)}
          src={flameIcon}
        />
      </div>
    </div>
  );
};

export default Welcome;
