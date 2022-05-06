import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { globalStyle } from "./styles";

import { useQuery, gql } from "@apollo/client";

const GlobalStyle = createGlobalStyle`${globalStyle}`;

const StyledApp = styled.div`
  background-color: #cccccc;
`;

const WEATHER = gql`
  query GetData {
    nearEarthObjects {
      elements
    }
    weather {
      weather
      sun {
        set
      }
    }
  }
`;
function ExchangeRates() {
  const { loading, error, data } = useQuery(WEATHER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <p>{data.weather.weather}</p>
    </div>
  );
}

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
      <ExchangeRates />
    </StyledApp>
  );
}

export default App;
