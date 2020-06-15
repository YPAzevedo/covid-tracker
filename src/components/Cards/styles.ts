import styled, { keyframes } from "styled-components";

const getBorderColor = (type: string) => {
  switch (type) {
    case "confirmed":
      return "#519FFF";
    case "recovered":
      return "#74D321";
    case "deaths":
      return "#FF6523";
    default:
      return "#FFD326";
  }
};

const fadeIn = keyframes`
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

interface CardProps {
  type: string;
}

export const Container = styled.div`
  display: flex;
  animation: 1s ${fadeIn} ease;
`;

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
  padding: 20px;
  border-radius: 8px;
  min-width: 170px;
  background: white;
  box-shadow: 5px 5px ${(props) => getBorderColor(props.type)};

  h3 {
    margin-bottom: 16px;
  }

  strong {
    color: #454545;
    animation: 1s ${fadeIn} ease;
  }

  small {
    margin-top: 16px;
    color: #6f6f6f;
  }
`;
