import { GetServerSideProps } from "next";
import Head from "next/head";
import CupCakeSession from "../../components/CupCakeSession/CupCakeSession";
import FeaturedProductSession from "../../components/homeComponents/FeaturedProductSession";
import IntroOnPage from "../../components/IntroOnPage/IntroOnPage";
import ErroMessage from "../../Helper/ErroMessage";
import FetchData from "../../Helper/FetchData";
import { ResponseData } from "../../Helper/ResponseData";
import transformData from "../../Helper/transformData";
import { GET_ALL_PRODUCTS, GET_HOME_CONTENT } from "../../services/Api";
import { IPagesProps } from "../../Types/Interfaces";
import { ProdutoStyle } from "../../styles/Productstyles";

function product(props: IPagesProps) {
  if (props.error) {
    return <ErroMessage error={"Erro"} />;
  }
  return (
    <>
      <Head>
        <title>Todos os produtos</title>
        <meta name="description" content="Minha conta" />
      </Head>
      <ProdutoStyle>
        <IntroOnPage
          text={props.banner.banner_title}
          Bg={props.banner.Banner_img}
        />
        <FeaturedProductSession featured={props.featured} />
        <CupCakeSession cupCakeData={props.featured.productData.cup} />
      </ProdutoStyle>
    </>
  );
}
export default product;

export const getServerSideProps: GetServerSideProps = async () => {
  const bannerContent = GET_HOME_CONTENT(2);
  const productsOptions = GET_ALL_PRODUCTS();
  try {
    const { data } = await FetchData(productsOptions);
    const bannerData = await FetchData(bannerContent);
    const produtDataJson = transformData(data);

    if (data && bannerData && produtDataJson) {
      const response = ResponseData(bannerData, produtDataJson);
      return {
        props: response,
      };
    }
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};
