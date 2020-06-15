import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 90%;
  animation: 1s ${fadeIn} ease;

  svg {
    overflow: visible;
  }
`;
