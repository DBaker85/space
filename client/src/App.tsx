import React, { FunctionComponent, Suspense } from "react";
import { lazyWithPreload } from "react-lazy-with-preload";
import styled, { createGlobalStyle } from "styled-components";
import { Route, Switch, useLocation } from "wouter";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
  const [location] = useLocation();

  useEffectOnce(() => idleCallback(() => Main.preload()));

  return (
    <StyledApp className="App">
      <GlobalStyle />
      <TransitionGroup>
        <CSSTransition key={location} classNames="fade" timeout={500}>
          <Suspense fallback={<Loader />}>
            <Switch location={location}>
              <Route path="/main" component={Main} />
              <Route path="/" component={Start} />
            </Switch>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </StyledApp>
  );
};

export default App;
