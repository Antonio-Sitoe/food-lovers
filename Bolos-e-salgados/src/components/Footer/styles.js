import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Wrapper = styled.footer`
  background: ${theme.colors.black};
  padding: 2rem 0;
`;

export const FirstSection = styled.section`
  border-bottom: 0.1px solid #616060;

  div {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
   
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0;

    main {
      max-width: 9rem;
      margin: 0 0.3rem;
      a {
        width: 100%;
        display: block;

        h1 {
          text-align: center;
          text-transform: capitalize;
          font-size: 2rem;
        }
      }
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      li + li {
        margin-left: 1rem;
        @media (max-width: 600px) {
          margin: 1rem 0;
          a {
            line-height: 3;
          }
        }
      }
    }

    a {
      color: ${theme.colors.white};
      padding: 0.6rem;
      border-radius: 4px;

      &:hover {
        background: #363636;
      }
    }

    @media (max-width: 450px) {
       flex-direction: column;
      justify-content: center;
    }
    @media (max-width: 300px) {
      flex-wrap: wrap;
    }
  }
`;

export const CopyRight = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  max-width: 600px;
  margin: 0 auto;
  color: ${theme.colors.white};
`;
