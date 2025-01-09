import { theme } from '../../styles/theme';
import styled from 'styled-components';

export const ContactInforStyle = styled.section`
  padding: 3rem;

  h2 {
    margin-bottom: 3rem;
  }
  div {
    display: flex;
    gap: 0.6rem;
    margin: 3rem 0;

    svg {
      fill: ${theme.colors.base};
      width: 24px;
      height: 24px;
    }
    ul {
      display: grid;
      gap: 1rem;

      li {
        a {
          &:hover {
            color: ${theme.colors.base};
          }
        }
      }
    }
  }
  @media (max-width: 500px) {
    padding: 1rem;
  }
`;
