import styled from 'styled-components';
import { theme } from './theme'
import { animeLeft } from './Aboutstyles';

export const Login = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  gap: 2rem;

  &::before {
    display: block;
    content: '';
    background: url('/loginBg.jpg') no-repeat center center;
    background-size: cover;
  }
  @media (max-width: 40rem) {
    grid-template-columns: 1fr;
    &::before {
      display: none;
    }
  }
`;

export const LoginGet = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 450px;
  margin: 4rem auto 0 auto;
  padding: 1rem;
  width: 100%;
  animation: ${animeLeft} 0.3s;


  select {
    background: ${theme.colors.white};
    border: 3px solid ${theme.colors.grey};
    box-sizing: border-box;
    border-radius: 4px;
    padding: 1rem;
    width: 100%;
    outline: none;
    &:hover,
    &:focus {
      border: 3px solid ${theme.colors.blackHover};
    }
  }

  h1 {
    margin-bottom: 2rem;
  }

  a {
    padding: 0.6rem 0;
    color: ${theme.colors.link};
  }
  p {
    a {
      color: ${theme.colors.tomato};
    }
  }
`;
export const LoginContainer = styled.main`
  margin: 8rem 0;
`;
