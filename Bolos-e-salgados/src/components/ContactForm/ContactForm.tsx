import React, { FormEvent } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useFetch from '../../hooks/useFecth';
import useForm from '../../hooks/useForm';
import { CREATE_MESSAGE } from '../../services/Api';
import { theme } from '../../styles/theme';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Textearea from '../Forms/Textearea';
import ErrorServer from '../../Helper/ErrorServer';

const Form = styled.form`
  display: grid;
  gap: 1rem;
  background: ${theme.colors.white};
  padding: 3rem 6rem;

  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 930px) {
    padding: 3rem;
  }
  @media (max-width: 500px) {
    padding: 1rem;
    section {
      grid-template-columns: 1fr;
    }
  }
`;
export default function ContactForm() {
  const { error, loading, request } = useFetch();
  const name = useForm('');
  const telefone = useForm('');
  const message = useForm('');
  const email = useForm('email');

  function setData() {
    name.setValue('');
    email.setValue('');
    message.setValue('');
    telefone.setValue('');
  }

  async function handleSubmitMessage(e: FormEvent) {
    e.preventDefault();
    if (
      name.validate() &&
      email.validate() &&
      message.validate() &&
      telefone.validate()
    ) {
      const { url, options } = CREATE_MESSAGE({
        data: {
          email: email.value,
          message: message.value,
          name: name.value,
          telefone: telefone.value,
        },
      });
      const { response } = await request(url, options);
      if (response.ok) {
        toast.success('Mensagem Enviada');
        setData();
      } else toast.warn('Mensagem não Enviada');
    }
  }

  return (
    <Form onSubmit={handleSubmitMessage}>
      <section>
        <Input
          placeholder='Seu nome'
          id='name'
          label='Nome'
          name='nome'
          onBlur={name.onBlur}
          onChange={name.onChange}
          error={name.error}
          type='text'
          value={name.value}
        />
        <Input
          placeholder='+258 878984953'
          id='tel'
          label='Telefone'
          name='tel'
          onBlur={telefone.onBlur}
          onChange={telefone.onChange}
          error={telefone.error}
          type='number'
          value={telefone.value}
        />
      </section>
      <Input
        placeholder='antoniositoehl@gmail.com'
        id='email'
        label='Email'
        name='email'
        onBlur={email.onBlur}
        onChange={email.onChange}
        error={email.error}
        type='email'
        value={email.value}
      />
      <Textearea
        id='message'
        name='message'
        onChange={message.onChange}
        value={message.value}
        error={message.error}
      />
      <Button disabled={loading}>Enviar Mensagem</Button>
      {error && <ErrorServer error={error} />}
    </Form>
  );
}
