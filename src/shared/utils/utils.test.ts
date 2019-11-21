import { uid } from './utils';

function checkIfDuplicateExists(w: Array<any>) {
  return new Set(w).size !== w.length;
}

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

it('generates unique ids', () => {
  const ids = [...new Array(30)].map(() => {
    return uid(10);
  });
  const hasDuplicates = checkIfDuplicateExists(ids);
  expect(hasDuplicates).toBeFalsy();
});
