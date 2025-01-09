import Link from 'next/link';
import { Container, Title } from '../../styles/styles';
import { CopyRight, FirstSection, Wrapper } from './styles';

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <FirstSection>
          <div>
            <ul>
              <li>
                {' '}
                <Link href='/product'>
                  <a>Produto</a>
                </Link>{' '}
              </li>
              <li>
                {' '}
                <Link href='/about'>Quem somos</Link>{' '}
              </li>
            </ul>
            <main>
              <Link href='/'>
                <a>
                  <Title>Mila Delicious</Title>
                </a>
              </Link>
            </main>
            <ul>
              <li>
                <Link href='/contact'>
                  <a href=''>Contato</a>
                </Link>
              </li>
              <li>
                <Link href='/faq'>
                  <a>Como Encomendar</a>
                </Link>
              </li>
            </ul>
          </div>
        </FirstSection>
        <CopyRight>
          <li>{new Date().getFullYear()}</li>
          <li> | </li>
          <li>Todos direitos reservados </li>
          <li> | </li>
          <li>NobleStack</li>
        </CopyRight>
      </Container>
    </Wrapper>
  );
};

export default Footer;
