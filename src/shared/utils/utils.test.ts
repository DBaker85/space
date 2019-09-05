import { uid } from './utils';

it('generates an id of as a string', () => {
  const id = uid(4);
  expect(typeof id).toBe('string');
});

it('generates ids of correct length', () => {
  const id = uid(5);
  const id2 = uid(20);
  expect(id).toHaveLength(5);
  expect(id2).toHaveLength(20);
});
