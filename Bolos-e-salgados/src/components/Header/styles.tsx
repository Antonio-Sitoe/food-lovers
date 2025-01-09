import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const Menu = keyframes`
from {
  transform:rotate(60deg)
}
to {
  transform:initial
}`;
const AnimeTop = keyframes`
from {
  opacity:0;
  transform:translateY(-30px);
}
to {
 opacity:initial;
  transform:translateY(0);
}`;

export const MarginTops = styled.div`
  margin-bottom: 4rem;
  @media (max-width: 900px) {
    margin-bottom: 4rem;
  }
`;

interface HeaderStyleProps {
  mobile: boolean;
}
export const Header = styled.header<HeaderStyleProps>`
  padding: .6rem 0;
  box-shadow: 0 3px 6px -6px #777;
  width: 100%;
  position: fixed;
  top: 0;
  background: ${theme.colors.white};
  z-index: 10;
  @media (max-width: 900px) {
    height: ${(props) => (props.mobile ? '100vh' : '')};
    background: ${(props) => (props.mobile ? 'rgba(0, 0, 0, 0.5)' : 'white')};
  }
`;
export const Nav = styled.nav<HeaderStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-width: 50px;
    width: 100%;
    height: 50px;

    @media (max-width: 900px) {
      height: 30px;
    }
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    li {
      margin-right: 0.5rem;
      a {
        padding: 0.6rem 1rem;
        border-radius: 4px;

        &.active {
          background: ${theme.colors.grey};
        }

        &:hover {
          background: ${theme.colors.grey};
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

    @media (max-width: 900px) {
      display: ${(props) => (props.mobile ? '' : 'none')};
      position: fixed;
      z-index: 10;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      background: whitesmoke;
      flex-direction: column;
      max-height: 30rem;
      padding: 6rem 0;
      animation: ${AnimeTop} 0.3s;

      li {
        margin: 0;

        a {
          display: block;
          text-align: center;
        }
      }
    }
  }
  button {
    z-index: 100;
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 30px;
      height: 30px;
      color: ${theme.colors.base};
      animation: ${Menu} 0.3s forwards;
    }
    @media (min-width: 901px) {
      display: none;
    }
  }
`;
