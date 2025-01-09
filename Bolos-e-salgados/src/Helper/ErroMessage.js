import { Container } from '../styles/styles';
import { ErrorStyle } from './styles';
import { RiCake3Line } from 'react-icons/ri';

const ErroMessage = ({ error }) => {
  return (
    <Container>
      <ErrorStyle>
        <div>
          <RiCake3Line />
          <h1>{error}</h1>
          <p>Verifique a sua ligacao a internet</p>
        </div>
      </ErrorStyle>
    </Container>
  );
};

export default ErroMessage;
