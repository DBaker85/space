import { darken, lighten, getValues, toHex } from './hsl';

const color = { hsl: 'hsl(200,50%,60%)', hex: '#66aacc' };

it('gets raw values from hsl', () => {
  const values = getValues(color.hsl);
  expect(values.h).toBeCloseTo(200);
  expect(values.s).toBeCloseTo(50);
  expect(values.l).toBeCloseTo(60);
});

it('returns a darker hsl string', () => {
  const darkenedValue = darken(color.hsl, 10);
  expect(typeof darkenedValue).toEqual('string');
});

it('darkens a color by 10%', () => {
  const darkenedValue = darken(color.hsl, 10);
  expect(darkenedValue).toEqual('hsl(200,50%,50%)');
});

it('lightens a color by 10%', () => {
  const lightenedValue = lighten(color.hsl, 10);
  expect(lightenedValue).toEqual('hsl(200,50%,70%)');
});

it('converts hsl to hex', () => {
  const hex = toHex(color.hsl);
  expect(hex).toEqual(color.hex);
});
