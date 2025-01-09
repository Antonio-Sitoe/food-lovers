import React from 'react';
import Image from 'next/image';
import { ModalBackground } from '../ModalAlert/styles';
import { SearchingStyle } from './styles';
import useFetch from '../../hooks/useFecth';
import { SeachLoading } from './SeachLoading';
import { GET_ALL_PRODUCTS } from '../../services/Api';
import ErrorServer from '../../Helper/ErrorServer';
import Link from 'next/link';
interface Idata {
  id: number;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
}

export const Searching = ({ setSearch }) => {
  const [input, setInput] = React.useState('');
  const [data, setData] = React.useState<Idata[] | null>(null);
  const [storage, setStorage] = React.useState<Idata[] | null>(null);
  const { error, loading, request } = useFetch();

  function handleClose({ target, currentTarget }) {
    if (target === currentTarget) {
      setSearch(false);
    }
  }

  function handleChangeAndFilteredProduts({ target }) {
    setInput(target.value);

    const NewData = data.filter((item) => {
      const verify = item.name
        .toLowerCase()
        .includes(target.value.toLowerCase());
      return verify;
    });
    if (target.value.length === 0 || data.length === 0) {
      setData([...storage]);
    } else {
      setData([...NewData]);
    }
  }
  React.useEffect(() => {
    (async () => {
      const { options, url } = GET_ALL_PRODUCTS();
      const { json } = await request(url, options);
      const newData = json?.data.map(
        ({ id, attributes: { category, description, image, name, price } }) => {
          return {
            id,
            category,
            description,
            image: image.data[0].attributes.url,
            name,
            price,
          };
        }
      );
      setData(newData);
      setStorage(newData);
    })();
  }, [request]);

  return (
    <ModalBackground onClick={handleClose}>
      <SearchingStyle>
        {loading ? (
          <SeachLoading />
        ) : (
          <>
            {!error && (
              <input
                value={input}
                type='text'
                onChange={handleChangeAndFilteredProduts}
                placeholder='Pesquise por produtos'
              />
            )}
            {error && <ErrorServer error={error} />}
            {data &&
              data.map(({ id, image, name, category, price }) => {
                return (
                  <Link href={`/product/${id}`} key={id}>
                    <a  href={`/product/${id}`} onClick={() => setSearch(false)}>
                      <section>
                        <span>
                          <Image src={image} alt='' height={60} width={60} />
                        </span>
                        <p>
                          <strong>Nome</strong> {name}
                        </p>
                        <p>
                          <strong>Categoria</strong> {category}
                        </p>
                        <p>
                          <strong>Preco</strong> {price}MT
                        </p>
                      </section>
                    </a>
                  </Link>
                );
              })}
          </>
        )}
      </SearchingStyle>
    </ModalBackground>
  );
};
