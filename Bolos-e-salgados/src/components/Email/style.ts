import styled from "styled-components";
import { AnimeIntro } from "../../styles/styles";
import { theme } from "../../styles/theme";

export const EmailStyle = styled.form`
  animation: 0.3s ${AnimeIntro} ease-in;
  display: grid;
  gap: 1rem;
  margin: 1rem 0;

  p {
    a {
      color: ${theme.colors.base};
    }
  }
`;
