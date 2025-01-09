import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Shypings = styled.main`
  gap: 1rem;
  div {
    gap: 1rem;
    display: flex;
    align-items: center;
    span {
      svg {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        color: ${theme.colors.buyBtn};
      }
    }
    h1 {
      font-weight: bold;
      font-size: 1rem;
    }
  }

  section {
    margin: 2rem 0;
    div {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
`;
