import React from 'react';
import Image from 'next/image';
import { Links } from '../../styles/styles';
import { CardStyle } from './styles';
import { ICard } from '../../Types/Interfaces';
import Link from 'next/link';

const Card = ({ attributes, id }: ICard, key) => {
  return (
    <CardStyle key={key}>
      <Image
        src={attributes.image.data[0].attributes.url}
        alt={attributes.image.data[0].attributes.name}
        height={320}
        width={600}
      />
      <h3>{attributes.name}</h3>
      <p>{attributes.price}</p>
      <Link href={`product/${id}`}>
        <Links>Comprar</Links>
      </Link>
    </CardStyle>
  );
};

export default Card;
