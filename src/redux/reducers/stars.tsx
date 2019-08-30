import { StarActionTypes, MOVE_STARS } from '../actions/stars';

export interface starState {
  move: boolean;
}
const intialState = { move: false };

// reducers
export const stars = (
  state: starState = intialState,
  action: StarActionTypes
) => {
  switch (action.type) {
    case MOVE_STARS:
      return { ...state, ...{ move: action.payload } };
    default:
      return state;
  }
};
