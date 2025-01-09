import { GetStaticProps } from "next";
import React from "react";
import Banner from "../components/Banner/banner";
import CupCakeSession from "../components/CupCakeSession/CupCakeSession";
import ErroMessage from "../Helper/ErroMessage";
import FetchData from "../Helper/FetchData";
import { ResponseData } from "../Helper/ResponseData";
import transformData from "../Helper/transformData";
import { GET_ALL_PRODUCTS, GET_HOME_CONTENT } from "../services/Api";
import { IPagesProps } from "../Types/Interfaces";
import FeaturedProductSession from "../components/homeComponents/FeaturedProductSession";
import PartykitSession from "../components/homeComponents/PartykitSession";
import Head from "next/head";

const Home = (props: IPagesProps) => {
  if (props.error) {
    return <ErroMessage error={"Erro no Servidor"} />;
  }
  return (
    <>
      <Head>
        <title>Pagina Inicial | Mila Delicious </title>
        <meta name="description" content="Pagina inicial" />
      </Head>
      <Banner bannerProprietes={props.banner} />
      <FeaturedProductSession featured={props.featured} />
      <PartykitSession kit={props.kit} />
      <CupCakeSession cupCakeData={props.featured.productData.cup} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const homeOptions = GET_HOME_CONTENT(1);
  const productsOptions = GET_ALL_PRODUCTS();

  try {
    const json = await FetchData(homeOptions);
    const produtData = await FetchData(productsOptions);
    const produtDataJson = transformData(produtData.data);

    const data = ResponseData(json, produtDataJson);
    return {
      props: data,
      revalidate: 30,
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};
