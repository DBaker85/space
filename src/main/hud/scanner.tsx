import React, {
  FunctionComponent,
  useRef,
  useEffect,
  MutableRefObject
} from 'react';
import { TweenMax, Power1 } from 'gsap';

import { random } from '../../shared/utils/utils';

import inner from '../../assets/images/hud/scanner-inner.svg';
import outer from '../../assets/images/hud/scanner-outer.svg';
import ring from '../../assets/images/hud/scanner-ring.svg';

import styles from './scanner.module.scss';

const Scanner: FunctionComponent = () => {
  const innerEl = useRef(null);
  const ringEl = useRef(null);
  const outerEl = useRef(null);

  let ringrotate = (ref: MutableRefObject<null>) =>
    TweenMax.to(ref.current as any, 1, {
      rotation: () => random(360),
      transformOrigin: '50%',
      ease: Power1.easeInOut,
      onComplete: () => {
        ringrotate(ref);
      }
    });

  useEffect(() => {
    ringrotate(ringEl);
  });

  return (
    <div className={styles['scanner']}>
      <img src={inner} alt="" />
      <img src={outer} alt="" />
      <img src={ring} alt="" ref={ringEl} />
    </div>
  );
};

export default Scanner;
