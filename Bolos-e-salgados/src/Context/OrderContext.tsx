
import React from "react";


interface IOrder {
  image: string;
  name: string;
  price: string;
  priceUnit: number;
  quantity: number;
}
interface IOrderData {
  status: string;
  total: number;
  message: string;
  number: number;
  client_id: number;
  order: IOrder[];
}
interface IOrderContext {
  orderData: IOrderData;
  setOrderData;
}

export const OrderContext = React.createContext<IOrderContext>(
  {} as IOrderContext
);

export function OrderStorage({ children }) {

  const [orderData, setOrderData] = React.useState<IOrderData>({
    status: "pendente",
    message: "",
    client_id: 0,
    total: 0,
    number: 0,
    order: [
      {
        image: "",
        name: "",
        price: "",
        priceUnit: 0,
        quantity: 0,
      },
    ],
  });

  const value = { setOrderData, orderData };
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}
