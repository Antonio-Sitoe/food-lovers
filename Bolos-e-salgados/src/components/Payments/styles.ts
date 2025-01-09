import styled from "styled-components";
import { AnimeIntro } from "../../styles/styles";
import { theme } from "../../styles/theme";

export const PaymentsStyle = styled.section`
  animation: 0.3s ${AnimeIntro};
  display: grid;
  margin-top: 0.6rem;
  gap: 0.6rem;
  button {
    border: none;
    display: block;
    width: 100%;
    padding: 1rem;
    background: #2ab562;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    font-family: "Lato";
    color: ${theme.colors.white};
    text-align: center;
    border-radius: 4px;

    &:disabled {
      opacity: 0.7;
      cursor: wait;
    }
  }
`;
