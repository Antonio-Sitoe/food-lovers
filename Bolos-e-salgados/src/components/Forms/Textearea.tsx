import React from 'react';
import { TexteareaProps } from '../../Types/Interfaces';
import { Label, Wrapper } from './styles';



const Textearea = ({ name, id, error, onChange, value }: TexteareaProps) => {
  return (
    <Wrapper>
      <Label>Mensagem </Label>
      <textarea
        name={name}
        cols={30}
        rows={8}
        value={value}
        onChange={onChange}
        id={id}
      />
      {error && <p>{error}</p>}
    </Wrapper>
  );
};

export default Textearea;
