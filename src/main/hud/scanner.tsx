import React, {
  FunctionComponent,
  useRef,
  useEffect,
  MutableRefObject,
  useState
} from 'react';
import { TweenMax, Power1, TimelineMax, Power0, Back } from 'gsap';

import { random } from '../../shared/utils/utils';

import inner from '../../assets/images/hud/scanner-inner.svg';
import outer from '../../assets/images/hud/scanner-outer.svg';
import ring from '../../assets/images/hud/scanner-ring.svg';

import styles from './scanner.module.scss';

interface ScannerProps {
  startDelay: number;
  isClickable: boolean;
}

const Scanner: FunctionComponent<ScannerProps> = ({
  startDelay = 0,
  isClickable = false
}) => {
  const innerEl = useRef(null);
  const ringEl = useRef(null);
  const outerEl = useRef(null);
  const wrapperEl = useRef(null);
  const scannerTimeline = new TimelineMax({ paused: true, delay: startDelay });

  let innerRingRotate: TweenMax;

  const [show, setVisibility] = useState(true);

  let ringrotate = (ref: MutableRefObject<null>) =>
    TweenMax.to(ref.current as any, 1, {
      rotation: () => random(180),
      transformOrigin: '50%',
      ease: Power1.easeInOut,
      onComplete: () => {
        ringrotate(ref);
      }
    });

  useEffect(() => {
    if (show) {
      scannerTimeline
        .from(wrapperEl.current as any, 0.5, {
          opacity: 0,
          scale: 0,
          ease: Back.easeInOut
        })
        .to(innerEl.current as any, 1, { rotation: 180 }, 1)
        .to(innerEl.current as any, 0.5, { scale: 1 }, 1)
        .to(innerEl.current as any, 1, { rotation: 0 }, 2)
        .to(
          innerEl.current as any,
          0.5,
          { opacity: 0, ease: Back.easeInOut },
          2.5
        )
        .call(() => {
          if (isClickable) {
            ringrotate(ringEl);
          } else {
            setVisibility(false);
          }
        })
        .play();

      innerRingRotate = TweenMax.fromTo(
        innerEl.current as any,
        5,
        {
          rotation: 0,
          transformOrigin: '50%',
          ease: Power0.easeInOut
        },
        {
          rotation: 360,
          transformOrigin: '50%',
          ease: Power0.easeInOut,
          repeat: -1,
          paused: true
        }
      );
    }
  });

  return show ? (
    <div
      className={styles['scanner']}
      ref={wrapperEl}
      onPointerEnter={() => innerRingRotate.play()}
      onPointerLeave={() => innerRingRotate.pause()}
    >
      <img className={styles['inner-ring']} src={inner} alt="" ref={innerEl} />
      <img src={outer} alt="" />
      <img src={ring} alt="" ref={ringEl} />
      <div className={styles['help-text']}></div>
    </div>
  ) : null;
};

export default Scanner;
