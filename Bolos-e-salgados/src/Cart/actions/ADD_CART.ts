import { ICartContent, IState } from '../types/Types';

export function ADD_CART(state: IState, content: ICartContent) {
  const cart = [...state.cart];
  const updatedItemIndex = cart.findIndex((item) => item.id === content.id);
  if (updatedItemIndex < 0) {
    cart.push({ ...content });
  } else if (content.quantity > 0) {
    const updateItem = { ...cart[updatedItemIndex] };
    updateItem.quantity = content.quantity;
    updateItem.price = updateItem.priceUnit * content.quantity;
    cart[updatedItemIndex] = updateItem;
  }
  window.localStorage.setItem('cart', JSON.stringify({ ...state, cart: cart }));
  return { ...state, cart: cart };
}
