import styled from "styled-components";
import { AnimeIntro } from "../../styles/styles";
import { theme } from "../../styles/theme";

export const Card = styled.div`
  animation: 0.3s ${AnimeIntro};
  background: ${theme.colors.baseSmooth};
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 4px;

  main {
    display: grid;
    text-align: center;
    padding: 1.5rem;
    grid-template-rows: 1fr 1fr 2.5rem;

    h2 {
      text-transform: uppercase;
      line-height: 1.5;
    }
    h4 {
      font-size: 1rem;
      font-weight: bold;
    }
    a {
      &:hover {
        background: #252525 !important;
        color: whitesmoke;
      }
    }
    @media (max-width: 800px) {
      padding: 1rem;
    }
    @media (max-width: 600px) {
      gap: 1rem;
    }
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;
export const MainCard = styled.div`
  margin: 2rem 0 6rem 0;
  animation: 0.3s ${AnimeIntro};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  @media (max-width: 800px) {
    gap: 1rem;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
export const CupCakeStyle = styled.section`
  margin: 6rem 0;
  animation: 0.3s ${AnimeIntro};
  h1 {
    text-align: center;
  }

  @media (max-width: 40rem) {
    margin: 0;
  }
`;
