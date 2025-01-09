import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ProductInformation from "../../components/ProductInformation/ProductInformation";
import Slide from "../../components/Slide/Slide";
import ErroMessage from "../../Helper/ErroMessage";
import Loading from "../../Helper/Loading";
import useFecth from "../../hooks/useFecth";
import { GET_PRODUTS_FOR_ID } from "../../services/Api";
import { Container } from "../../styles/styles";
import { IshowImageArray } from "../../Types/Interfaces";
import { Main, ProdutoStyle } from "../../styles/Productstyles";

const SinglePage = () => {
  const [showImage, setImage] = React.useState<IshowImageArray>([]);
  const { data, error, loading, request } = useFecth();
  const { query } = useRouter();

  React.useEffect(() => {
    (async () => {
      const { url, options } = GET_PRODUTS_FOR_ID(query.id);
      await request(url, options);
    })();
  }, [request, query]);

  React.useEffect(() => {
    if (data) setImage(data.data.attributes.image.data);
  }, [data]);

  if (error) return <ErroMessage error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <>
        <Head>
          <title>{data.data.attributes.name}</title>
          <meta name="description" content="Minha conta" />
        </Head>
        <ProdutoStyle>
          <Container>
            <Main>
              <section>
                <Slide slide={showImage} />
              </section>
              <ProductInformation data={data.data} showImage={showImage} />
            </Main>
          </Container>
        </ProdutoStyle>
      </>
    );
  }
  return <ErroMessage error={error} />;
};

export default SinglePage;
