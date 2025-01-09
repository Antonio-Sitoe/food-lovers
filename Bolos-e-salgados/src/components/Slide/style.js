import styled from 'styled-components';
import { theme } from '../../styles/theme';
export const ContainerSlides = styled.div`
  overflow: hidden;
  position: relative;
`;
export const Content = styled.div`
  display: flex;
  transition: transform 0.3s ease;

  div {
    width: 80%;
    height: 100%;
    max-height: 30rem;
    flex-shrink: 0;
    flex-grow: 1;
    border-radius: 4px;
    margin: 0 10%;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;

  button {
    width: 100%;
    margin: 1rem auto;
    padding: 1rem;
    border: none;
    cursor: pointer;
    margin-right: 0.3rem;
    &:hover,
    &:focus {
      background: ${theme.colors.baseSmooth};
    }
  }
`;
