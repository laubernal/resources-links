import axios from 'axios';

import useToken from '../../Shared/Hooks/useToken';

export const useAuthProvider = () => {
  const { token, setToken } = useToken();

  const signin = async (email: string, password: string, callback: VoidFunction): Promise<void> => {
    const response = await axios.post('/signin', { email, password });

    console.log('RESPONSE --', response);

    setToken(response.data.userJwt);

    callback();
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    callback: VoidFunction
  ): Promise<void> => {
    try {
      const response = await axios.post('signup', {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      });
      setToken(response.data.userJwt);

      callback();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signout = (callback: VoidFunction) => {
    try {
      axios.get('/signout');
      setToken(null);
      callback();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    signin,
    signup,
    signout,
    token,
  };
};
