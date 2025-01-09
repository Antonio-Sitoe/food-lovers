import React from "react";
import Button from "../../../components/Forms/Button";
import Input from "../../../components/Forms/Input";
import { Label } from "../../../components/Forms/styles";
import useForm from "../../../hooks/useForm";

import router from "next/router";
import ErrorServer from "../../../Helper/ErrorServer";
import useFecth from "../../../hooks/useFecth";
import { GET_USERDATA, USERDATA_UPDATE } from "../../../services/Api";

import UserLayout from "../../../components/Usercomponents/UserLayout";
import { UserContext } from "../../../Context/UserContext";
import Loading from "../../../Helper/Loading";

import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies, { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { theme } from "../../../styles/theme";
import { UserAcountEditStyle } from "../../../styles/UserStyles";

const UserAccountEdit = ({ user, errorSer }) => {
  const { isAuthenticate, error: ErrorSer } = React.useContext(UserContext);
  const nome = useForm("name", user.username);
  const email = useForm("email", user.email);
  const empresa = useForm(false, user.empresa);
  const endereco = useForm(false, user.endereco);
  const cidade = useForm(false, user.cidade);
  const { request, loading, error } = useFecth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nome.validate() &&
      email.validate() &&
      endereco.validate() &&
      cidade.validate()
    ) {
      const { token } = parseCookies();
      const { url, options } = USERDATA_UPDATE(user.id, token, {
        cidade: cidade.value,
        email: email.value,
        empresa: empresa.value || " ",
        endereco: endereco.value,
        username: nome.value,
      });
      const { response } = await request(url, options);
      if (response && response.ok) {
        router.push("/user");
      } else {
        toast.warn("Falha ao atualizar os dados");
      }
    }
  };

  if (isAuthenticate === false || loading) return <Loading />;
  if (errorSer) return <ErrorServer error={"Erro no servidor"} />;

  return (
    <>
      <Head>
        <title>Pedidos de {user.username}</title>
        <meta name="description" content="Minha conta" />
      </Head>
      <UserLayout>
        <UserAcountEditStyle onSubmit={handleSubmit}>
          {ErrorSer && <ErrorServer error={ErrorSer} />}
          <Input
            label="Nome"
            placeholder="Digite o seu nome"
            type="text"
            name="nome"
            id="nome"
            error={nome.error}
            onBlur={nome.onBlur}
            onChange={nome.onChange}
            value={nome.value}
          />
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
          <Input
            label="Empresa / Organizacao (opcional)"
            placeholder="Digite a sua empresa"
            type="text"
            name="empresa"
            id="empresa"
            error={empresa.error}
            onBlur={empresa.onBlur}
            onChange={empresa.onChange}
            value={empresa.value}
          />
          <Input
            label="Endereco"
            placeholder="Digite o seu endereco"
            type="text"
            name="endereco"
            id="endereco"
            error={endereco.error}
            onBlur={endereco.onBlur}
            onChange={endereco.onChange}
            value={endereco.value}
          />
          <Label>Cidade</Label>
          <select
            name="cidade"
            id="cidade"
            value={cidade.value}
            onChange={cidade.onChange}
          >
            <option disabled>Selecione a cidade</option>
            <option value="Matola">Matola</option>
            <option value="Maputo cidade">Maputo cidade</option>
            <option value="Boane">Boane</option>
            <option value="Magude">Magude</option>
            <option value="Manhiça">Manhiça</option>
            <option value="Marracuene">Marracuene</option>
            <option value="Moamba">Moamba</option>
            <option value="Namaacha">Namaacha</option>
          </select>
          {loading ? (
            <Button
              disabled={loading}
              style={{ background: `${theme.colors.black} ` }}
            >
              ...Carregando
            </Button>
          ) : (
            <Button style={{ background: `${theme.colors.black} ` }}>
              Gravar
            </Button>
          )}
          <ErrorServer error={error} />
        </UserAcountEditStyle>
      </UserLayout>
    </>
  );
};
export default UserAccountEdit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = nookies.get(ctx);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  try {
    const { url, options } = GET_USERDATA(token);
    const response = await fetch(url, options);
    const json = await response.json();
    return {
      props: {
        errorSer: false,
        user: json,
      },
    };
  } catch (er) {
    return {
      props: { errorSer: true },
    };
  }
};
