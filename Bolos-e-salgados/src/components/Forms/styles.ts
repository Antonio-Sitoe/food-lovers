import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Label = styled.label`
  font-weight: bold;
  font-size: 0.9rem;
`;

export const Wrapper = styled.div`
  display: grid;
  gap: 0.6rem;

  input,
  textarea {
    display: block;
    background: ${theme.colors.grey};
    border: 1px solid #ededed;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 1rem;
    &:hover,
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${theme.colors.baseSmooth},
        0 0 0 4px ${theme.colors.base};
    }
  }
  p {
    color: ${theme.colors.tomato};
    font-size: 0.8rem;
  }
`;
