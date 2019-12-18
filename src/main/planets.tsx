import React, { FunctionComponent, useRef, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  gsap,
  MotionPathPlugin,
  random,
  Draggable,
  InertiaPlugin
} from 'gsap/all';
import { uid } from '../shared/utils/utils';
import { useContentState } from '../apollo/content/cacheOperations';
import {
  analyticsEvent,
  eventCategories,
  eventActions
} from '../shared/analytics/events';

import Planet from './planet';
import styles from './planets.module.scss';
import Scanner from '../shared/scanner/scanner';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);

interface MainProps {
  scanDelay: number;
}

const Main: FunctionComponent<MainProps> = ({ scanDelay = 0 }) => {
  const { loading, error, data } = useQuery(gql`
    {
      planets @client {
        size
        orbit
        orbit2
        rotation
        type
        color
      }
    }
  `) as any;

  const setContent = useContentState();

  let planets = useRef([]);
  let planetWrappers = useRef([]);
  let planetWrapperEL = useRef(null);

  const handleClick = (
    planetIndex: number,
    size: number,
    planetCount: number
  ) => {
    // TODO: easter eggs
    switch (planetIndex) {
      case 0:
        analyticsEvent({
          category: eventCategories.user,
          action: eventActions.clicked('about me')
        });
        setContent(true, 'about');
        break;
      case 1:
        analyticsEvent({
          category: eventCategories.user,
          action: eventActions.clicked('tech')
        });
        setContent(true, 'tech');
        break;
      default:
        analyticsEvent({
          category: eventCategories.user,
          action: eventActions.clicked(
            `planet ${planetIndex} of ${planetCount}`
          )
        });
        break;
    }
  };

  const handleDrag = (planetIndex: number, planetCount: number) => {
    analyticsEvent({
      category: eventCategories.user,
      action: eventActions.dragged(`planet ${planetIndex} of ${planetCount}`)
    });
  };

  useEffect(() => {
    let floatAnimations: GSAPTween[];
    if (data) {
      if (data.planets.length > 0) {
        planetWrappers.current = planetWrappers.current.slice(
          0,
          data.planets.length
        );
        planets.current = planets.current.slice(0, data.planets.length);
        planetWrappers.current.map((element, index) => {
          Draggable.create(element, {
            bounds: planetWrapperEL.current,
            inertia: true,
            onDragEnd: () => handleDrag(index, data.planets.length)
          });
        });
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
    return () => {
      if (floatAnimations && floatAnimations.length > 0) {
        floatAnimations.forEach(animation => animation.kill());
      }
    };
  });

  if (loading) return null;
  if (error) return <p>Error...</p>;

  return data.planets.length > 0 ? (
    <Fragment>
      <div
        ref={planetWrapperEL}
        id="container"
        className={styles['planet-wrapper']}
      >
        {data.planets.map(
          (
            object: {
              size: number;
              orbit: number;
              orbit2: number;
              rotation: number;
              isLargest: boolean;
              color: number;
              type: number;
            },
            index: number
          ) => {
            const inversedRotation =
              object.rotation < 0
                ? Math.abs(object.rotation)
                : -object.rotation;
            return (
              <div
                ref={(el: any) => ((planetWrappers.current[index] as any) = el)}
                onClick={() =>
                  handleClick(index, object.size, data.planets.length)
                }
                style={{
                  left: `${object.orbit}vw`,
                  top: `${object.orbit2}vh`,
                  zIndex: index <= 1 ? 10 : 2
                }}
                key={`planet-${uid(3)}`}
                className={styles['planets']}
              >
                <div
                  style={{
                    transform: `rotate(${object.rotation}deg)`
                  }}
                >
                  <Planet
                    size={object.size + 'vh'}
                    color={object.color}
                    type={object.type}
                    inputRef={(el: any) =>
                      ((planets.current[index] as any) = el)
                    }
                  />

                  <Scanner
                    startDelay={(scanDelay / data.planets.length) * index}
                    isVisible={index <= 1}
                  />

                  {index === 0 && (
                    <div
                      className={styles['help-text']}
                      style={{ transform: `rotate(${inversedRotation}deg)` }}
                    >
                      About me
                    </div>
                  )}
                  {index === 1 && (
                    <div
                      className={styles['help-text']}
                      style={{ transform: `rotate(${inversedRotation}deg)` }}
                    >
                      About this site
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
