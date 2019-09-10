import React, { FunctionComponent, Fragment, useRef, useEffect } from 'react';
import { uid } from '../shared/utils/utils';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TweenMax, Linear } from 'gsap';

import styles from './main.module.scss';

import Planet0 from '../icons/planets/planet-a-icon';
import Planet1 from '../icons/planets/planet-b-icon';
import Planet2 from '../icons/planets/planet-c-icon';
import Planet3 from '../icons/planets/planet-d-icon';
import Planet4 from '../icons/planets/planet-e-icon';
import Planet5 from '../icons/planets/planet-f-icon';
import Planet6 from '../icons/planets/planet-g-icon';
import Planet7 from '../icons/planets/planet-h-icon';
import Planet8 from '../icons/planets/planet-i-icon';

import { cssConstants as css } from '../shared/css-constants';
import Loader from '../loader/loader';

const planet = (size: string, ref: any = null) => {
  const color = Math.floor(Math.random() * css.planetColors.length);
  const planet = Math.floor(Math.random() * 9);

  switch (planet) {
    case 0:
      return (
        <Planet0
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    case 1:
      return (
        <Planet1
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    case 2:
      return (
        <Planet2
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    case 3:
      return (
        <Planet3
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    case 4:
      return (
        <Planet4
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    case 5:
      return (
        <Planet5
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    case 6:
      return (
        <Planet6
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    case 7:
      return (
        <Planet7
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    case 8:
      return (
        <Planet8
          color={css.planetColors[color]}
          key={`planet-${uid(4)}`}
          size={size}
          inputRef={ref}
        />
      );
    default:
      break;
  }
};

const Planets: FunctionComponent = () => {
  // return <Fragment>{Neos.map(neo => planet(200))}</Fragment>;
  const { loading, error, data } = useQuery(gql`
    {
      neo {
        elements
        objects {
          size
          orbit
        }
      }
    }
  `) as any;

  let centerRef = useRef(null);
  let planets = useRef([]);

  useEffect(() => {
    if (data) {
      planets.current = planets.current.slice(0, data.neo.elements);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <p>Error...</p>;

  return (
    <Fragment>
      <div ref={centerRef} className={styles.center}></div>

      {data.neo.objects.map(
        (object: { size: number; orbit: number }, index: number) => (
          <div
            ref={el => ((planets.current[index] as any) = el)}
            key={`wrapper-${uid(4)}`}
            style={{
              display: 'block',
              height: object.orbit - object.size / 2 + 'vh',
              width: object.orbit - object.size / 2 + 'vw',
              position: 'fixed',
              transform: `rotate(${Math.floor(Math.random() * 360)}deg)`
            }}
          >
            {planet(object.size + 'vh')}
          </div>
        )
      )}
    </Fragment>
  );
};

export default Planets;
