import React, { FunctionComponent, useRef, useEffect, Fragment } from 'react';
import { uid, randomNegative } from '../shared/utils/utils';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loadable from 'react-loadable';
import { gsap, MotionPathPlugin, random } from 'gsap/all';

import { usePlanetState } from '../apollo/planets/cacheOperations';

import Planet from './planet';
import styles from './main.module.scss';
import Hud from './hud/hud';
import Scanner from '../shared/scanner/scanner';

gsap.registerPlugin(MotionPathPlugin);

// TODO: delegate to idlecallback
const LazyUfos = Loadable({
  loader: () => import('../ufos/ufos'),
  loading: () => null
});

const scanDelay = 4;

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
  let planetTimeline = gsap.timeline({ paused: true });

  // TODO: handle analytics
  const handleLargestClick = (isLargest: boolean, planetIndex: number) =>
    console.log(isLargest, planetWrappers.current[planetIndex]);

  useEffect(() => {
    let floatAnimations: GSAPStatic.Tween[];
    if (data) {
      planetWrappers.current = planetWrappers.current.slice(
        0,
        data.neo.elements
      );
      planets.current = planets.current.slice(0, data.neo.elements);
      planetState(data.neo.objects);
      planetTimeline
        .set(planetWrappers.current, {
          x: () => randomNegative(Math.floor(Math.random() * 40)) + 'vw'
        })
        .set(planetWrapperEL.current as any, {
          scale: 0
        })
        .to(planetWrapperEL.current as any, 1, {
          scale: 1,
          opacity: 1
        })
        .play();

      // assign animations to array to allow for killing them if necessary
      floatAnimations = planets.current.map(element => {
        const randomX = random(5, 10, 1);
        const randomY = random(10, 20, 1);
        return gsap.to(element, {
          motionPath: {
            path: [
              { x: randomX, y: randomX },
              { x: randomY, y: 0 },
              {
                x: randomX,
                y: -randomX
              },
              { x: 0, y: 0 }
            ]
          },
          ease: 'none',
          immediateRender: true,
          duration: random(15, 20, 1),
          repeat: -1
        });
      });
    }
    // cleanup
    return () => {
      floatAnimations.forEach(animation => animation.kill());
    };
  }, [data, planetState, planetTimeline]);

  if (loading) return null;
  if (error) return <p>Error...</p>;

  return (
    <Fragment>
      <LazyUfos />
      <Hud scanDelay={scanDelay} targets={1} />
      <div ref={planetWrapperEL} className={styles['planet-wrapper']}>
        {data.neo.objects.map(
          (
            object: { size: number; orbit: number; isLargest: boolean },
            index: number
          ) => {
            const rotation = randomNegative(Math.floor(Math.random() * 40));
            const inversedRotation =
              rotation < 0 ? Math.abs(rotation) : -rotation;
            return (
              <div
                ref={(el: any) => ((planetWrappers.current[index] as any) = el)}
                onClick={() => handleLargestClick(object.isLargest, index)}
                style={{ transform: `rotate(${rotation}deg)` }}
                key={`planet-${uid(3)}`}
                className={styles['planets']}
              >
                <Planet
                  size={object.size + 'vh'}
                  inputRef={(el: any) => ((planets.current[index] as any) = el)}
                />
                <Scanner
                  startDelay={(scanDelay / data.neo.elements) * index}
                  isVisible={object.isLargest}
                />
                {object.isLargest && (
                  <div
                    className={styles['help-text']}
                    style={{ transform: `rotate(${inversedRotation}deg)` }}
                  >
                    About me
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </Fragment>
  );
};

export default Planets;
