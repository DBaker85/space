import { getExtension } from './getExtension';

it('gets correct svg file extension', () => {
  const ext = getExtension('image.svg');
  expect(ext).toBe('svg');
});

it('gets correct ttf file extension', () => {
  const ext = getExtension('font.hash.chunk.ttf');
  expect(ext).toBe('ttf');
});
