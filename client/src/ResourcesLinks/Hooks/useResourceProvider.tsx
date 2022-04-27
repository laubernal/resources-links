import axios from 'axios';

import { categoryType, resourceType } from '../../types';
import useResourceList from './useResourceList';

export const useResourceProvider = () => {
  const { resourcesList, setResourcesList } = useResourceList();

  const fetchResourceList = async (): Promise<void> => {
    try {
      const response = await axios.get('/resources');
      console.log('RESPONSE', response.data);

      setResourcesList(
        response.data.map(
          ({ id, title, note, link, userId, createdAt, categories }: resourceType) => ({
            id,
            title,
            note,
            link,
            userId,
            createdAt,
            categories: categories.map(({ id, name }: categoryType) => ({
              id,
              name,
            })),
          })
        )
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const saveResource = async (): Promise<void> => {};

  const updateResource = async (): Promise<void> => {};

  const deleteResource = async (): Promise<void> => {};

  return {
    fetchResourceList,
    saveResource,
    updateResource,
    deleteResource,
    resourcesList,
  };
};
