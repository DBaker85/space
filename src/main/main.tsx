import React, { FunctionComponent, useRef, useEffect, Fragment } from 'react';
import { uid, randomNegative } from '../shared/utils/utils';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TimelineLite } from 'gsap';
import Loadable from 'react-loadable';

import Planet from './planet';
import styles from './main.module.scss';

import { usePlanetState } from '../apollo/planets/cacheOperations';

const LazyHelperBot = Loadable({
  loader: () => import('../helper-bot/helper-bot'),
  loading: () => null
});

const Planets: FunctionComponent = () => {
  const { loading, error, data } = useQuery(gql`
    {
      neo {
        elements
        objects {
          size
        }
      }
    }
  `) as any;

  const planetState = usePlanetState();

  let planets = useRef([]);
  let planetWrapperEL = useRef(null);
  let planetTimeline = new TimelineLite({ paused: true });

  useEffect(() => {
    if (data) {
      planets.current = planets.current.slice(0, data.neo.elements);
      planetState(data.neo.objects);
      planetTimeline
        .set(planets.current, {
          x: () => randomNegative(Math.floor(Math.random() * 40)) + 'vw',
          rotation: () => randomNegative(Math.floor(Math.random() * 40))
        })
        .set(planetWrapperEL.current as any, {
          scale: 0
        })
        .to(planetWrapperEL.current as any, 1, {
          scale: 1,
          opacity: 1
        })
        .play();
    }
  }, [data, planetState, planetTimeline]);

  if (loading) return null;
  if (error) return <p>Error...</p>;

  return (
    <Fragment>
      <div ref={planetWrapperEL} className={styles['planet-wrapper']}>
        {data.neo.objects.map(
          (object: { size: number; orbit: number }, index: number) => (
            <Planet
              size={object.size + 'vh'}
              inputRef={(el: any) => ((planets.current[index] as any) = el)}
              key={`planet-${uid(3)}`}
            />
          )
        )}
      </div>
      <LazyHelperBot />
    </Fragment>
  );
};

export default Planets;
