import React from 'react';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';
import { UserContext } from '../../Context/UserContext';
import { Title } from '../../styles/styles';
import { LoginGet as LoginForm } from '../../styles/Loginstyles';
import Button from '../../components/Forms/Button';
import Input from '../../components/Forms/Input';
import ErrorServer from '../../Helper/ErrorServer';
import useForm from '../../hooks/useForm';
import LoginLayault from '../../components/LoginLayault/LoginLayault';
import router from 'next/router';
import Head from 'next/head';
import useVerifyToken from '../../hooks/useVerifyToken';

const LoginGet = () => {
  const { userLogin, error, loading } = React.useContext(UserContext);
  const username = useForm('email');
  const password = useForm('password');
  const { verifyToken } = useVerifyToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.validate() && password.validate()) {
      await userLogin(username.value, password.value);
      router.replace('/user');
    }
  };
  React.useEffect(() => {
    verifyToken();
  }, [verifyToken]);


  return (
    <>
      <Head>
        <title>Mila Delicious | Faca o login</title>
        <meta name='description' content='Faca o Login' />
      </Head>
      <LoginLayault>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Entrar</Title>
          {error && <ErrorServer error={error} />}
          <Input
            type='email'
            placeholder='Digite o seu email'
            name='email'
            label='Email'
            id='email'
            error={username.error}
            onBlur={username.onBlur}
            onChange={username.onChange}
            value={username.value}
          />
          <Input
            type='password'
            placeholder='Digite a sua senha'
            name='Senha'
            label='Senha'
            error={password.error}
            onBlur={password.onBlur}
            onChange={password.onChange}
            value={password.value}
            id='password'
          />
          <Link href='/login/forgot'>Esqueci a minha senha !</Link>
          <Button disabled={loading}>
            <BiUser />
            {loading ? '...Carregando' : 'Entrar'}
          </Button>

          <p>
            Ainda nao possui uma conta ?{' '}
            <Link href='/login/create'>Registar</Link>
          </p>
        </LoginForm>
      </LoginLayault>
    </>
  );
};

export default LoginGet;
