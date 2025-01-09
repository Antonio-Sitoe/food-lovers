import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import IntroOnPage from "../../components/IntroOnPage/IntroOnPage";
import ErroMessage from "../../Helper/ErroMessage";
import FetchData from "../../Helper/FetchData";
import { GET_FAQ } from "../../services/Api";
import { Container, Title } from "../../styles/styles";
import { IFaqProps } from "../../Types/Interfaces";
import { Faq as FaqStyle, FaqContent, FaqImage, Faqs } from "../../styles/faqstyle";

const Faq = ({ data, error }: IFaqProps) => {
  if (error) {
    return <ErroMessage error={'Falha ao buscar os dados'} />;
  }
  return (
    <>
      <Head>
        <title>Perguntas Frequentes | Mila Delicious</title>
        <meta name="description" content={data.banner.banner_title} />
      </Head>
      <IntroOnPage
        text={data.banner.banner_title}
        Bg={data.banner.banner_image.url}
      />
      <Container>
        <Faqs>
          {data.content.map(({ id, description, image, title }) => {
            return (
              <FaqStyle key={id}>
                <FaqImage>
                  <Image
                    width={300}
                    height={300}
                    alt={image.alt}
                    src={image.url}
                  />
                </FaqImage>
                <FaqContent>
                  <Title>{title}</Title>
                  <p>{description}</p>
                </FaqContent>
              </FaqStyle>
            );
          })}
        </Faqs>
      </Container>
    </>
  );
};

export default Faq;
function transformerFaqData(data) {
  const contents = data.content.map(({ id, title, description, image }) => {
    return {
      title,
      image: {
        url: image.data.attributes.url,
        alt: image.data.attributes.alternativeText,
      },
      id,
      description,
    };
  });
  return {
    banner: {
      banner_title: data.Banner.banner_title,
      banner_image: {
        url: data.Banner.banner_image.data.attributes.url,
        alt: data.Banner.banner_image.data.attributes.alternativeText,
      },
    },
    content: contents,
  };
}
export const getStaticProps: GetStaticProps = async () => {
  const faqContent = GET_FAQ();
  try {
    const { data } = await FetchData(faqContent);
    return {
      props: {
        data: transformerFaqData(data.attributes),
        error: false,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};
