import React from 'react';
import { ActionType, ICartContent } from '../../Cart/types/Types';
import { QuantityStyle } from '../ProductInformation/styles';
import { CartContext } from '../../Context/CartContext';

interface IQuantity {
  item: ICartContent;
}
const QuantityContainer = ({ item }: IQuantity) => {
  const [count, setCount] = React.useState(item.quantity);
  const { dispatch } = React.useContext(CartContext);

  function IncrementalUpdateQuantityAndPrice() {
    setCount((count) => count + 1);
    dispatch({
      type: ActionType.ADD_CART,
      content: {
        id: item.id,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: count + 1,
        priceUnit: item.priceUnit,
      },
    });
  }
  function DecrementUpdateQuantityAndPrice() {
    setCount((count) => count - 1);
    dispatch({
      type: ActionType.REMOVE_CART,
      content: {
        id: item.id,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: count,
        priceUnit: item.priceUnit,
      },
    });
  }

  return (
    <QuantityStyle>
      <span>{count}</span>
      <button id='decrement' onClick={DecrementUpdateQuantityAndPrice}>
        -
      </button>
      <button id='increment' onClick={IncrementalUpdateQuantityAndPrice}>
        +
      </button>
    </QuantityStyle>
  );
};

export default QuantityContainer;
