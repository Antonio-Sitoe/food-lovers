import { Title } from '../../styles/styles';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { ContactInforStyle } from './styles';

export default function ContactInfo() {
  return (
    <ContactInforStyle>
      <Title>Loja Online</Title>
      <div>
        <MdLocationOn />
        <ul>
          <li>Rua Ali Perto, 35</li>
          <li>Inhambane - IB</li>
          <li>Mocambique - Terra - Vita Láctea</li>
        </ul>
      </div>
      <div>
        <MdEmail />
        <ul>
          <li>
            <a href='antoniositoehl@gmail.com'>antoniositoehl@gmail.com</a>
          </li>
          <li>
            <a href='https://github.com/Antonio-Sitoe'>Portifolio</a>
          </li>
        </ul>
      </div>
    </ContactInforStyle>
  );
}
