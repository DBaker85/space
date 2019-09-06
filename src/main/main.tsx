import React, { FunctionComponent, Fragment } from 'react';
import { uid } from '../shared/utils/utils';

import Planet0 from '../icons/planets/planet-a-icon';
import Planet1 from '../icons/planets/planet-b-icon';
import Planet2 from '../icons/planets/planet-c-icon';
import Planet3 from '../icons/planets/planet-d-icon';
import Planet4 from '../icons/planets/planet-e-icon';
import Planet5 from '../icons/planets/planet-f-icon';
import Planet6 from '../icons/planets/planet-g-icon';
import Planet7 from '../icons/planets/planet-h-icon';
import Planet8 from '../icons/planets/planet-i-icon';

import { cssConstants as css } from '../shared/css-constants';

const planet = (size: number) => {
  const color = Math.floor(Math.random() * css.planetColors.length);
  const planet = Math.floor(Math.random() * 9);

  switch (planet) {
    case 0:
      return (
        <Planet0
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 1:
      return (
        <Planet1
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 2:
      return (
        <Planet2
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 3:
      return (
        <Planet3
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 4:
      return (
        <Planet4
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 5:
      return (
        <Planet5
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 6:
      return (
        <Planet6
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 7:
      return (
        <Planet7
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 8:
      return (
        <Planet8
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    default:
      break;
  }
};

// import styles from './main.module.scss';

const Neos = [
  {
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.0399167319,
        estimated_diameter_max: 0.0892565259
      }
    }
  },
  {
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.0366906138,
        estimated_diameter_max: 0.0820427065
      }
    }
  },
  {
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.3503926411,
        estimated_diameter_max: 0.7835017643
      }
    }
  },
  {
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.0211132445,
        estimated_diameter_max: 0.0472106499
      }
    }
  },
  {
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.3669061375,
        estimated_diameter_max: 0.8204270649
      }
    }
  },
  {
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: 0.0476820563,
        estimated_diameter_max: 0.1066203193
      }
    }
  }
];

const Planets: FunctionComponent = () => {
  return <Fragment>{Neos.map(neo => planet(200))}</Fragment>;
};

export default Planets;
