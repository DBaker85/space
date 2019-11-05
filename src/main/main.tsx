import React, { FunctionComponent, useRef, useEffect, Fragment } from 'react';
import { uid, randomNegative } from '../shared/utils/utils';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TimelineLite } from 'gsap';
// import Loadable from 'react-loadable';
import { usePlanetState } from '../apollo/planets/cacheOperations';

import Planet from './planet';
import styles from './main.module.scss';

const Planets: FunctionComponent = () => {
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

  let planets = useRef([]);
  let planetWrapperEL = useRef(null);
  let planetTimeline = new TimelineLite({ paused: true });

  const handleLargestClick = (isLargest: Boolean, planetIndex: number) =>
    console.log(isLargest, planets.current[planetIndex]);

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
          (
            object: { size: number; orbit: number; isLargest: Boolean },
            index: number
          ) => (
            <div
              ref={(el: any) => ((planets.current[index] as any) = el)}
              onClick={() => handleLargestClick(object.isLargest, index)}
              key={`planet-${uid(3)}`}
            >
              <Planet size={object.size + 'vh'} />
            </div>
          )
        )}
      </div>
      <div className={styles['cockpit']}></div>
    </Fragment>
  );
};

export default Planets;
