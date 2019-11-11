import React, { FunctionComponent, useRef, useEffect, Fragment } from 'react';
import { uid, randomNegative } from '../shared/utils/utils';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TimelineLite, Power0, TweenMax } from 'gsap';
import Loadable from 'react-loadable';
import { usePlanetState } from '../apollo/planets/cacheOperations';

import Planet from './planet';
import styles from './main.module.scss';
import Hud from './hud/hud';
import Scanner from './hud/scanner';

// TODO: delegate to idlecallback
const LazyUfos = Loadable({
  loader: () => import('../ufos/ufos'),
  loading: () => null
});

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
  let planetWrappers = useRef([]);
  let planetWrapperEL = useRef(null);
  let planetTimeline = new TimelineLite({ paused: true });

  const handleLargestClick = (isLargest: Boolean, planetIndex: number) =>
    console.log(isLargest, planetWrappers.current[planetIndex]);

  useEffect(() => {
    if (data) {
      planetWrappers.current = planetWrappers.current.slice(
        0,
        data.neo.elements
      );
      planets.current = planets.current.slice(0, data.neo.elements);
      planetState(data.neo.objects);
      planetTimeline
        .set(planetWrappers.current, {
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

      TweenMax.to(planets.current, 5, {
        bezier: {
          type: 'soft',
          values: [
            {
              x: () => Math.floor(Math.random() * 10),
              y: () => -Math.floor(Math.random() * 10)
            },
            { x: () => Math.floor(Math.random() * 20), y: 0 },
            {
              x: () => Math.floor(Math.random() * 10),
              y: () => Math.floor(Math.random() * 10)
            },
            { x: 0, y: 0 }
          ],
          autoRotate: false
        },
        ease: Power0.easeInOut,
        repeat: -1
      });
    }
  }, [data, planetState, planetTimeline]);

  if (loading) return null;
  if (error) return <p>Error...</p>;

  return (
    <Fragment>
      {/* <Hud/> */}
      <div ref={planetWrapperEL} className={styles['planet-wrapper']}>
        {data.neo.objects.map(
          (
            object: { size: number; orbit: number; isLargest: Boolean },
            index: number
          ) => (
            <div
              ref={(el: any) => ((planetWrappers.current[index] as any) = el)}
              onClick={() => handleLargestClick(object.isLargest, index)}
              key={`planet-${uid(3)}`}
            >
              <Planet
                size={object.size + 'vh'}
                inputRef={(el: any) => ((planets.current[index] as any) = el)}
              />
              {object.isLargest && <Scanner />}
            </div>
          )
        )}
      </div>
      {/* <LazyUfos /> */}
    </Fragment>
  );
};

export default Planets;
