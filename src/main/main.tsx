import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';

import Planet1 from '../icons/planets/planet-a-icon';
import Planet2 from '../icons/planets/planet-b-icon';
import { cssConstants as css } from '../shared/css-constants';

import styles from './main.module.scss';

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
        {Neos.map(neo => (
          <Planet1
            size={(
              neo.estimated_diameter.kilometers.estimated_diameter_min * 500
            ).toString()}
          />
        ))}
      </Fragment>
    );
  }
}

export default MainPage;
