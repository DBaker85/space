import styled, { keyframes } from "styled-components";

const buttonDepth = 26;

const shrinkOut = keyframes`
 0% { transform:perspective(600px) rotateX(30deg) scaleY(1) scaleX(1); opacity: 1;}
 60% { transform:perspective(600px) rotateX(30deg) scaleY(1) scaleX(0.05); opacity: 1;}
 70% { transform:perspective(600px) rotateX(30deg) scaleY(0) scaleX(0.01); opacity: 1; }
 100% { transform:perspective(600px) rotateX(30deg) scaleY(0) scaleX(0); opacity: 0; }
`;

export const StyledStartButton = styled.button`
  text-transform: uppercase;
  font-size: 3rem;
  display: flex;
  border: none;
  cursor: pointer;
  height: 90px;
  width: 280px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.light};
  color: ${(props) => props.theme.dark};
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
  & span {
    opacity: 1;
  }
  &.fade-exit {
    animation-name: ${shrinkOut};
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    opacity: 0;
    & span {
      opacity: 0;
      transition: opacity ease-in-out 0.2s;
    }
  }
`;

// fade-appear
// fade-appear-active
// fade-appear-done
// fade-enter
// fade-enter-active
// fade-enter-done
// fade-exit
// fade-exit-active
// fade-exit-done
