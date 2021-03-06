import React, { FunctionComponent, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { MotionPathPlugin, gsap } from 'gsap/all';

import Button from '../shared/elements/button';
import styles from './notFoundPage.module.scss';

import rocketColorIcon from '../assets/images/rocket/color.svg';
import {
  analyticsEvent,
  eventActions,
  eventCategories
} from '../shared/analytics/events';

interface NotFoundProps extends RouteComponentProps {}

gsap.registerPlugin(MotionPathPlugin);
const NotFoundPage: FunctionComponent<NotFoundProps> = ({
  location,
  history
}) => {
  const rocketEl = useRef(null);

  const handleClick = () => {
    analyticsEvent({
      action: eventActions.clicked('404 - Back home button'),
      category: eventCategories.user
    });
    history.push('/main');
  };

  useEffect(() => {
    gsap.to(rocketEl.current as any, {
      motionPath: {
        path: [
          { x: 5, y: 5 },
          { x: 10, y: 0 },
          {
            x: 5,
            y: -5
          },
          { x: 0, y: 0 }
        ]
      },

      ease: 'none',
      duration: 8,
      repeat: -1
    });
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div>
        <h1>Oops!</h1>
        <p>
          Looks like we got lost in the{' '}
          <span className="text-title">
            {location.pathname.replace('/', '')}
          </span>{' '}
          sector
        </p>
        <Button type="normal" onClick={handleClick}>
          Back to the main sector
        </Button>
      </div>
      <div>
        <img
          alt="Rocket Icon color"
          className={styles['rocket']}
          src={rocketColorIcon}
          ref={rocketEl}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
