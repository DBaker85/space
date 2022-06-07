export interface Theme {
  green: string;
  yellow: string;
  light: string;
  dark: string;
  pink: string;
}

const colors = {
  green: "hsl(65, 10%, 42%)", // Xanadu
  yellow: "hsl(43, 100%, 52%)", // Selective Yellow
  light: "hsl(4, 100%, 97%)", // Lavender blush
  dark: "hsl(284, 11%, 26%)", // dark-liver
  pink: "hsl(358, 23%, 58%)", // old-rose
};

const theme: Theme = {
  green: colors.green,
  yellow: colors.yellow,
  light: colors.light,
  dark: colors.dark,
  pink: colors.pink,
};

export { theme };
