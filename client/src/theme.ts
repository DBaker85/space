import { fontName } from "./styles/fonts";
import { colors } from "./styles/colors";

export interface Theme {
  colors: {
    green: string;
    yellow: string;
    light: string;
    dark: string;
    pink: string;
  };
  fonts: {
    fontFamily: string;
  };
}

const theme: Theme = {
  colors: {
    green: colors.green,
    yellow: colors.yellow,
    light: colors.light,
    dark: colors.dark,
    pink: colors.pink,
  },
  fonts: {
    fontFamily: fontName,
  },
};

export { theme };
