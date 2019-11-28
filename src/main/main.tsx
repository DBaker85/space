import React, { FunctionComponent, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loadable from 'react-loadable';
import { gsap, MotionPathPlugin, random, MotionPathHelper } from 'gsap/all';

import { usePlanetState } from '../apollo/planets/cacheOperations';
import Planets from './planets';
import Hud from './hud/hud';
import Content from './content/content';

import { cssConstants as css } from '../shared/constants';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(MotionPathHelper);

// TODO: delegate to idlecallback
const LazyUfos = Loadable({
  loader: () => import('../ufos/ufos'),
  loading: () => null
});

const scanDelay = 2;

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
          orbit: random(1, 75, 1),
          orbit2: random(1, 75, 1),
          rotation: random(-40, 40, 1),
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
      {data && (
        <Fragment>
          {/* <Hud scanDelay={scanDelay} targets={1} /> */}
          <Planets scanDelay={scanDelay} />
        </Fragment>
      )}
      <Content />
    </Fragment>
  );
};

export default Main;
