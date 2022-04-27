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
          ({ _id, _title, _note, _link, _userId, _createdAt, _categories }: resourceType) => ({
            id: _id,
            title: _title,
            note: _note,
            link: _link,
            userId: _userId,
            createdAt: _createdAt,
            categories: _categories.map(({ _id, _name }: categoryType) => ({
              id: _id,
              name: _name,
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
