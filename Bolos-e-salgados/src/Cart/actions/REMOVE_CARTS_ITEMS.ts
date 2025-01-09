export function REMOVE_CARTS_ITEMS(state, content) {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === content.id
  );
  updatedCart.splice(updatedItemIndex, 1);
  window.localStorage.setItem(
    'cart',
    JSON.stringify({ ...state, cart: updatedCart })
  );
  return { ...state, cart: updatedCart };
}