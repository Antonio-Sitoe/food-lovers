import React from 'react';
import CartsItems from '../../components/CartComponents/CartsItems';
import OrdersItems from '../../components/CartComponents/OrdersItem';
import { CartContext } from '../../Context/CartContext';
import { CartStyle, Main, MessageContainer } from '../../styles/CartStyles';
import { Container } from '../../styles/styles';
import Head from 'next/head';

const Cart = () => {
  const { state, total } = React.useContext(CartContext);
  return (
    <>
      <CartStyle>
        <Container>
          {state.cart.length > 0 ? (
            <Main>
              <CartsItems cart={state.cart} />
              <OrdersItems cart={state.cart} total={total} />
            </Main>
          ) : (
            <MessageContainer>
              <p>O carrinho esta vazio</p>
            </MessageContainer>
          )}
        </Container>
      </CartStyle>
      <Head>
        <title>Carrinho de compra | Mila Delicious</title>
        <meta
          name='description'
          content={`Certifique se de nao deixar os produtos no carrinho por muito tempo`}
        />
      </Head>
    </>
  );
};

export default Cart;
