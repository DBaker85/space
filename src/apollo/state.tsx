import { StarState } from './stars/models';
import { starState } from './stars/intialState';

export interface FullState {
  stars: StarState;
}

export const initialState: FullState = {
  ...starState
};
