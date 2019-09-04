/** Create uniqueID of required length */
export const uid = (length: number) =>
  [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');

const darkenLightenColor = (color: string, amount: number, darken = true) => {
  if (!color.startsWith('hsl')) {
    console.warn('Darken color failed: supplied color is not hsl format');
    return color;
  }
  const hsl = color
    .replace('hsl(', '')
    .replace(')', '')
    .split(',');

  const l = Number(hsl[2].replace('%', ''));

  let nl = darken ? l - amount : l + amount;

  if (nl < 0) {
    nl = 0;
  }

  if (nl > 100) {
    nl = 100;
  }

  hsl[2] = nl + '%';
  const newHsl = hsl.join(',');

  return `hsl(${newHsl})`;
};

export const darkenColor = (color: string, amount: number) =>
  darkenLightenColor(color, amount, true);
export const lightenColor = (color: string, amount: number) =>
  darkenLightenColor(color, amount, false);
