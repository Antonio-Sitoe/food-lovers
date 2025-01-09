import styled from "styled-components";
import { AnimeIntro } from "../../styles/styles";
import { theme } from "../../styles/theme";

export const KitsForParty = styled.section`
  background: url("/kitBg.svg") no-repeat;
  background-size: cover;
  background-position: center;
  margin: 0 0 2rem 0;
  padding: 14rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 0.3s ${AnimeIntro};

  main {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;

    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 300px;
        margin: 0 auto;
      }
    }

    section {
      max-width: 20rem;
      margin: 0 auto;
      h1,
      p {
        margin: 2rem 0;
      }

      h1 {
        &::after {
          content: "";
          width: 2rem;
          height: 2px;
          background: #252525;
          display: block;
          margin: 0.6rem 0;
        }
      }

      a {
        border: none;
        border-radius: 1rem;
        padding: 1rem;
        cursor: pointer;
        &:hover {
          background: ${theme.colors.blackHover};
        }
      }

      @media (max-width: 600px) {
        text-align: center;
        margin: 0;
        h1,
        p {
          margin: 1rem 0;
        }
        h1 {
          &::after {
            content: "";
            width: 2rem;
            height: 2px;
            background: #252525;
            display: block;
            margin: 0.6rem auto;
          }
        }
      }
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const Main = styled.main`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  @media (max-width: 40rem) {
    margin: 1rem 0;
  }
`;
export const DivConfir = styled.div`
  margin: 6rem 0;
  a {
    max-width: 20rem;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 3rem;
  }

  @media (max-width: 40rem) {
    margin: 2rem 0;
  }
`;
