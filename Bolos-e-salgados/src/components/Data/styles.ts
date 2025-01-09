import styled from "styled-components";
import { AnimeIntro } from "../../styles/styles";
import { theme } from "../../styles/theme";

export const DataStyle = styled.form`
  animation: 0.3s ${AnimeIntro};
  margin: 1rem 0;
  display: grid;
  gap: 1rem;

  select,
  textarea {
    background: #ffffff;
    border: 3px solid #e0dfdf;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 1rem;
    width: 100%;
    outline: none;
    font-family: 'Lato', sans-serif;
    &:hover,
    &:focus {
      border: 3px solid ${theme.colors.blackHover};
    }
  }
`;
export const ButtonEdit = styled.button`
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.baseSmooth};
  }
`;
export const SectionFlex = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;