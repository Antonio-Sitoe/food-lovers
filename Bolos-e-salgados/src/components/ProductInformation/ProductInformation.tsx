import React from 'react';
import Button from '../Forms/Button';
import { CartContext } from '../../Context/CartContext';
import { Title } from '../../styles/styles';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  QuantityContainerStyle,
  QuantityStyle,
  ShowInformation,
} from './styles';
import { ActionType } from '../../Cart/types/Types';

function transform(data) {
  return {
    name: data.name,
    price: data.price,
    description: data.description,
    category: data.category,
  };
}

const ProductInformation = ({ data, showImage }) => {
  const dataInfo = transform(data.attributes);
  const [count, setCount] = React.useState(1);
  const { dispatch } = React.useContext(CartContext);
  const [loading, setLoading] = React.useState(false);
  const navigate = useRouter();

  async function handleSubmit() {
    setLoading(true);
    dispatch({
      type: ActionType.ADD_CART,
      content: {
        id: data.id,
        image: showImage[0].attributes.url,
        name: dataInfo.name,
        price: dataInfo.price,
        quantity: count,
        priceUnit: dataInfo.price,
      },
    });
    const functionThatReturnPromise = () =>
      new Promise((resolve) =>
        setTimeout(() => {
          setLoading(false);
          navigate.push('/cart');
          resolve(true);
        }, 2000)
      );
    toast.promise(
      functionThatReturnPromise,
      {
        pending: 'Aguardando a resposta',
        success: `${dataInfo.name} adicionado ao carrinho 👌`,
        error: 'Falha ao adicionar o produto 🤯',
      },
      { position: toast.POSITION.TOP_CENTER }
    );
  }
  async function handleCart() {
    handleSubmit();
  }
  function Incrimental() {
    setCount(count + 1);
  }
  function decremental() {
    if (count <= 1) return false;
    setCount(count - 1);
  }

  return (
    <ShowInformation onSubmit={handleSubmit}>
      <div>
        <Title>
          {dataInfo.name} ({dataInfo.category})
        </Title>
        <p>{dataInfo.description}</p>
        <h2>Preco: {dataInfo.price} MZN</h2>
      </div>
      <QuantityContainerStyle>
        <p>Quantidade</p>
        <QuantityStyle>
          <span>{count}</span>
          <button onClick={decremental}>-</button>
          <button onClick={Incrimental}>+</button>
        </QuantityStyle>
      </QuantityContainerStyle>
      <Button onClick={handleCart} disabled={loading}>
        Adicionar ao carrinho
      </Button>
    </ShowInformation>
  );
};

export default ProductInformation;
