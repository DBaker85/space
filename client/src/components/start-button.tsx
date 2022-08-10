import React, { FunctionComponent, ReactNode } from "react";

import { StyledStartButton } from "./start-button.style";

export const StartButton: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <StyledStartButton>
    <span>{children}</span>
  </StyledStartButton>
);
