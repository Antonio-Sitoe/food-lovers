import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

export const Left = keyframes` 
from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
`;

export const Balls = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  section {
    width: 3.5em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    div {
      width: 0.8em;
      height: 0.8em;
      border-radius: 50%;
      transform: translateY(-100%);
      animation: ${Left} 0.8s ease-in-out alternate infinite;
      background-color: ${theme.colors.base};

      &:nth-of-type(1) {
        animation-delay: -0.4s;
      }

      &:nth-of-type(2) {
        animation-delay: -0.2s;
      }
    }
  }
`;

export const ErrorStyle = styled.div`
  padding: 5rem 0;
  width: 100%;
  line-height: 1.5;

  font-size: 1rem;
  color: ${theme.colors.tomato};



  div {
    svg {
      margin: 1rem auto;
      width: 100%;
      max-width: 5rem;
      height: 5rem;
    }
  }
`;

export const Errror = styled.p`
  color: ${theme.colors.tomato};
`;
