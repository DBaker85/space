// const moJs: any = require("mo-js");

import {Burst, Timeline} from "mo-js"
import { constants } from "../shared/constants";

const burstEffect: any = new Burst({
  radius: { 0: 100 },
  count: 20,
  children: {
    shape: "cross",
    stroke: constants.colors.colorRed,
    strokeWidth: { 6: 0 },
    angle: { 360: 0 },
    duration: 3000,
    radius: { 30: 5 }
  }
});

const burstEffect2: any = new Burst({
    radius: { 0: 360 },
    count: 12,
    children: {
      shape: "zigzag",
      stroke: {"magenta": 'pink'},
      fill: 'none',
      points: 7,
      strokeWidth: { 6: 0 },
      angle: { '-360': 0 },
      duration: 3000,
      radius: { 30: 5 }
    }
  });

export const burst = new Timeline({
    repeat: 0
}).add(burstEffect, burstEffect2)