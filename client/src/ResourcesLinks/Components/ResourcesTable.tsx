import React, { useEffect } from 'react';
import { Table, Text, Title } from '@mantine/core';

import { useResource } from '../Hooks/useResource';
import { categoryType } from '../../types';

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

  console.log(resource.resourcesList);

  const rows = resource.resourcesList.map(resource => (
    <tr key={resource.id}>
      <td>
        <Text align="justify">{resource.title}</Text>
      </td>
      <td>
        <Text variant="link" component="a" href={resource.link} target="_blank">
          {resource.link}
        </Text>
      </td>
      <td>
        <Text align="justify">{resource.note}</Text>
      </td>
      <td>
        <Text align="center">
          {resource.categories.map((category: categoryType) => {
            return <Text>{category.name}</Text>;
          })}
        </Text>
      </td>
      <td>
        <Text>{resource.createdAt}</Text>
      </td>
    </tr>
  ));

  return (
    <>
      <Title order={2}>Your resources</Title>
      <Table highlightOnHover horizontalSpacing="md" verticalSpacing="sm">
        <thead>
          <tr>
            <th>
              <Text weight={700} align="center">
                Title
              </Text>
            </th>
            <th>
              <Text weight={700} align="center">
                Link
              </Text>
            </th>
            <th>
              <Text weight={700} align="center">
                Note
              </Text>
            </th>
            <th>
              <Text weight={700} align="center">
                Category
              </Text>
            </th>
            <th>
              <Text weight={700} align="center">
                Created
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default ResourcesTable;
