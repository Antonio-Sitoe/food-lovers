import React from "react";
import IntroOnPage from "../../components/IntroOnPage/IntroOnPage";
import { Container } from "../../styles/styles";
import { CheckoutStyle, Main } from "../../styles/CheckoutStyles";
import Email from "../../components/Email/Email";
import Data from "../../components/Data/Data";
import Payments from "../../components/Payments/Payments";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { Orders } from "../../components/CartComponents/styles";
import Loading from "../../Helper/Loading";
import Head from "next/head";
import useForm from "../../hooks/useForm";
import { IOpen } from "../../Types/Interfaces";
import { OrderContext } from "../../Context/OrderContext";
import router from "next/router";
const Checkout = () => {
  const message = useForm(false);
  const { setOrderData } = React.useContext(OrderContext);
  const { isAuthenticate, user, loading } = React.useContext(UserContext);
  const [open, setOpen] = React.useState<IOpen>({
    isData: false,
    isPayments: false,
  });
  const {
    state: { cart },
    total,
  } = React.useContext(CartContext);

  React.useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart.length]);

  React.useEffect(() => {
    const order = cart?.map(({ image, name, price, quantity, priceUnit }) => ({
      image,
      name,
      price,
      quantity,
      priceUnit,
    }));
    if (isAuthenticate) {
      setOrderData((preview) => {
        return { ...preview, order, total, client_id: user.id };
      });
    }
  }, [isAuthenticate, cart, setOrderData, user, total]);

  if (loading) return <Loading />;
  return (
    <>
      <CheckoutStyle>
        <IntroOnPage text="Confira os dados antes de efetuar a compra" Bg="" />
        <Container>
          <Main>
            <div>
              <Email
                user={user}
                setOpen={setOpen}
                isAuthenticate={isAuthenticate}
              />

              <Data
                message={message}
                setOpen={setOpen}
                user={user}
                open={open}
              />
              <Payments open={open} />
            </div>
            <Orders>
              <div>
                <h1>Resumo da Encomenda</h1>
                <ul>
                  {cart?.map(({ id, price, quantity, name }) => {
                    return (
                      <li key={id}>
                        <span>{name}</span>
                        <span>{quantity} x</span>
                        <span>{price}, MT</span>
                      </li>
                    );
                  })}
                </ul>
                <main>
                  <span>Total a pagar:</span> {total},MT
                </main>
              </div>
            </Orders>
          </Main>
        </Container>
      </CheckoutStyle>
      <Head>
        <title>Finalizando a compra | Mila Delicious</title>
        <meta
          name="description"
          content="Confira os dados antes de efetuar a compra"
        />
      </Head>
    </>
  );
};

export default Checkout;
