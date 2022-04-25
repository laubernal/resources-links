import axios from 'axios';
import { useState } from 'react';

import useToken from '../../Shared/Hooks/useToken';

export const useResourceProvider = () => {
  const { token, setToken } = useToken();
  const [resourcesList, setResourcesList] = useState([
    { title: '', note: '', link: '', userId: '', categories: [{ id: '', name: '' }] },
  ]);

  const fetchResourceList = async (): Promise<void> => {
    const response = await axios.get('/resources');
    console.log('RESPONSE', response.data);

    setResourcesList(response.data);
  };

  const saveResource = async (): Promise<void> => {};

  const updateResource = async (): Promise<void> => {};

  const deleteResource = async (): Promise<void> => {};

  //   const signin = async (email: string, password: string, callback: VoidFunction): Promise<void> => {
  //     const response = await axios.post('/signin', { email, password });

  //     setToken(response.data.userJwt);

  //     callback();
  //   };

  //   const signup = async (
  //     firstName: string,
  //     lastName: string,
  //     email: string,
  //     password: string,
  //     passwordConfirmation: string,
  //     callback: VoidFunction
  //   ): Promise<void> => {
  //     const response = await axios.post('/signup', {
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       passwordConfirmation,
  //     });

  //     setToken(response.data.userJwt);

  //     callback();
  //   };

  //   const signout = (callback: VoidFunction) => {
  //     try {
  //       axios.get('/signout');
  //       setToken(null);
  //       callback();
  //     } catch (error: any) {
  //       console.log(error.message);
  //     }
  //   };

  return {
    fetchResourceList,
    saveResource,
    updateResource,
    deleteResource,
    resourcesList,
  };
};
