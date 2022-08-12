import { ThemeProvider, createGlobalStyle } from "styled-components";
import { addDecorator } from "@storybook/react";
import { globalStyle } from "../src/styles";
import { theme } from "../src/theme";

const GlobalStyle = createGlobalStyle`${globalStyle}`;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </>
  ),
];
