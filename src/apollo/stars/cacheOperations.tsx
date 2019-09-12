export const moveStars = (move: boolean) => {
  return { data: { stars: { move, __typename: 'Star' } } };
};
