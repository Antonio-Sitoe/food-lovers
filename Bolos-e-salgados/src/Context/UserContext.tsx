import React from 'react';
import router from 'next/router';
import nookies, { parseCookies, destroyCookie } from 'nookies';
import { GET_USERDATA, USER_GET, USER_REGISTER } from '../services/Api';
import { IUser } from '../Types/Interfaces';

interface IUserValuesProps {
  user: IUser | null;
  isAuthenticate: boolean;
  error: null | string;
  setError;
  setIsAuthenticate;
  userRegister;
  userLogin;
  loading;
  productID;
  setproductID;
  getUserWithToken;
  UserLogout: () => void;
}

export const UserContext = React.createContext({} as IUserValuesProps);

export const UserStorage = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [productID, setproductID] = React.useState('');

  const UserLogout = () => {
    setIsAuthenticate(false);
    setLoading(false);
    setUser(null);
    setError(null);
    destroyCookie(null, 'token');
    router.push('/login');
  };

  async function getUserWithToken(token: string) {
    setLoading(true);
    let response;
    let json;
    try {
      const { url, options } = GET_USERDATA(token);
      response = await fetch(url, options);
      json = await response.json();
      if (!response.ok) throw new Error(json.error.message);
    } catch (er) {
      json = null;
      setError(er.toString());
    } finally {
      setUser(json);
      setLoading(false);
      if (json) {
        setIsAuthenticate(true);
        return true;
      } else {
        return false;
      }
    }
  }

  const userLogin = async (identifier: string, password: string) => {
    const { url, options } = USER_GET({
      identifier,
      password,
    });
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw new Error(json.error.message);
      nookies.set(null, 'token', json.jwt, {
        maxAge: 30 * 24 * 60 * 60,
      });
      setUser(json.user);
      setIsAuthenticate(true);
    } catch (err) {
      setError(err.toString());
    }
    setLoading(false);
  };

  const userRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    const { url, options } = USER_REGISTER({
      username,
      email,
      password,
    });
    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok) throw new Error(json.error.message);
      nookies.set(null, 'token', json.jwt, {
        maxAge: 30 * 24 * 60 * 60,
      });
      setUser(json.user);
      setIsAuthenticate(true);
    } catch (err) {
      setError(err.toString());
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const { token } = parseCookies();
    (async () => {
      if (token) {
        const verify = await getUserWithToken(token);
        if (verify === false) {
          UserLogout();
        }
      }
    })();
  }, []);

  const value = {
    setError,
    getUserWithToken,
    isAuthenticate,
    setIsAuthenticate,
    userRegister,
    userLogin,
    user,
    error,
    loading,
    productID,
    setproductID,
    UserLogout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
