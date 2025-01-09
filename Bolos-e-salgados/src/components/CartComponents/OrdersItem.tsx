import React from 'react';
import Link from 'next/link';
import { Orders } from './styles';

const OrdersItems = ({ cart, total }) => {
  if (cart.length)
    return (
      <>
        <Orders>
          <div>
            <h1>Resumo da Encomenda</h1>
            <ul>
              {cart.map(({ id, name, quantity, price }) => {
                return (
                  <li key={id}>
                    <span>{name}</span>
                    <span>{quantity}x</span>
                    <span>{price},MT</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>
              Total <span>{total},MT</span>
            </h2>
            <p>Incluindo taxas de entregas de produtos</p>

            <Link href='/checkout'>
              <a>Finalizar a compra</a>
            </Link>
          </div>
        </Orders>
      </>
    );
  return null;
};

export default OrdersItems;
