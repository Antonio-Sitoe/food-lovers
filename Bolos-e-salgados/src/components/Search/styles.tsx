import styled from 'styled-components';
import { Left } from '../../Helper/styles';
import { theme } from '../../styles/theme';

export const SeachLoadingStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    height: 6rem;
    background: transparent;
    width: 3rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    div {
      width: 0.8em;
      height: 0.8em;
      border-radius: 50%;
      transform: translateY(-100%);
      animation: ${Left} 0.8s ease-in-out alternate infinite;
      background-color: ${theme.colors.base};

      &:nth-of-type(1) {
        animation-delay: -0.4s;
      }

      &:nth-of-type(2) {
        animation-delay: -0.2s;
      }
    }
  }
`;
export const SearchingStyle = styled.div`
  margin: 1rem;
  max-width: 40rem;
  width: 100%;
  padding: 2rem;
  border-radius: 6px;
  background: ${theme.colors.white};

  display: flex;
  flex-direction: column;
  gap: 1rem;

  max-height: 400px;
  position: relative;
  overflow: auto;

  input {
    border-radius: 6px;
    font-family: ${theme.fonts.Lato};
    padding: 1rem;
    border: 1px solid ${theme.colors.base};
  }

  section {
    background: ${theme.colors.baseSmooth};
    padding: 0.6rem 1rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      border-radius: 50%;
      padding: 0.3rem;
      border: 3px solid ${theme.colors.base};
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
    @media (max-width: 900px) {
      flex-direction: column;
    }
  }
  @media (max-width:40rem){
    padding: 0.6rem;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  border-radius: 4px;
  input {
    border: none;
    cursor: pointer;
    background: ${theme.colors.grey};
    padding: 0.6rem 0.8rem;
    outline: none;
  }

  a {
    padding: 1rem;
    border-radius: 0 4px 4px 0;
  }
  @media (max-width: 900px) {
    input {
      display: none;
    }
    a {
      padding: 1rem;
      border-radius: 4px;
    }
  }
`;
