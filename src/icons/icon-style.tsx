import { IconStyleInput } from './models';

export const iconStyle = (
  { display, size }: IconStyleInput = { display: 'flex', size: 50 }
) => ({
  display: display,
  height: `${size}px`,
  width: `${size}px`
});
