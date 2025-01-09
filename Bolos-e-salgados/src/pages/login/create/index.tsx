import React from "react";
import Button from "../../../components/Forms/Button";
import Input from "../../../components/Forms/Input";
import { Title } from "../../../styles/styles";
import { BiUser } from "react-icons/bi";
import { LoginGet as Login } from "../../../styles/Loginstyles";
import router from "next/router";
import ErrorServer from "../../../Helper/ErrorServer";
import { UserContext } from "../../../Context/UserContext";
import useForm from "../../../hooks/useForm";
import LoginLayault from "../../../components/LoginLayault/LoginLayault";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import useVerifyToken from "../../../hooks/useVerifyToken";
import Head from "next/head";

const LoginCreate = () => {
  const { error, userRegister, loading, setError } =
    React.useContext(UserContext);
  const { verifyToken } = useVerifyToken();
  const name = useForm("name");
  const email = useForm("email");
  const password = useForm("password");
  const passConfirm = useForm("password");

  React.useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.validate() && email.validate() && password.validate()) {
      if (password.value === passConfirm.value) {
        await userRegister(name.value, email.value, password.value);
        router.push("/user");
        return true;
      } else {
        setError("As senhas não coincidem, tente novamente");
        return false;
      }
    }
  };

  return (
    <>
      <Head>
        <title>Mila Delicious | Criar conta</title>
        <meta name="description" content="Faca o Login" />
      </Head>
      <LoginLayault>
        <Login onSubmit={handleSubmit}>
          <Title>Crie sua conta</Title>

          <ErrorServer error={error} />
          <Input
            name="nome"
            label="Nome"
            id="name"
            placeholder="Digite o seu nome"
            error={name.error}
            onBlur={name.onBlur}
            onChange={name.onChange}
            type="text"
            value={name.value}
          />
          <Input
            name="Email"
            label="Email"
            id="email"
            placeholder="Digite o seu Email"
            type="email"
            error={email.error}
            onBlur={email.onBlur}
            onChange={email.onChange}
            value={email.value}
          />
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

          <Button disabled={loading}>
            <BiUser />
            Criar conta
          </Button>
          <Link href={"/login"}>
            <a href={`/login`}>
              <BiArrowBack /> Voltar para Login
            </a>
          </Link>
        </Login>
      </LoginLayault>
    </>
  );
};

export default LoginCreate;
