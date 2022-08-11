import React, { FunctionComponent, ReactNode } from "react";

import { StyledStartButton } from "./start-button.style";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const StartButton: FunctionComponent<ButtonProps> = ({
  children,
  ...props
}) => (
  <StyledStartButton {...props}>
    <span>{children}</span>
  </StyledStartButton>
);
