import React, { FunctionComponent, Fragment, useRef, useEffect } from 'react';
import { uid } from '../shared/utils/utils';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
import { usePlanetState } from '../apollo/planets/cacheOperations';

const Planet: FunctionComponent<{ size: string; inputRef?: any }> = ({
  size,
  inputRef = null
}) => {
  const color = Math.floor(Math.random() * css.planetColors.length);
  const planet = Math.floor(Math.random() * 9);
  const style = {
    opacity: 1
  };

  switch (planet) {
    case 0:
      return (
        <Planet0
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    case 1:
      return (
        <Planet1
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    case 2:
      return (
        <Planet2
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    case 3:
      return (
        <Planet3
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    case 4:
      return (
        <Planet4
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    case 5:
      return (
        <Planet5
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    case 6:
      return (
        <Planet6
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    case 7:
      return (
        <Planet7
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    case 8:
      return (
        <Planet8
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
    default:
      return (
        <Planet0
          color={css.planetColors[color]}
          size={size}
          inputRef={inputRef}
          style={style}
        />
      );
  }
};

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

  useEffect(() => {
    if (data) {
      planets.current = planets.current.slice(0, data.neo.elements);
      planetState(data.neo.objects);
      // TweenMax.set(planets.current, {
      //   x: () => Math.floor(Math.random() * 80) + 'vw',
      //   rotation: () => randomNegative(Math.floor(Math.random() * 40))
      // });
      // TweenMax.from(planets.current, 1, {
      //   x: '50vw',
      //   y: 0,
      //   scale: 0,
      //   opacity: 1
      // });
    }
  }, [data, planetState]);

  if (loading) return null;
  if (error) return <p>Error...</p>;

  return (
    <Fragment>
      {data.neo.objects.map(
        (object: { size: number; orbit: number }, index: number) => (
          <Planet
            size={object.size + 'vh'}
            inputRef={(el: any) => ((planets.current[index] as any) = el)}
            key={`planet-${uid(3)}`}
          />
        )
      )}
    </Fragment>
  );
};

export default Planets;
