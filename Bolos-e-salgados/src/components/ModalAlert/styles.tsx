import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

export const ModalBackground = styled.div`
  padding: 0.6rem;

  background-color: rgba(0, 0, 0, 0.44);
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const anime = keyframes`
  from {
      opacity: 0;
       transform: translateY(-30px);
    }
    to {
     opacity: 1;
    transform: translateY(0px);
    }
`;
export const Modal = styled.div`
  transition: transform 0.3s ease 0s, opacity 0.4s ease 0s;
  animation: ${anime} 0.3s;
  width: 100%;
  max-width: 20rem;
  background: white;
  padding: 2rem;
  border-radius: 6px;
  h2 {
    text-align: center;
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 2rem 0 0 0;
    gap: 1rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: ${theme.fonts.Lato};
      font-weight: bold;

      span {
        display: grid;
        gap: 0.3rem;
        svg {
          width: 24px;
          height: 24px;
          margin: 0 auto;
        }
      }

      height: 6rem;
      border: 0;
      padding: 0.8rem;
      cursor: pointer;
      border-radius: 6px;
    }
  }
`;
export const LogoutButton = styled.button`
  background: #fee4e4;
  color: ${theme.colors.tomato};
  font-weight: 600;
`;