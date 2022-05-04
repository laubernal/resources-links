import { useState } from 'react';

export const useCategoryList = () => {
  const [categoriesList, setCategoriesList] = useState([{ label: '', value: '' }]);

  const saveCategory = (categoryList: any): void => {
    setCategoriesList(categoryList);
  };

  return {
    categoriesList,
    setCategoriesList: saveCategory,
  };
};
