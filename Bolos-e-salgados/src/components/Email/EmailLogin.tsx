import React from "react";
import { BiUser } from "react-icons/bi";
import { UserContext } from "../../Context/UserContext";
import ErrorServer from "../../Helper/ErrorServer";
import useForm from "../../hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { EmailStyle } from "./style";

function EmailLogin({ handleHaveAccount, setOpen }) {
  const { userLogin, error, loading } = React.useContext(UserContext);
  const emailLogin = useForm("email");
  const passwordLogin = useForm();

  async function handleLogin(e) {
    e.preventDefault();
    if (emailLogin.validate() && passwordLogin.validate()) {
      await userLogin(emailLogin.value, passwordLogin.value);
    }
  }
  return (
    <EmailStyle onSubmit={handleLogin}>
      <p>
        Ainda nao possui uma conta,{" "}
        <a href="https://" onClick={handleHaveAccount}>
          clique aqui
        </a>{" "}
      </p>
      <Input
        label="Email"
        type="email"
        placeholder="Digite o seu Email"
        name="emailLogin"
        id="emailLogin"
        {...emailLogin}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Digite a sua senha"
        name="passwordLogin"
        id="passwordLogin"
        {...passwordLogin}
      />
      <Button
        disabled={loading}
        onClick={() =>
          setOpen((anterior) => {
            return { ...anterior, isData: true };
          })
        }
      >
        <BiUser />
        Entrar
      </Button>
      <ErrorServer error={error} />
    </EmailStyle>
  );
}

export default EmailLogin;
