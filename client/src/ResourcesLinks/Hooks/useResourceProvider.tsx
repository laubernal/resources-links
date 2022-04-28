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
        response.data.map(({ id, title, link, note, createdAt, categories }: resourceType) => ({
          id,
          title,
          link,
          note,
          createdAt,
          categories: categories.map(({ id, name }: categoryType) => ({
            id,
            name,
          })),
        }))
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const saveResource = async (
    title: string,
    link: string,
    note: string,
    categories: categoryType[]
  ): Promise<void> => {
    try {
      const response = await axios.post('/resources/new', { title, link, note, categories });

      console.log('SAVE RESPONSE', response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateResource = async (
    id: string,
    title: string,
    note: string,
    link: string,
    categories: categoryType[]
  ): Promise<void> => {
    try {
      const response = await axios.post('resources/update', { id, title, link, note, categories });

      console.log('UPDATE RESPONSE', response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const deleteResource = async (resourceId: string): Promise<void> => {
    try {
      await axios.post('/resources/delete', { resourceId });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    fetchResourceList,
    saveResource,
    updateResource,
    deleteResource,
    resourcesList,
  };
};
