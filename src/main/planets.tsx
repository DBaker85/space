import React, {
  FunctionComponent,
  useRef,
  useEffect,
  Fragment,
  useState
} from 'react';
import { uid, randomNegative } from '../shared/utils/utils';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { gsap, MotionPathPlugin, random } from 'gsap/all';

import Planet from './planet';
import styles from './planets.module.scss';
import Scanner from '../shared/scanner/scanner';
import AboutME from './about-me/about-me';

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

  let planets = useRef([]);
  let planetWrappers = useRef([]);
  let planetWrapperEL = useRef(null);

  const [zoomed, setZoomed] = useState(false);

  // TODO: handle analytics
  const handleLargestClick = (isLargest: boolean, planetIndex: number) =>
    isLargest ? setZoomed(true) : null;

  useEffect(() => {
    // let floatAnimations: GSAPStatic.Tween[];
    if (data) {
      console.log('any data', data);
      if (data.planets.length > 0) {
        console.log('planets', data);
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
            immediateRender: true,
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
                onClick={() => handleLargestClick(object.isLargest, index)}
                style={{
                  transform: `translateX(${object.orbit})`
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
        {/* TODO popup text, zoom planet animation, overlay, reomve scanners */}
        {zoomed && <AboutME />}
      </div>
    </Fragment>
  ) : null;
};

export default Main;
