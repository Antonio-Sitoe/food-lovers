import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  disabled?: Boolean | any;
  children: string | any;
  style?: any;
  onClick?: () => void;
}

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 20rem;
  height: 49px;
  background: ${theme.colors.base};
  border-radius: 4px;
  color: ${theme.colors.white};
  border: none;
  cursor: pointer;

  svg {
    margin-right: 0.6rem;
  }

  &:hover,
  &:focus {
    box-shadow: 0 0 0 3px ${theme.colors.baseSmooth},
      0 0 0 4px ${theme.colors.base};
  }
  &:disabled {
    background: ${theme.colors.black};
    cursor: wait;
    opacity: 0.7;
  }
`;

const Button = ({ children, disabled, ...rest }: ButtonProps) => (
  <ButtonStyle disabled={disabled} {...rest}>
    {children}
  </ButtonStyle>
);

export default Button;
