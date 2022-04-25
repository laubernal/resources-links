import React from 'react';
import { ResourceContext } from '../Context/ResourceContext';

export const useResource = () => {
  return React.useContext(ResourceContext);
};
