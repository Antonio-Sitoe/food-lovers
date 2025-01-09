import React from 'react';
import { FaTrashRestore } from 'react-icons/fa';
import { Carts, CartsContainer, CartsFooter, CartsHeader } from './styles';
import Image from 'next/image';
import QuantityContainer from './QuantityContainer';
import { CartContext } from '../../Context/CartContext';
import { ActionType } from '../../Cart/types/Types';

const CartsItems = ({ cart }) => {
  const { dispatch } = React.useContext(CartContext);

  function handleDelete(item) {
    const confirm = window.confirm('Deseja apagar esses items do carrinho ?');
    if (confirm) {
      dispatch({
        type: ActionType.REMOVE_CARTS_ITEMS,
        content: {
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          priceUnit: item.priceUnit,
        },
      });
    }
  }

  if (cart.length)
    return (
      <Carts>
        {cart.map((item) => {
          return (
            <li key={item.id}>
              <Image
                src={item.image}
                alt='imagem do produto'
                width={352}
                height={300}
              />
              <CartsContainer>
                <CartsHeader>
                  <div>
                    <h2>{item.name}</h2>
                  </div>
                  <aside onClick={() => handleDelete(item)}>
                    <FaTrashRestore />
                  </aside>
                </CartsHeader>
                <CartsFooter>
                  <QuantityContainer item={item} />
                  <p>{item.price},MT</p>
                </CartsFooter>
              </CartsContainer>
            </li>
          );
        })}
      </Carts>
    );
  return null;
};

export default CartsItems;
