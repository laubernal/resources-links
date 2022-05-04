import axios from 'axios';

import { useCategoryList } from './useCategoryList';

export const useCategoryProvider = () => {
  const { categoriesList, setCategories } = useCategoryList();

  const fetchCategoryList = async (): Promise<void> => {};
  const saveCategory = async (name: string): Promise<void> => {};
  const updateCategory = async (id: string): Promise<void> => {};
  const deleteCategory = async (id: string): Promise<void> => {};

  return {
    fetchCategoryList,
    saveCategory,
    updateCategory,
    deleteCategory,
    categoriesList,
  };
};
