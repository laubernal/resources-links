import React, { useEffect } from 'react';
import { Table, Title } from '@mantine/core';
import { useResource } from '../Hooks/useResource';

function ResourcesTable(): JSX.Element {
  const resource = useResource();

  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon', created: '02/05/2022' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen', created: '02/05/2022' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium', created: '02/05/2022' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium', created: '02/05/2022' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium', created: '02/05/2022' },
  ];

  const rows = elements.map(element => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td>{element.created}</td>
    </tr>
  ));

  useEffect(() => {
    (async () => {
      try {
        console.log('call fetch resource list');

        await resource.fetchResourceList();
        console.log('resources list state', resource.resourcesList);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

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
