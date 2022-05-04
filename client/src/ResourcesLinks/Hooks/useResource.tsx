import React from 'react';
import { ResourceContext } from '../Context/Resource/ResourceContext';

export const useResource = () => {
  return React.useContext(ResourceContext);
};
