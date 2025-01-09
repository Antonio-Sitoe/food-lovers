import Head from "next/head";
import Link from "next/link";
import React from "react";
import { BiArrowBack, BiKey } from "react-icons/bi";
import Button from "../../../components/Forms/Button";
import Input from "../../../components/Forms/Input";
import LoginLayault from "../../../components/LoginLayault/LoginLayault";
import useForm from "../../../hooks/useForm";
import useVerifyToken from "../../../hooks/useVerifyToken";
import { FORGOTTEN_PASSWORD } from "../../../services/Api";
import { Title } from "../../../styles/styles";
import { LoginGet as Login } from "../../../styles/Loginstyles";

const ForgotPassword = () => {
  const { verifyToken } = useVerifyToken();
  const email = useForm("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { url, options } = FORGOTTEN_PASSWORD({
      email: "devtalksmz@gmail.com",
    });
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((json) => console.log(json))

      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };
  React.useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <>
      <Head>
        <title>Mila Delicious | Esqueceu a senha</title>
        <meta name="description" content="Esqueceu a senha" />
      </Head>
      <LoginLayault>
        <Login onSubmit={handleSubmit}>
          <Title>Recuperar senha</Title>
          <p>
            Para recuperar a sua senha, digite o seu email no campo abaixo !
            apos clicar em enviar ira receber um e-mail dentro de instantes
          </p>
          <Input
            type="email"
            placeholder="Digite o seu email"
            name="email"
            label="Email"
            id="email"
            error={email.error}
            onBlur={email.onBlur}
            onChange={email.onChange}
            value={email.value}
          />
          <Button>
            <BiKey /> Enviar
          </Button>
          <Link href={"/login"}>
            <a href={"/login"}>
              <BiArrowBack /> Voltar para Login
            </a>
          </Link>
        </Login>
      </LoginLayault>
    </>
  );
};

export default ForgotPassword;
