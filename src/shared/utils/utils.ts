/** Create uniqueID of required length */
export const uid = (length: number) =>
  [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');

const darkenLightenColor = (color: string, amount: number, darken = true) => {
  let usePound = false;

  if (color[0] == '#') {
    color = color.slice(1);
    usePound = true;
  }

  if (darken) {
    amount = -Math.abs(amount);
  }

  let num = parseInt(color, 16);

  let r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

export const darkenColor = (color: string, amount: number) =>
  darkenLightenColor(color, amount, true);
export const lightenColor = (color: string, amount: number) =>
  darkenLightenColor(color, amount, false);
