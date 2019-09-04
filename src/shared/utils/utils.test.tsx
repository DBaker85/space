import { uid, darkenColor, lightenColor } from './utils';

it('generates a unique short id', () => {
  const id = uid(4);
  expect(id).toHaveLength(4);
  expect(typeof id).toBe('string');
});

it('generates a unique long id', () => {
  const id = uid(20);
  expect(id).toHaveLength(20);
  expect(typeof id).toBe('string');
});
