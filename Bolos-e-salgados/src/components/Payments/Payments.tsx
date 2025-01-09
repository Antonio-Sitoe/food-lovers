import React from "react";
import Input from "../Forms/Input";
import { PaymentsStyle } from "./styles";
import Shipping from "../Shipping/Shipping";
import useForm from "../../hooks/useForm";
import { OrderContext } from "../../Context/OrderContext";
import { parseCookies } from "nookies";
import { CREATE_ORDER } from "../../services/Api";
import useFetch from "../../hooks/useFecth";
import { toast } from "react-toastify";
import router from "next/router";

const Payments = ({ open }) => {
  const { request, loading } = useFetch();
  const { setOrderData, orderData } = React.useContext(OrderContext);
  const number = useForm(false);

  async function SendOrderTransation() {
    const { token } = parseCookies();
    if (token) {
      const { url, options } = CREATE_ORDER(
        {
          data: orderData,
        },
        token
      );
      const { response } = await request(url, options);
      const functionThatReturnPromise = () =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (response?.ok) {
              resolve("Promessa resolvida");
              window.localStorage.clear();
              router.push("/sucess");
            } else reject("Promessa rejeitada");
          }, 3000)
        );
      toast.promise(functionThatReturnPromise, {
        pending: "A processar a transacao",
        success: "Compra Efetuada com sucesso 👌",
        error: "Houve um Erro na compra 🤯",
      });
    }
  }

  async function handleSubmit() {
    if (number.value) {
      const confirm = window.confirm("Tem certeza que quer efetuar a compra?");
      if (confirm) await SendOrderTransation();
    }
  }
  function handleBlur() {
    setOrderData({ ...orderData, number: number.value });
  }

  return (
    <>
      <Shipping title="Pagamentos">
        {open.isPayments === true ? (
          <PaymentsStyle>
            <p>Numero para efetuar o pagamento (MPESA)</p>
            <Input
              error={number.error}
              name="number"
              onBlur={handleBlur}
              onChange={number.onChange}
              value={number.value}
              type="number"
              id="number"
              label="Numero de Mpesa"
              placeholder="848984953"
            />
            <button onClick={handleSubmit} disabled={loading}>
              Finalizar a compra
            </button>
          </PaymentsStyle>
        ) : (
          <p>Complete os passos anterior</p>
        )}
      </Shipping>
    </>
  );
};

export default Payments;
