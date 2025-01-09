import styled from 'styled-components';
import { theme } from './theme';

export const Contato = styled.section`
  margin: 4rem 0;
  display: grid;
  padding: 0;
  grid-template-columns: 30rem 1fr;
  border-radius: 4px;
  background: ${theme.colors.baseSmooth};
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);

  @media (max-width: 900px) {
    grid-template-columns: 20rem 1fr;
  }
  @media (max-width: 40rem) {
    grid-template-columns: 1fr;
  }
`;
