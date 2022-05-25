import React, { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5055/graphql",
  cache: new InMemoryCache(),
});
import "./i18n";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root");

// const root = createRoot(container!);
const root = hydrateRoot(
  container!,
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);

// root.render(
//   <StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
