interface hslRawValues {
  h: number;
  s: number;
  l: number;
}

/**
  Get raw values from an hsl string
  @param hsl string value of hsl eg: "hsl(356, 100%, 100%)"
  @returns {Object} {h:356 , s:100, l:100}
*/
const getHSLvalues = (hsl: string): hslRawValues => {
  const hslArray = hsl
    .replace('hsl(', '')
    .replace(')', '')
    .replace(/%/g, '')
    .split(',');
  return {
    h: +hslArray[0],
    s: +hslArray[1],
    l: +hslArray[2]
  };
};

const darkenLightenColor = (
  color: string,
  amount: number,
  darken: boolean = true
): string => {
  if (color.startsWith('hsl')) {
    let hslValues = getHSLvalues(color);
    if (darken) {
      amount = -Math.abs(amount);
    }

    hslValues.l = hslValues.l + amount;

    if (hslValues.l < 0) {
      hslValues.l = 0;
    }
    if (hslValues.l > 100) {
      hslValues.l = 100;
    }
    return `hsl(${hslValues.h},${hslValues.s}%,${Math.round(hslValues.l)}%)`;
  } else {
    console.warn(
      `${
        darken ? 'Darken' : 'Lighten'
      } color: Cannot process '${color}' > Use HSL colors`
    );
    return color;
  }
};

/**
 * Convert hsl string to hex code
 * By Jon Kantner : https://css-tricks.com/converting-color-spaces-in-javascript/
 */
function HSLToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  let sr = Math.round((r + m) * 255).toString(16);
  let sg = Math.round((g + m) * 255).toString(16);
  let sb = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (sr.length === 1) sr = '0' + r;
  if (sg.length === 1) sg = '0' + g;
  if (sb.length === 1) sb = '0' + b;

  return '#' + sr + sg + sb;
}

/**
 * Darken hsl color by given amount
 * @param color hsl color string to darken e.g: "hsl(320, 100%, 50%)"
 * @param amount percentage to darken the color by.
 */
export const darken = (color: string, amount: number): string =>
  darkenLightenColor(color, amount);

/**
 * Lighten hsl color by given amount
 * @param color hsl color string to lighten e.g: "hsl(320, 100%, 50%)"
 * @param amount percentage to lighten the color by.
 */
export const lighten = (color: string, amount: number): string =>
  darkenLightenColor(color, amount, false);

export { getHSLvalues as getValues };

/**
 * Convert hsl string to hex code
 * @param hsl - string to convert to hex: "hsl(320, 100%, 50%)"
 * @returns hex string eg: "#FFFFFF"
 */
export const toHex = (hsl: string): string => {
  const values = getHSLvalues(hsl);
  return HSLToHex(values.h, values.s, values.l);
};

/**
 * Convert hsl string to hex code
 * @param hsl - string to convert to hex: "hsl(320, 100%, 50%)"
 * @returns hsl
 */
export const complimentary = (color: string): string => {
  let hslValues = getHSLvalues(color);

  let finalhue = hslValues.h + 120;
  if (finalhue > 360) {
    finalhue = finalhue - 360;
  }

  hslValues.h = finalhue;

  return `hsl(${Math.floor(hslValues.h)},${hslValues.s}%,${hslValues.l}%)`;
};
