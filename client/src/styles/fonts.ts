import { css } from "styled-components";
import AbelRegular from "../assets/fonts/Abel-Regular.woff2";

export const fontName = "Abel-Regular";

export const fonts = css`
  @font-face {
    font-family: ${fontName};
    font-style: normal;
    font-weight: 400;
    src: local(${fontName}), url(${AbelRegular}) format("woff2");
  }
`;
