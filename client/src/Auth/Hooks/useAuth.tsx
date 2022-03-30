import React from 'react';
import { AuthContext } from '../Context/AuthContext';

export const useAuth = () => {
  return React.useContext(AuthContext);
};
