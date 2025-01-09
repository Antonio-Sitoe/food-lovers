import { GetStaticProps } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import IntroOnPage from "../../components/IntroOnPage/IntroOnPage";
import ErroMessage from "../../Helper/ErroMessage";
import FetchData from "../../Helper/FetchData";
import { GET_ABOUT_CONTENT } from "../../services/Api";
import { AboutStyle, Content } from "../../styles/Aboutstyles";

const About = ({ error, data }) => {
  if (error) {
    return <ErroMessage error={"Falha na conexao"} />;
  }
  return (
    <>
      <Head>
        <title>Sobre | Mila Delicious</title>
        <meta
          name="description"
          content={`Pagina sobre, saiba tudo sobre ${data.title}`}
        />
      </Head>
      <IntroOnPage text={data.title} Bg={data.banner_img} />
      <AboutStyle>
        {data.content.map(({ id, about }) => {
          return (
            <Content key={id}>
              <ReactMarkdown>{about}</ReactMarkdown>
            </Content>
          );
        })}
      </AboutStyle>
    </>
  );
};

export default About;

function tranformData(data) {
  return {
    title: data.attributes.title,
    content: data.attributes.content,
    banner_img: data.attributes.banner_img.data.attributes.url,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const aboutData = GET_ABOUT_CONTENT();

  try {
    const data = await FetchData(aboutData);
    return {
      props: {
        data: tranformData(data?.data),
        error: false,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {
        error: true,
      },
    };
  }
};
