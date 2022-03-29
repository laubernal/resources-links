import { useState } from 'react';

function useToken() {
  const getToken = (): any => {
    const tokenString = localStorage.getItem('token');

    if (tokenString) {
      const userToken = tokenString;
      return userToken;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any): void => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}

export default useToken;
