import React from "react";
import Shipping from "../Shipping/Shipping";
import { EmailStyle } from "./style";
import EmailWrapper from "./EmailWrapper";

const Email = ({ setOpen, isAuthenticate, user }) => {
  React.useEffect(() => {
    if (isAuthenticate === true) {
      setOpen((anterior) => {
        return { ...anterior, isData: true };
      });
    }
  }, [isAuthenticate, setOpen]);
  return (
    <Shipping title="Dados do cliente">
      {isAuthenticate ? (
        <EmailStyle>
          <p>Nome: {user.username}</p>
          <p>Email: {user.email}</p>
        </EmailStyle>
      ) : (
        <>
          <EmailWrapper setOpen={setOpen} />
        </>
      )}
    </Shipping>
  );
};

export default Email;
