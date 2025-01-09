import React from 'react';
import { Shypings } from './style';
import { AiFillCheckCircle } from 'react-icons/ai';

const Shipping = ({ children, title }) => {
  return (
    <Shypings>
      <div>
        <span>
          <AiFillCheckCircle />
        </span>
        <h1>{title}</h1>
      </div>
      <section>{children}</section>
    </Shypings>
  );
};

export default Shipping;
