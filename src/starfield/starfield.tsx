import React, { FunctionComponent } from 'react';
import Particles from 'react-particles-js';
import clone from 'lodash.clonedeep';
import { cssConstants as css } from '../shared/constants';
import { connect } from 'react-redux';
import { RootState } from '../redux';
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
  position: 'fixed',
  zIndex: -1
};

const stars = {
  particles: {
    number: {
      value: 200,
      max: 250,
      density: { enable: true, value_area: 600 }
    },
    color: { value: css.colors.colorWhite },
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

interface StarfieldProps {
  move?: boolean;
}

const Starfield: FunctionComponent<StarfieldProps> = ({ move }) => {
  let starConfig = stars;
  if (move) {
    starConfig = movingStars;
  }
  return (
    <Particles
      width="100vw"
      height="100vh"
      style={styles}
      params={starConfig}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  move: state.stars.move
});

export default connect(mapStateToProps)(Starfield);
