import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { globalStyle } from "./styles";

import { useQuery, gql } from "@apollo/client";

const GlobalStyle = createGlobalStyle`${globalStyle}`;

const StyledApp = styled.div`
  background-color: #cccccc;
`;

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
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
