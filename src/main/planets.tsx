import React, { FunctionComponent, useRef, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { gsap, MotionPathPlugin, random } from 'gsap/all';

import { uid, randomNegative } from '../shared/utils/utils';
import { useContentState } from '../apollo/content/cacheOperations';

import Planet from './planet';
import styles from './planets.module.scss';
import Scanner from '../shared/scanner/scanner';

gsap.registerPlugin(MotionPathPlugin);

interface MainProps {
  scanDelay: number;
}

const Main: FunctionComponent<MainProps> = ({ scanDelay = 0 }) => {
  const { loading, error, data } = useQuery(gql`
    {
      planets @client {
        size
        orbit
        type
        color
        isLargest
      }
    }
  `) as any;

  const setContent = useContentState();

  let planets = useRef([]);
  let planetWrappers = useRef([]);
  let planetWrapperEL = useRef(null);
  // const zoomTimeline = gsap.timeline({ paused: true });

  // TODO: handle analytics
  const handleClick = (
    isLargest: boolean,
    planetIndex: number,
    size: number
  ) => {
    // if (isLargest) {
    //   zoomTimeline
    //     .to(planetWrappers.current as any, {
    //       scale: `1vh`,
    //       duration: 1
    //     })
    //     .to(planetWrappers.current[planetIndex] as any, {
    //       scale: `${100 / size}vh`,
    //       duration: 1
    //       // onComplete: ()=>{
    //       //   setZoomed(true)
    //       // }
    //     })
    //     .play();
    // }
    setContent(true, 'about');
  };
  useEffect(() => {
    // let floatAnimations: GSAPStatic.Tween[];
    if (data) {
      if (data.planets.length > 0) {
        planetWrappers.current = planetWrappers.current.slice(
          0,
          data.planets.length
        );
        planets.current = planets.current.slice(0, data.planets.length);

        // assign animations to array to allow for killing them if necessary
        planets.current.map(element => {
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
            duration: random(15, 20, 1),
            repeat: -1
          });
        });
      }
    }
    // cleanup
    // return () => {
    //   floatAnimations.forEach(animation => animation.kill());
    // };
  });

  if (loading) return null;
  if (error) return <p>Error...</p>;

  return data.planets.length > 0 ? (
    <Fragment>
      <div ref={planetWrapperEL} className={styles['planet-wrapper']}>
        {data.planets.map(
          (
            object: {
              size: number;
              orbit: number;
              isLargest: boolean;
              color: number;
              type: number;
            },
            index: number
          ) => {
            const rotation = randomNegative(Math.floor(Math.random() * 40));
            const inversedRotation =
              rotation < 0 ? Math.abs(rotation) : -rotation;
            return (
              <div
                ref={(el: any) => ((planetWrappers.current[index] as any) = el)}
                onClick={() =>
                  handleClick(object.isLargest, index, object.size)
                }
                style={{
                  transform: `translateX(${object.orbit}vw)`
                }}
                key={`planet-${uid(3)}`}
                className={styles['planets']}
              >
                <div
                  style={{
                    transform: `rotate(${rotation}deg)`
                  }}
                >
                  <Planet
                    size={object.size + 'vh'}
                    color={object.color}
                    type={object.size}
                    inputRef={(el: any) =>
                      ((planets.current[index] as any) = el)
                    }
                  />

                  <Scanner
                    startDelay={(scanDelay / data.planets.length) * index}
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
              </div>
            );
          }
        )}
      </div>
    </Fragment>
  ) : null;
};

export default Main;
