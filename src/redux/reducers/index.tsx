import { combineReducers } from 'redux';

// action types
export const MOVE_STARS = 'MOVE_STARS';

// action interfaces
interface MoveStars {
  type: typeof MOVE_STARS;
  payload: boolean;
}

// reducer interfaces
export type StartsActionTypes = MoveStars;

// reducers
export const stars = (state = { move: false }, action: StartsActionTypes) => {
  switch (action.type) {
    case MOVE_STARS:
      return { ...state, ...{ move: action.payload } };
    default:
      return state;
  }
};

// actions
export function toggleStars(move: boolean) {
  return {
    type: MOVE_STARS,
    payload: move
  };
}

const rootReducer = combineReducers({
  stars
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
