import { css } from "styled-components";

import { fontName } from "./fonts";
import { colors } from "./colors";

// prettier-ignore
export const global = css`
* {
  box-sizing: border-box;
}
body {
  font-family: ${fontName};
  font-size:2.4vw;
  background-color: ${colors.pink};
  color: ${colors.light};
  width: 100vw;
  height: 100vh;
}
`
