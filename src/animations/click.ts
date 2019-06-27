// const moJs: any = require("mo-js");

import { Burst, Timeline } from 'mo-js';
import { cssConstants as css } from '../shared/constants';

const burstEffect: any = new Burst({
  left: 0,
  top: 0,
  radius: { 0: 100 },
  count: 20,
  children: {
    shape: 'cross',
    stroke: css.colors.colorRed,
    strokeWidth: { 6: 0 },
    angle: { 360: 0 },
    duration: 1000,
    radius: { 30: 5 }
  }
});

const burstEffect2: any = new Burst({
  left: 0,
  top: 0,
  radius: { 0: 360 },
  count: 12,
  children: {
    shape: 'zigzag',
    stroke: { [css.colors.colorYellow]: [css.colors.colorRed] },
    fill: 'none',
    points: 7,
    strokeWidth: { 6: 0 },
    angle: { '-360': 0 },
    duration: 800,
    radius: { 30: 5 }
  }
});

export const burst = (e: any, cb: any) => {
  const burstTime = new Timeline({
    onPlaybackComplete: () => cb()
  });
  return burstTime
    .add(
      burstEffect.tune({ x: e.pageX, y: e.pageY }),
      burstEffect2.tune({ x: e.pageX, y: e.pageY })
    )
    .replay();
};
