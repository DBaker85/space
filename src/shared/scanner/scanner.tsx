import React, {
  FunctionComponent,
  useRef,
  useEffect,
  MutableRefObject,
  useState
} from 'react';
import gsap from 'gsap';

import { random } from '../utils/utils';

import inner from '../../assets/images/hud/scanner-inner.svg';
import outer from '../../assets/images/hud/scanner-outer.svg';
import ring from '../../assets/images/hud/scanner-ring.svg';

import styles from './scanner.module.scss';

interface ScannerProps {
  startDelay: number;
  isVisible: boolean;
}

const Scanner: FunctionComponent<ScannerProps> = ({
  startDelay = 0,
  isVisible = false
}) => {
  let innerRingRotate: GSAPStatic.Tween;
  const innerEl = useRef(null);
  const ringEl = useRef(null);
  const wrapperEl = useRef(null);
  const scannerTimeline = gsap.timeline({ paused: true, delay: startDelay });

  const [show, setVisibility] = useState(true);

  const ringrotate = (ref: MutableRefObject<null>) =>
    gsap.to(ref.current as any, 1, {
      rotation: () => random(180),
      transformOrigin: '50%',
      ease: 'power1.inOut',
      onComplete: () => {
        ringrotate(ref);
      }
    });

  const initInnerRing = (ref: MutableRefObject<null>) => {
    innerRingRotate = gsap.fromTo(
      ref.current as any,
      5,
      {
        rotation: 0,
        transformOrigin: '50%',
        ease: 'power0.none'
      },
      {
        rotation: 360,
        transformOrigin: '50%',
        ease: 'power0.none',
        repeat: -1,
        paused: true
      }
    );
  };

  useEffect(() => {
    if (show) {
      scannerTimeline
        .from(wrapperEl.current as any, 0.5, {
          opacity: 0,
          scale: 0,
          ease: 'back.inOut'
        })
        .to(innerEl.current as any, 1, { rotation: 180 }, 1)
        .to(innerEl.current as any, 0.5, { scale: 1 }, 1)
        .to(innerEl.current as any, 1, { rotation: 0 }, 2)
        .to(
          innerEl.current as any,
          0.5,
          { opacity: 0, ease: 'back.inOut' },
          2.5
        )
        .call(() => {
          if (isVisible) {
            ringrotate(ringEl);
          } else {
            setVisibility(false);
          }
        })
        .play();

      initInnerRing(innerEl);
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
    </div>
  ) : null;
};

export default Scanner;
