import styled from 'styled-components';

export const CheckoutStyle = styled.main`
  margin: 3rem 0;
`;

export const Main = styled.main`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Order = styled.div`
  padding: 1rem;

  div {
    background: #f5f5f5;
    padding: 1rem;
  }
`;


