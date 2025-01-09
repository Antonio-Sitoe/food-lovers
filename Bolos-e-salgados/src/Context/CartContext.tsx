import React from 'react';
import { reducer } from '../Cart/reducers/reducers';
import { ActionType,  IState } from '../Cart/types/Types';

interface ICart {
  state: IState;
  total: number;
  dispatch;
  setTotal;
}

export const CartContext = React.createContext({} as ICart);

const initialState: IState = {
  cart: [],
};

export const CartStorage = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (state.cart.length > 0) {
      const total = state.cart.reduce((acumulador, itemActual) => {
        return (acumulador += itemActual.price);
      }, 0);
      setTotal(total);
    }
    if (state.cart.length === 0) {
      setTotal(0);
    }
  }, [state.cart]);


  React.useEffect(() => {
    const local = JSON.parse(window.localStorage.getItem('cart'));
    if (local !== null && local.cart.length > 0) {
      dispatch({
        type: ActionType.INITIAL_STATE,
        content: local,
      });
    }
  }, []);

  const value = { state, dispatch, total, setTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
