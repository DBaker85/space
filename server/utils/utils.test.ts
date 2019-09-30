import { findSmallest } from './utils';

const testArray = [
  {
    size: 10
  },
  {
    size: 45
  },
  {
    size: 5
  },
  {
    size: 89
  },
  {
    size: 2
  }
];

it('gets smallest item from objects', () => {
  const smallest = findSmallest(testArray, 'size');
  expect(smallest).toBe(2);
});
