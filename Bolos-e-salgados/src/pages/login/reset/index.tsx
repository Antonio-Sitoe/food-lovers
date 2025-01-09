import Link from "next/link";
import React from "react";
import { BiKey } from "react-icons/bi";
import Button from "../../../components/Forms/Button";
import Input from "../../../components/Forms/Input";
import LoginLayault from "../../../components/LoginLayault/LoginLayault";
import { Title } from "../../../styles/styles";
import { LoginGet as Login } from "../../../styles/Loginstyles";

import { BiArrowBack } from "react-icons/bi";
import useForm from "../../../hooks/useForm";
import { FORGOTTEN_PASSWORD } from "../../../services/Api";

import Head from "next/head";
import useVerifyToken from "../../../hooks/useVerifyToken";
const ResetPassword = () => {
  const { verifyToken } = useVerifyToken();
  const password = useForm("password");
  const passConfirm = useForm("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { url, options } = FORGOTTEN_PASSWORD({
      email: "antoniositoehl@gmail.com",
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
        <title>Mila Delicious | Recuperar a senha</title>
        <meta name="description" content="Faca o Login" />
      </Head>
      <LoginLayault>
        <Login onSubmit={handleSubmit}>
          <Title>Redifinir a senha</Title>
          <Input
            label="Senha"
            name="senha"
            type="password"
            placeholder="Digite o sua senha"
            id="senha"
            error={password.error}
            onBlur={password.onBlur}
            onChange={password.onChange}
            value={password.value}
          />
          <Input
            name="confirme"
            label="Confirme a senha"
            type="password"
            placeholder="Confirme a sua senha"
            {...passConfirm}
            id="confirme"
            error={passConfirm.error}
            onBlur={passConfirm.onBlur}
            onChange={passConfirm.onChange}
            value={passConfirm.value}
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

export default ResetPassword;
