import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    transform: translateX(-30px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: 1s ${fadeIn} ease;

  label {
    font-weight: 500;
    margin-bottom: 10px;
  }

  select {
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    border: 1px solid #C7C7C7;
    min-width: 300px;
  }
`;
