import React, { FunctionComponent, Suspense } from "react";
import { lazyWithPreload } from "react-lazy-with-preload";
import styled, { createGlobalStyle } from "styled-components";
import { Router, Route } from "wouter";

import { globalStyle } from "./styles";
import { idleCallback } from "./utils/requestIdleCallback";
import { useEffectOnce } from "./hooks/useEffectOnce";
import { Start } from "./pages/start/start";
import { Loader } from "./components/loader/loader";

const GlobalStyle = createGlobalStyle`${globalStyle}`;

const StyledApp = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Main = lazyWithPreload(() => import("./pages/main/main"));

const App: FunctionComponent = () => {
  useEffectOnce(() => idleCallback(() => Main.preload()));
  return (
    <StyledApp className="App">
      <GlobalStyle />
      <Router>
        <Suspense fallback={<Loader />}>
          <Route path="/main" component={Main} />
        </Suspense>
        <Route path="/" component={Start} />
      </Router>
    </StyledApp>
  );
};

export default App;
