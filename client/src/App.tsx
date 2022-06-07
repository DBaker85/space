import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { globalStyle } from "./styles";

import { useTranslation } from "react-i18next";

const GlobalStyle = createGlobalStyle`${globalStyle}`;

const StyledApp = styled.div`
  background-color: #cccccc;
`;

function App() {
  const { t, i18n } = useTranslation();
  return (
    <StyledApp className="App">
      <GlobalStyle />
      <header className="App-header">
        <p>{t("welcome")}</p>
      </header>
    </StyledApp>
  );
}

export default App;
