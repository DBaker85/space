// action types
export const MOVE_STARS = 'MOVE_STARS';

// action interfaces
interface MoveStars {
  type: typeof MOVE_STARS;
  payload: boolean;
}

// reducer action interfaces
export type StarActionTypes = MoveStars;

// actions
export const toggleStars = (move: boolean) => {
  return {
    type: MOVE_STARS,
    payload: move
  };
};
