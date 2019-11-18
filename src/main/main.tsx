import React, { FunctionComponent, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loadable from 'react-loadable';
import { gsap, MotionPathPlugin, random } from 'gsap/all';

import { usePlanetState } from '../apollo/planets/cacheOperations';
import Planets from './planets';
import { cssConstants as css } from '../shared/constants';

gsap.registerPlugin(MotionPathPlugin);

// TODO: delegate to idlecallback
const LazyUfos = Loadable({
  loader: () => import('../ufos/ufos'),
  loading: () => null
});

const scanDelay = 4;

const Main: FunctionComponent = () => {
  const { loading, error, data } = useQuery(gql`
    {
      neo {
        elements
        objects {
          size
          isLargest
        }
      }
    }
  `) as any;

  const planetState = usePlanetState();

  useEffect(() => {
    if (data) {
      const mappedPlanets = data.neo.objects.map((object: any) => ({
        ...object,
        ...{
          orbit: `${random(-40, 40, 1)}vw`,
          type: random(0, 8, 1),
          color: random(0, css.planetColors.length - 1, 1)
        }
      }));
      planetState(mappedPlanets);
    }
  });

  if (loading) return null;
  if (error) return <p>Error...</p>;

  return (
    <Fragment>
      <LazyUfos />
      {data && <Planets scanDelay={scanDelay} />}
    </Fragment>
  );
};

export default Main;
