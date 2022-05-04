import React from 'react';
import { useCategoryProvider } from '../../Hooks/useCategoryProvider';
import { CategoryContext } from './CategoryContext';

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const category = useCategoryProvider();

  return <CategoryContext.Provider value={category}>{children}</CategoryContext.Provider>;
};
