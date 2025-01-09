import styled from 'styled-components';
import { theme } from './theme'
import { animeLeft } from './Aboutstyles';


export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 30rem;
  gap: 1rem;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 30rem;
  }
`;

export const CartStyle = styled.main`
  animation: ${animeLeft} 0.3s;
  padding: 3rem 0;
`;

export const MessageContainer = styled.div`
  height: 10rem;
  margin: 3rem 0;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${theme.colors.base};
`;
