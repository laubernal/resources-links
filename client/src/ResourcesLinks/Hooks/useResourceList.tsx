import { useState } from 'react';

function useResourceList() {
  const [resourcesList, setResourcesList] = useState([
    {
      id: '',
      title: '',
      note: '',
      link: '',
      userId: '',
      createdAt: '',
      categories: [{ id: '', name: '' }],
    },
  ]);

  const saveResource = (resourceList: any): void => {
    setResourcesList(resourceList);
  };

  return {
    setResourcesList: saveResource,
    resourcesList,
  };
}

export default useResourceList;
