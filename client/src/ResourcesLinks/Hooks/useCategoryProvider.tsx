import axios from 'axios';
import { categoryType } from '../../types';

import { useCategoryList } from './useCategoryList';

export const useCategoryProvider = () => {
  const { categoriesList, setCategoriesList } = useCategoryList();

  const fetchCategoryList = async (): Promise<void> => {
    try {
      const response = await axios.get('/categories');

      setCategoriesList(
        response.data.map((category: categoryType) => ({
          value: JSON.stringify(category),
          label: category.name,
        }))
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const saveCategory = async (name: string): Promise<void> => {
    try {
      await axios.post('/categories/new', { name });
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
