import { IconStyleInput } from './models';

export const iconStyle = (
  { display, size }: IconStyleInput = { display: 'flex', size: '50px' }
) => ({
  display: display,
  height: size,
  width: size
});
