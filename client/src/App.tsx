import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Trans } from "@lingui/macro";

import { globalStyle } from "./styles";
import { StartButton } from "./components/start-button";

const GlobalStyle = createGlobalStyle`${globalStyle}`;

const StyledApp = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <StyledApp className="App">
      <GlobalStyle />
      <header className="App-header">
        <StartButton>
          <Trans>Launch</Trans>
        </StartButton>
      </header>
    </StyledApp>
  );
}

export default App;
