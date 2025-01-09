import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { Links, Title } from "../../styles/styles";

const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    margin: 4rem auto;
    padding: 1rem;
    width: 100%;
    max-width: 600px;
    text-align: center;

    a {
      padding: 1rem;
      margin: 1rem 0;
      background: #73d064;
    }
  }
`;

const Sucess = () => {
  const { user } = React.useContext(UserContext);

  return (
    <Main>
      <div>
        <Title>Obrigado Pela compra {user?.username}</Title>
        <Image src={"/Success_Icon.svg"} alt="s" width={200} height={300} />
        <p>
          Obrigado pela escolha da Mila delicios, veja mais produtos clicando no
          butao abaixo
        </p>
        <Link href={"/product"}>
          <Links>Lista de produtos</Links>
        </Link>
      </div>
    </Main>
  );
};

export default Sucess;
