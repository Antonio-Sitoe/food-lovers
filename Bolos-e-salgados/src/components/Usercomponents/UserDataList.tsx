import React from 'react';
import Link from 'next/link';
import { List } from './styles';
import { UserContext } from '../../Context/UserContext';
import { FiEdit } from 'react-icons/fi';

const UserDataList = () => {
  const { user } = React.useContext(UserContext);
  return (
    <List>
      <ul>
        <li>
          <p>
            <strong>Nome do usuario:</strong> {user.username}
          </p>
        </li>
        <li>
          <p>
            <strong>Email:</strong> {user.email || '---'}
          </p>
        </li>
        <li>
          <p>
            <strong>Empresa (opcional):</strong> {user.empresa || '---'}
          </p>
        </li>
        <li>
          <p>
            <strong>Endereco :</strong> {user.endereco || '---'}
          </p>
        </li>
        <li>
          <p>
            <strong>Cidade e regiao:</strong> {user.cidade || '---'}
          </p>
        </li>
      </ul>
      <div>
        <Link href='/user/edit'>
          <a href={'/user/edit'}>
            <FiEdit /> Editar
          </a>
        </Link>
      </div>
    </List>
  );
};

export default UserDataList;
