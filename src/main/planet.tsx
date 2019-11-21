import React, { FunctionComponent } from 'react';

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

const Planet: FunctionComponent<{
  size: string;
  inputRef?: any;
  color: number;
  type: number;
}> = ({ size, inputRef = null, type, color }) => {
  const style = {
    opacity: 1
  };

  switch (type) {
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

export default Planet;
