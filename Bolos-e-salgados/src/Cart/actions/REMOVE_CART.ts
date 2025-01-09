import { ICartContent, IState } from "../types/Types";

export function REMOVE_CART(state: IState, content: ICartContent) {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === content.id
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity = content.quantity - 1;
  updatedItem.price = updatedItem.price - content.priceUnit;

  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  window.localStorage.setItem(
    'cart',
    JSON.stringify({ ...state, cart: updatedCart })
  );
  return { ...state, cart: updatedCart };
}
