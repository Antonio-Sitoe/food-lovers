export interface ICartContent {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  priceUnit?: number;
}
export enum ActionType {
  ADD_CART = 'ADD_CART',
  INITIAL_STATE = 'INITIAL_STATE',
  REMOVE_CART = 'REMOVE_CART',
  REMOVE_CARTS_ITEMS = 'REMOVE_CARTS_ITEMS',
}

export interface IState {
  cart: ICartContent[];
}

export interface IACTIONS {
  type:
    | ActionType.ADD_CART
    | ActionType.INITIAL_STATE
    | ActionType.REMOVE_CART
    | ActionType.REMOVE_CARTS_ITEMS;
  content: ICartContent;
}
