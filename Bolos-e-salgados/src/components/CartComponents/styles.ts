import styled from 'styled-components';
import { theme } from '../../styles/theme';


export const Orders = styled.div`
  div {
    padding: 1rem;
    background-color: ${theme.colors.grey};

    main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1rem;
      margin: 1rem 0;
      font-weight: bold;
    }

    h1 {
      font-family: Lato;
      font-style: normal;
      font-weight: bold;
      font-size: 1rem;
      line-height: 19px;
      display: block;
      &::after {
        content: '';
        display: block;
        margin: 1rem auto;
        width: 100%;
        height: 1px;
        background: ${theme.colors.white};
      }
    }

    ul {
      padding: 1rem 0;
      display: grid;
      gap: 1rem;

      li {
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  div {
    h2 {
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 1rem 0;
      width: 100%;
      font-weight: bold;
    }
    p {
      margin: 1rem 0;
    }
    a {
      display: block;
      padding: 1rem;
      background: #2ab562;
      font-style: normal;
      font-weight: bold;
      font-size: 1rem;
      font-family: 'Lato';
      color: ${theme.colors.white};
      text-align: center;
      border-radius: 4px;
    }
  }
`;

export const Carts = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    border-radius: 4px;
    background: ${theme.colors.grey};
    display: flex;

    img {
      width: 22rem;
      height: 12.875rem;
      margin-right: 0.6rem;
    }

    @media (max-width: 600px) {
      img {
        width: 5rem;
        height: 5rem;
      }
    }
    @media (max-width: 400px) {
      flex-direction: column;
      img {
        width: 100%;
        height: 12rem;
      }
    }
  }
`;
export const CartsContainer = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const CartsHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 101%;
  }

  p {
    margin: 1rem 0;
    line-height: 1.5;
    max-width: 20rem;
  }

  aside {
    cursor: pointer;
    width: 38px;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.white};
    border-radius: 4px;

    svg {
      fill: ${theme.colors.buyBtn};
      width: 20px;
      height: 20px;
    }
  }
  @media (max-width: 400px) {
    align-items: flex-start;
  }
`;

export const CartsFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    border: 1px solid #252525;
  }

  p {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    display: flex;
    align-items: center;
  }
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;
