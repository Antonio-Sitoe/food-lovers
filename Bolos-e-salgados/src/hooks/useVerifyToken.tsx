import React from 'react';
import router from 'next/router';
import { UserContext } from '../Context/UserContext';
import { parseCookies } from 'nookies';

const useVerifyToken = () => {
  const { user } = React.useContext(UserContext);

  const verifyToken = React.useCallback(() => {
    const { token } = parseCookies();
    if (token && user) {
      router.push('/user');
    }
  }, [user]);

  return { verifyToken };
};

export default useVerifyToken;
