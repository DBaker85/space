import styled, { keyframes } from "styled-components";

const rotation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const rotationBack = keyframes`
     0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
`;
export const StyledLoader = styled.span`
  width: 48px;
  height: 48px;
  border: 3px dotted ${(props) => props.theme.colors.light};
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: ${rotation} 2s linear infinite;

  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px dotted ${(props) => props.theme.colors.dark};
    border-style: solid solid dotted;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    animation: ${rotationBack} 1s linear infinite;
    transform-origin: center center;
  }
`;
