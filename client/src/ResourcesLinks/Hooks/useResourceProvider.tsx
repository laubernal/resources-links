import axios from 'axios';

import { categoryType } from '../../types';
import useResourceList from './useResourceList';

export const useResourceProvider = () => {
  const { resourcesList, setResourcesList } = useResourceList();

  const fetchResourceList = async (): Promise<void> => {
    try {
      const response = await axios.get(`/resources`, { params: { page: 2 } });

      setResourcesList(response.data);
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
    // try {
    // console.log(`TITLE: ${title}, LINK: ${link}, NOTE: ${note}`);
    // console.log('CATEGORIES SAVE RESOURCE', categories);

    const response = await axios.post('/resources/new', { title, link, note, categories });

    // console.log('SAVE RESPONSE', response);
    // } catch (error: any) {
    //   console.log(error.message);
    // }
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
    // try {
    await axios.post('/resources/delete', { resourceId });
    // } catch (error: any) {
    //   console.log(error.message);
    // }
  };

  return {
    fetchResourceList,
    saveResource,
    updateResource,
    deleteResource,
    resourcesList,
  };
};
