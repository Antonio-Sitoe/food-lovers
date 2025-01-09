import Card from '../Card/Card';
import Sumary from '../Sumary/Sumary';
import { Container, Links } from '../../styles/styles';
import { DivConfir, Main } from './styles';
import { useRouter } from 'next/router';
import Link from 'next/link';

const FeaturedProductSession = ({ featured }) => {
  const router = useRouter();
  return (
    <Container>
      {featured.featuredData.map(({ title, description, id }, i) => {
        const arr = ['doces', 'salgados'];
        return (
          <div key={id}>
            <Sumary title={title} description={description} />
            <Main>
              {featured.productData[arr[i]].map(({ attributes, id }, index) => {
                if (router.pathname !== '/product' && index >= 4) return null;
                return <Card key={id} attributes={attributes} id={id} />;
              })}
            </Main>
            {router.pathname === '/product' ? null : (
              <DivConfir>
                <Link href='/product'>
                  <Links>Confira Todos</Links>
                </Link>
              </DivConfir>
            )}
          </div>
        );
      })}
    </Container>
  );
};

export default FeaturedProductSession;
