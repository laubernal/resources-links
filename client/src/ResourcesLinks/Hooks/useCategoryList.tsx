import axios from 'axios';
import { useState } from 'react';
import { categoryType } from '../../types';

export const useCategoryList = () => {
  const [categoriesList, setCategoriesList] = useState([{ label: '', value: '' }]);

  const getCategories = async (): Promise<void> => {
    try {
      const response = await axios.get('/categories');

      console.log('CATEGORIES', response.data);

      setCategoriesList(
        response.data.map(({ id, name }: categoryType) => ({
          value: id,
          label: name,
        }))
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    categoriesList,
    setCategories: getCategories,
  };
};
