import React from 'react';
import { UserContext } from '../../Context/UserContext';
import { Container, Title } from '../../styles/styles';
import { UserDash, UserIntro, UserMain, UserPage } from './styles';
import ModalAlert from '../ModalAlert/ModalAlert';
import ActiveLink from '../NavLink/ActiveLink';

const routes = [
  {
    href: '/user',
    name: 'Dados',
  },
  {
    href: '/user/order',
    name: 'Meus pedidos',
  },
];

const UserLayout = ({ children }) => {
  const [modal, setModal] = React.useState(false);

  const { UserLogout, user } = React.useContext(UserContext);
  function handleLogout() {
    setModal(true);
  }
  function handleLogoutModal() {
    setModal(false);
    UserLogout();
    window.location.reload();
  }

  return (
    <>
      <ModalAlert
        title={'Tem Certeza que quer sair ?'}
        modal={modal}
        setModal={setModal}
        handleLogoutModal={handleLogoutModal}
      />
      <Container>
        <UserPage>
          <UserIntro>
            <Title>Bem vindo, {user.username} </Title>
          </UserIntro>
          <UserMain>
            <UserDash>
              <ul>
                {routes.map(({ name, href }, index) => {
                  return (
                    <li key={index}>
                      <ActiveLink href={href} activeClassName='active'>
                        <a className='nav-link' href={href}>{name}</a>
                      </ActiveLink>
                    </li>
                  );
                })}
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
              </ul>
            </UserDash>
            {children}
          </UserMain>
        </UserPage>
      </Container>
    </>
  );
};

export default UserLayout;
