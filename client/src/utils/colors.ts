type hslType = { h: number; s: number; l: number; a: number | null };

const hslRgx = new RegExp(/(hsla?)\([^)]+\)/);

export const isHsl = (value: string): boolean => {
  return !!value.match(hslRgx);
};

export const parseHslValues = (hsl: string): hslType => {
  const [h, s, l, a] = hsl
    .match(/(?<=(hsla?)\()(.*?)(?=\))/)![0]
    .split(",")
    .map((value) => parseInt(value));
  return {
    h,
    s,
    l,
    a: a ? a : null,
  };
};

export const createHslString = ({ h, s, l, a }: hslType) =>
  `hsl${a ? "a" : ""}(${h}, ${s}%, ${l}%${a ? ", " + a : ""})`;

export const lighten = (hsl: string, percent: number): string => {
  if (!isHsl(hsl)) {
    return hsl;
  }
  const { h, s, l, a } = parseHslValues(hsl);
  const newLvalue = l * ((100 - percent) / 100);
  const newLvalueRounded = Math.round(newLvalue * 10) / 10;
  return createHslString({ h, s, l: newLvalueRounded, a });
};

export const darken = (hsl: string, percent: number): string => {
  if (!isHsl(hsl)) {
    return hsl;
  }
  const { h, s, l, a } = parseHslValues(hsl);
  const newLvalue = l * ((100 + percent) / 100);
  const newLvalueRounded = Math.round(newLvalue * 10) / 10;
  return createHslString({ h, s, l: newLvalueRounded, a });
};
