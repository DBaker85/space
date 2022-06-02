import styled from "styled-components";

const buttonDepth = 26;

export const StyledStartButton = styled.button`
  display: flex;
  border: none;
  cursor: pointer;
  height: 90px;
  width: 280px;
  border-radius: 10px;
  background-color: red;
  position: relative;
  align-items: center;
  justify-content: center;
  transform: perspective(600px) rotateX(30deg);
  padding-bottom: ${buttonDepth}px;
  transform-origin: bottom center;
  box-shadow: inset 0 -${buttonDepth}px 3px rgba(0, 0, 0, 0.5),
    0 3px 2px -1px rgba(0, 0, 0, 1);
  &:active {
    transform: perspective(600px) rotateX(30deg) scaleY(0.9);
    padding-bottom: ${buttonDepth / 2}px;
    box-shadow: inset 0 -${buttonDepth / 2}px 3px rgba(0, 0, 0, 0.5),
      0 3px 2px -1px rgba(0, 0, 0, 1);
  }
`;
