import { theme } from '../../styles/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem;
  height: 13rem;
  background: ${theme.colors.baseSmooth};
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    width: 100%;
    @media (max-width: 500px) {
      flex-direction: column;
      h1 {
        text-align: center;
      }

      ul {
        margin-top: 1rem;
      }
    }
  }

  div,
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul {
    li {
      margin: 0 1rem;
      padding: 0.3rem;
      transition: 0.3s;

      a {
        width: 2rem;
        height: 2rem;
        background: ${theme.colors.base};
        border-radius: 50%;

        transition: 0.3s;

        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 1rem;
          height: 1rem;
          color: whitesmoke;
        }
      }

      &:hover {
        margin-bottom: 0.7rem;
      }
    }
  }
`;
