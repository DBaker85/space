import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { globalStyle } from "./styles";

const GlobalStyle = createGlobalStyle`${globalStyle}`;

const StyledApp = styled.div`
  background-color: #cccccc;
`;

function App() {
  return (
    <StyledApp className="App">
      <GlobalStyle />
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </StyledApp>
  );
}

export default App;
