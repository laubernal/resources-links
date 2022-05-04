import React from 'react';

import { CategoryContext } from '../Context/Category/CategoryContext';

export const useCategory = () => {
  return React.useContext(CategoryContext);
};
