import React, { useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

export const useAuth = () => {
  //   const [state, setState] = useState({
  //     email: '',
  //     password: '',
  //   });

  //   const saveEmail = (email: string) => {
  //     setState(prevState => {
  //       const newState = { ...prevState, email };
  //       return newState;
  //     });
  //   };

  //   const savePassword = (password: string) => {
  //     setState(prevState => {
  //       const newState = { ...prevState, password };
  //       return newState;
  //     });
  //   };

  return React.useContext(AuthContext);

  //   return { context, state, saveEmail, savePassword };
};
