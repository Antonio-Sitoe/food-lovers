import styled from "styled-components";
import { theme } from "../../styles/theme";
import { AnimeLeft } from "../../styles/Aboutstyles";

export const UserPage = styled.main`
  margin: 6rem 0;
`;
export const UserIntro = styled.section`
  padding: 2rem 0;
  text-align: center;

`;
export const UserMain = styled.section`
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 1rem;
  padding: 1rem 0;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
export const UserDash = styled.aside`
  border-radius: 4px;
  ul {
    display: grid;
    li {
      border-bottom: 2px solid white;
      display: flex;
      a,
      button {
        cursor: pointer;
        text-align: left;
        border: none;
        width: 100%;
        display: block;
        padding: 1rem;
        font-family: Lato;
        font-weight: bold;
        background: ${theme.colors.base};
        color: ${theme.colors.white};
        &:hover,
        &:focus {
          color: ${theme.colors.black};
          background: ${theme.colors.baseSmooth};
        }
        &.active {
          background: ${theme.colors.baseSmooth};
          color: ${theme.colors.black};
        }
      }
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
export const List = styled.section`
  animation: ${AnimeLeft} 0.3s;
  ul {
    display: grid;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  div {
    margin: 2rem 0;
    a {
      background: ${theme.colors.baseSmooth};
      color: black;

      padding: 0.8rem;
      text-align: center;
      width: 100%;

      display: flex;
      justify-content: center;
      gap: 0.5rem;
      max-width: 10rem;

      border-radius: 4px;
    }
  }
`;
