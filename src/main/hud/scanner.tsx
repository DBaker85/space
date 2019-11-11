import React, {
  FunctionComponent,
  useRef,
  useEffect,
  MutableRefObject,
  useState
} from 'react';
import { TweenMax, Power1, TimelineMax } from 'gsap';

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

  const [show, setVisibility] = useState(true);

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
    if (show) {
      scannerTimeline
        .from(wrapperEl.current as any, 1, { opacity: 0 })
        .call(() => {
          if (isClickable) {
            ringrotate(ringEl);
          } else {
            setVisibility(false);
          }
        })
        .play();
    }
  });

  return show ? (
    <div className={styles['scanner']} ref={wrapperEl}>
      <img src={inner} alt="" />
      <img src={outer} alt="" />
      <img src={ring} alt="" ref={ringEl} />
    </div>
  ) : null;
};

export default Scanner;
