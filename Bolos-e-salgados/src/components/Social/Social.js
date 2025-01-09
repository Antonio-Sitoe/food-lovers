import { Container, Title } from "../../styles/styles";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Wrapper } from "./styles";

const Social = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Siga nas Redes Socias</Title>
        <ul>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <BsInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://web.facebook.com/antonio.sitoe.372019"
              target="_blank"
              rel="noreferrer"
            >
              <BsFacebook />{" "}
            </a>
          </li>
          <li>
            <a href="https://twitter.com/AntonioSitoe533" target="_blank" rel="noreferrer">
              <BsTwitter />{" "}
            </a>
          </li>
        </ul>
      </Container>
    </Wrapper>
  );
};

export default Social;
