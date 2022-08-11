import { Trans } from "@lingui/macro";
import React, { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { StartButton } from "../../components/start-button";

export const Start: FunctionComponent = () => {
  const [location, setLocation] = useLocation();

  return (
    <StartButton onClick={() => setLocation("/main")}>
      <Trans>Start</Trans>
    </StartButton>
  );
};
