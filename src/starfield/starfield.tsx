import React, { FunctionComponent, useEffect, useState } from 'react';
import Particles from 'react-particles-js';
import clone from 'lodash.clonedeep';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import { cssConstants as css } from '../shared/constants';

import { toHex } from '../shared/utils/hsl';

// interactivity: {
//     detect_on: "canvas",
//     events: {
//       onhover: { enable: true, mode: "bubble" as "bubble" },
//       onclick: { enable: true, mode: "repulse" as "repulse" },
//       resize: true
//     },
//     modes: {
//       grab: { distance: 400, line_linked: { opacity: 1 } },
//       bubble: { distance: 200, size: 3, duration: 2, opacity: 1, speed: 3 },
//       repulse: { distance: 200, duration: 0.4 },
//       push: { particles_nb: 4 },
//       remove: { particles_nb: 2 }
//     }
//   },

const styles = {
  left: 0,
  top: 0,
  position: 'fixed' as 'fixed',
  zIndex: -1,
  background: `linear-gradient(${css.colors.colorBlack} , ${css.colors.colorBlueDark})`
};

const stars = {
  particles: {
    number: {
      value: 200,
      max: 250,
      density: { enable: true, value_area: 600 }
    },
    color: { value: toHex(css.colors.colorWhite) },
    shape: {
      type: 'circle' as 'circle',
      stroke: { width: 0, color: '#000000' },
      polygon: { nb_sides: 5 },
      image: { src: 'img/github.svg', width: 100, height: 100 }
    },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: false, speed: 4, size_min: 0.3, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none' as 'none',
      random: false,
      straight: false,
      out_mode: 'out' as 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 }
    }
  },
  retina_detect: true
};

const movingStars = clone(stars);

movingStars.particles.move = {
  ...movingStars.particles.move,
  ...{
    speed: 100,
    direction: 'bottom' as any,
    random: false,
    straight: true
  }
};

const Starfield: FunctionComponent = () => {
  const { data } = useQuery(gql`
    {
      stars @client {
        move
      }
    }
  `) as any;

  const [starConfig, setStarConfig] = useState(stars);

  useEffect(() => {
    if (data && data.stars.move) {
      setStarConfig(movingStars);
    }
    if (data && !data.stars.move) {
      setStarConfig(stars);
    }
  }, [data]);

  return (
    <div style={styles}>
      <Particles width="100vw" height="100vh" params={starConfig} />
    </div>
  );
};

export default Starfield;
