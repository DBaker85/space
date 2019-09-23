import { StarState } from './stars/models';
import { starState } from './stars/intialState';
import { planetState } from './planets/intialState';
import { Planet } from './planets/models';

export interface FullState {
  stars: StarState;
  planets: Planet[];
}

export const initialState: FullState = {
  ...starState,
  ...planetState
};
