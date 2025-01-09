import styled from "styled-components";
import { theme } from "../../styles/theme";

export const SumaryStyle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    margin: 2rem auto;
    text-transform: uppercase;
  }
  p {
    margin: 2rem auto;
  }
  &::after {
    content: "";
    margin-top: 3rem;
    height: 0.3rem;
    width: 10rem;
    display: block;
    margin: 0 auto;
    background: ${theme.colors.grey};
  }
`;
