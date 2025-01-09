import React from "react";
import Button from "../Forms/Button";
import { ButtonEdit, DataStyle, SectionFlex } from "./styles";
import Shipping from "../Shipping/Shipping";
import Textearea from "../Forms/Textearea";
import ErrorServer from "../../Helper/ErrorServer";
import { OrderContext } from "../../Context/OrderContext";

const Data = ({ user, open, setOpen, message }: any) => {
  const { setOrderData } = React.useContext(OrderContext);
  const [showError, setShowError] = React.useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.value) {
      setOpen((anterior) => {
        return { ...anterior, isPayments: true, isData: false };
      });
      setShowError("");
      setOrderData((preview) => ({ ...preview, message: message.value }));
    } else {
      setShowError("Digite qualquer coisa");
    }
  };

  return (
    <Shipping title="Dados Adicionais">
      {!open.isData === true ? (
        <>
          {!open.isPayments ? (
            <p>Prencha o campo com uma messagem de descricao.</p>
          ) : (
            <SectionFlex>
              <div>
                <p>
                  <strong>Endereco</strong> {user.endereco}
                </p>
                <p>
                  <strong>Empresa</strong> {user.empresa}
                </p>
                <p>
                  <strong>Messagem</strong> {message.value}
                </p>
              </div>
              <ButtonEdit
                onClick={() => {
                  setOpen((anterior) => {
                    return { ...anterior, isData: true };
                  });
                }}
              >
                Editar
              </ButtonEdit>
            </SectionFlex>
          )}
        </>
      ) : (
        <DataStyle onSubmit={handleSubmit}>
          <Textearea
            name="observer"
            id="obsver"
            error={message.error}
            onChange={message.onChange}
            value={message.value}
          />
          <Button>Atualizar</Button>
          <ErrorServer error={showError} />
        </DataStyle>
      )}
    </Shipping>
  );
};

export default Data;
