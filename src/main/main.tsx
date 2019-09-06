import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { uid } from '../shared/utils/utils';

import Planet1 from '../icons/planets/planet-a-icon';
import Planet2 from '../icons/planets/planet-b-icon';
import Planet3 from '../icons/planets/planet-c-icon';
import { cssConstants as css } from '../shared/css-constants';

const planet = (size: number) => {
  const color = Math.floor(Math.random() * css.planetColors.length);
  const planet = Math.floor(Math.random() * 3);
  console.log(color, css.planetColors[color]);
  switch (planet) {
    case 0:
      return (
        <Planet1
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 1:
      return (
        <Planet2
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
        />
      );
    case 2:
      return (
        <Planet3
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

interface MainPageProps extends RouteComponentProps {}

interface MainPageState {
  neos: {}[];
}

class MainPage extends Component<MainPageProps, MainPageState> {
  render() {
    return (
      <Fragment>
        {Neos.map(neo =>
          planet(neo.estimated_diameter.kilometers.estimated_diameter_max * 200)
        )}
      </Fragment>
    );
  }
}

export default MainPage;
