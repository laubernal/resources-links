import { useState } from 'react';

function useResourceList() {
  const [resourcesList, setResourcesList] = useState([
    {
      id: '',
      title: '',
      link: '',
      note: '',
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
