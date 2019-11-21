import { StarState } from './stars/models';
import { starState } from './stars/intialState';
import { planetState } from './planets/intialState';
import { Planet } from './planets/models';
import { networkState } from './network/intialState';
import { ContentState } from './content/models';
import { contentState } from './content/intialState';

export interface FullState {
  stars: StarState;
  planets: Planet[];
  online: Boolean;
  connected: Boolean;
  content: ContentState;
}

export const initialState: FullState = {
  ...starState,
  ...planetState,
  ...networkState,
  ...contentState
};
