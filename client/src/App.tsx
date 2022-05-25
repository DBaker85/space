import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { globalStyle } from "./styles";

import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <p>{t(data.weather.weather)}</p>
    </div>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  return (
    <StyledApp className="App">
      <GlobalStyle />
      <header className="App-header">
        <p>{t("welcome")}</p>
      </header>
      <ExchangeRates />
    </StyledApp>
  );
}

export default App;
