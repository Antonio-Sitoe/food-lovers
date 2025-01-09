import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ShowInformation = styled.section`
  margin: 0.6rem 0;
  padding: 0 3rem;
  @media (max-width: 800px) {
    padding: 0;
  }
  button {
    margin: 1rem 0;
  }
  h1 {
    margin-bottom: 2rem;
    line-height: 1.5;
  }
  h2,
  h3 {
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
    margin: 1rem 0;
  }

  h3 {
    text-transform: uppercase;
  }
`;

export const QuantityStyle = styled.main`
  margin: 1rem 0;
  display: flex;
  align-items: center;

  button {
    cursor: pointer;
  }

  span {
    font-weight: bold;
    background: ${theme.colors.grey};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span,
  button {
    border: none;
    width: 3rem;
    height: 2.5rem;

    &:nth-child(2) {
      color: ${theme.colors.black};
      background: #b2adad;
    }
    &:last-child {
      background: ${theme.colors.black};
      color: ${theme.colors.white};

      &:hover {
        background: ${theme.colors.blackHover};
      }
    }
  }
`;

export const QuantityContainerStyle = styled.main`
  justify-content: space-between;
  display: flex;
  align-items: center;
  p {
    font-weight: bold;
  }
`;
