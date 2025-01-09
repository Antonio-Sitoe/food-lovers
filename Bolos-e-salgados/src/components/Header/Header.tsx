import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Search from '../Search/Search';
import { CgClose, CgMenu } from 'react-icons/cg';
import { HiShoppingCart } from 'react-icons/hi';
import { Container, Links } from '../../styles/styles';
import { Header as HeaderStyle, MarginTops, Nav } from './styles';
import { UserContext } from '../../Context/UserContext';
import ActiveLink from '../NavLink/ActiveLink';
import { CartContext } from '../../Context/CartContext';
import { theme } from '../../styles/theme';

const Header = () => {
  const {
    state: { cart },
  } = React.useContext(CartContext);
  const { user } = React.useContext(UserContext);
  const list = React.useRef<HTMLUListElement | null>(null);
  const [mobile, setMobile] = React.useState(false);
  const openMenu = ({ target }) => {
    if (list.current !== target) setMobile(!mobile);
  };

  function handle({ target }) {
    if (mobile === true && list.current !== target) {
      setMobile(false);
    }
  }
  return (
    <>
      <MarginTops />
      <HeaderStyle mobile={mobile} onClick={handle}>
        <Container>
          <Nav mobile={mobile}>
            <Link href='/'>
              <a>
                <Image
                  src='/logo.svg'
                  alt='logo do site'
                  width={40}
                  height={40}
                />
              </a>
            </Link>
            <Search />
            <ul ref={list}>
              <li>
                <ActiveLink href='/' activeClassName='active'>
                  <a className='nav-link'>Pagina Inicial</a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href='/product' activeClassName='active'>
                  <a className='nav-link'>Produtos</a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href='/about' activeClassName='active'>
                  <a className='nav-link'>Quem Somos</a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href='/contact' activeClassName='active'>
                  <a className='nav-link'>Contato</a>
                </ActiveLink>
              </li>
              <li>
                {user ? (
                  <Link href='/user'>
                    <Links user={user && true}>{user.username}</Links>
                  </Link>
                ) : (
                  <Link href='/login'>
                    <Links>Entrar | Criar</Links>
                  </Link>
                )}
              </li>
              <li>
                {cart.length ? (
                  <Link href='/cart'>
                    <Links
                      user={cart.length ? true : false}
                      point={cart.length ? theme.colors.buyBtn : 'none'}
                    >
                      <HiShoppingCart />
                    </Links>
                  </Link>
                ) : (
                  <Link href='/cart'>
                    <Links>
                      <HiShoppingCart />
                    </Links>
                  </Link>
                )}
              </li>
            </ul>
            <button onClick={openMenu}>
              {mobile ? <CgClose /> : <CgMenu />}
            </button>
          </Nav>
        </Container>
      </HeaderStyle>
    </>
  );
};

export default Header;
