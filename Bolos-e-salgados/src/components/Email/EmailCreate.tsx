import React from "react";
import { BiUser } from "react-icons/bi";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { EmailStyle } from "./style";
import useForm from "../../hooks/useForm";
import { UserContext } from "../../Context/UserContext";
import ErrorServer from "../../Helper/ErrorServer";

const EmailCreate = ({ setOpen, handleHaveAccount }) => {
  const { userRegister, error, loading } = React.useContext(UserContext);

  const name = useForm("name");
  const emailCreate = useForm("email");
  const passwordCreate = useForm("password");

  async function handleCreateAccount(e) {
    e.preventDefault();
    if (
      name.validate() &&
      emailCreate.validate() &&
      passwordCreate.validate()
    ) {
      await userRegister(name.value, emailCreate.value, passwordCreate.value);
    }
  }

  return (
    <EmailStyle onSubmit={handleCreateAccount}>
      <p>
        Ja tenho uma conta ? entao{" "}
        <a href="https://" onClick={handleHaveAccount}>
          clique aqui
        </a>
      </p>
      <Input
        error={name.error}
        onBlur={name.onBlur}
        value={name.value}
        onChange={name.onChange}
        label="Nome"
        type="text"
        placeholder="Digite o seu Nome"
        name="name"
        id="name"
      />
      <Input
        label="Email"
        type="email"
        placeholder="Digite o seu Email"
        name="emailCreate"
        id="emailCreate"
        error={emailCreate.error}
        onBlur={emailCreate.onBlur}
        value={emailCreate.value}
        onChange={emailCreate.onChange}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Digite a sua senha"
        name="passwordCreate"
        id="passwordCreate"
        error={passwordCreate.error}
        onBlur={passwordCreate.onBlur}
        value={passwordCreate.value}
        onChange={passwordCreate.onChange}
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
        Criar conta
      </Button>

      <ErrorServer error={error} />
    </EmailStyle>
  );
};

export default EmailCreate;
