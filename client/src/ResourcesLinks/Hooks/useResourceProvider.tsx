import axios from 'axios';
import { useState } from 'react';

import { categoryType, resourceType } from '../../types';
import useResourceList from './useResourceList';

export const useResourceProvider = () => {
  const { resourcesList, setResourcesList } = useResourceList();

  const fetchResourceList = async (): Promise<void> => {
    try {
      const response = await axios.get('/resources');
      console.log('RESPONSE', response.data);

      // console.log('response', response.data[2]._categories);
      // const resources: resourcesType[] = console.log(resources);

      setResourcesList(
        response.data.map(({ _id, _title, _note, _link, _userId, _categories }: resourceType) => ({
          id: _id,
          title: _title,
          note: _note,
          link: _link,
          userId: _userId,
          categories: _categories.map(({ _id, _name }: categoryType) => ({
            id: _id,
            name: _name,
          })),
        }))
      );

      // console.log('resourceslist', resourcesList);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const saveResource = async (): Promise<void> => {};

  const updateResource = async (): Promise<void> => {};

  const deleteResource = async (): Promise<void> => {};

  //   const signin = async (email: string, password: string, callback: VoidFunction): Promise<void> => {
  //     const response = await axios.post('/signin', { email, password });

  //     setToken(response.data.userJwt);

  //     callback();
  //   };

  //   const signup = async (
  //     firstName: string,
  //     lastName: string,
  //     email: string,
  //     password: string,
  //     passwordConfirmation: string,
  //     callback: VoidFunction
  //   ): Promise<void> => {
  //     const response = await axios.post('/signup', {
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       passwordConfirmation,
  //     });

  //     setToken(response.data.userJwt);

  //     callback();
  //   };

  //   const signout = (callback: VoidFunction) => {
  //     try {
  //       axios.get('/signout');
  //       setToken(null);
  //       callback();
  //     } catch (error: any) {
  //       console.log(error.message);
  //     }
  //   };

  return {
    fetchResourceList,
    saveResource,
    updateResource,
    deleteResource,
    resourcesList,
  };
};
