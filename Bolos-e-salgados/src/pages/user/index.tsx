import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
import React from "react";
import UserDataList from "../../components/Usercomponents/UserDataList";
import UserLayout from "../../components/Usercomponents/UserLayout";
import { UserContext } from "../../Context/UserContext";
import checkValidateToken from "../../Helper/checkValidateToken";
import Loading from "../../Helper/Loading";
import { Container } from "../../styles/styles";
import { Subtitle, UserContent } from "../../styles/UserStyles";

const User = () => {
  const { isAuthenticate, user } = React.useContext(UserContext);

  if (isAuthenticate)
    return (
      <>
        <Head>
          <title>Conta de {user.username}</title>
          <meta name="description" content="Minha conta" />
        </Head>
        <Container>
          <UserLayout>
            <UserContent>
              <Subtitle>Dados pessoas</Subtitle>
              <UserDataList />
            </UserContent>
          </UserLayout>
        </Container>
      </>
    );
  return <Loading />;
};

export default User;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = nookies.get(ctx);
  return checkValidateToken(token);
};
