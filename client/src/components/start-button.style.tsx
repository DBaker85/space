import styled from "styled-components";

const buttonDepth = 26;
const color = "#C9C9EE";

export const StyledStartButton = styled.button`
  text-transform: uppercase;

  font-size: 3rem;
  display: flex;
  border: none;
  cursor: pointer;
  height: 90px;
  width: 280px;
  border-radius: 10px;
  background-color: #fff2f1;
  color: #453a49;
  position: relative;
  align-items: center;
  justify-content: center;
  transform: perspective(600px) rotateX(30deg);
  padding-bottom: ${buttonDepth}px;
  transform-origin: bottom center;
  box-shadow: inset 0 -${buttonDepth}px 3px rgba(0, 0, 0, 0.4),
    0 3px 2px -1px rgba(0, 0, 0, 0), inset 0 -5px 6px 3px rgba(0, 0, 0, 0.1),
    0 2px 4px 2px rgba(0, 0, 0, 0.1), 0 2px 0px 0px rgba(0, 0, 0, 0.5);
  z-index: 5;
  &:active {
    transform: perspective(600px) rotateX(30deg) scaleY(0.9);
    padding-bottom: ${buttonDepth / 2}px;
    box-shadow: inset 0 -${buttonDepth / 2}px 3px rgba(0, 0, 0, 0.4),
      0 3px 2px -1px rgba(0, 0, 0, 0), inset 0 -5px 6px 1px rgba(0, 0, 0, 0.1),
      0 2px 2px 2px rgba(0, 0, 0, 0.1), 0 2px 1px 0px rgba(0, 0, 0, 0.5);
  }
`;
