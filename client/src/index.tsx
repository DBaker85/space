import React, { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

import App from "./App";
import { theme } from "./styles/theme";

const { messages } = require(`@lingui/loader!./locales/en/messages.po`);

// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root");

i18n.load("en", messages);
i18n.activate("en");

const Core = () => (
  <StrictMode>
    <I18nProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>
);

if (process.env.NODE_ENV === "production") {
  hydrateRoot(container!, <Core />);
}

if (process.env.NODE_ENV === "development") {
  const root = createRoot(container!);
  root.render(<Core />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
