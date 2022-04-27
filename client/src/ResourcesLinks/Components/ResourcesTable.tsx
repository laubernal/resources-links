import React, { useEffect } from 'react';
import { Table, Title } from '@mantine/core';

import { useResource } from '../Hooks/useResource';

function ResourcesTable(): JSX.Element {
  const resource = useResource();

  useEffect(() => {
    (async () => {
      try {
        await resource.fetchResourceList();
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  const rows = resource.resourcesList.map(resource => (
    <tr key={resource.id}>
      <td>{resource.title}</td>
      <td>{resource.link}</td>
      <td>{resource.note}</td>
      <td>
        {resource.categories.map(category => {
          return <p>{category.name}</p>;
        })}
      </td>
      <td>{resource.createdAt}</td>
    </tr>
  ));

  return (
    <div>
      <Title order={3}>Create your first resource</Title>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
            <th>Note</th>
            <th>Category</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default ResourcesTable;
