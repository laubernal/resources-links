import React, { useEffect, useState } from 'react';
import { Menu, Table, Text, Title } from '@mantine/core';

import { useResource } from '../Hooks/useResource';
import { categoryType, resourceType } from '../../types';
import { Edit, Trash } from 'tabler-icons-react';
import UpdateResourceForm from './UpdateResourceForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function ResourcesTable(): JSX.Element {
  const resources = useResource();
  const [openedDeleteModal, setOpenedDeleteModal] = useState(false);
  const [resourceId, setResourceId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        await resources.fetchResourceList();
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  const handleDeleteResource = async (resourceId: string): Promise<void> => {
    try {
      setResourceId(resourceId);
      setOpenedDeleteModal(true);
      // await resources.deleteResource(resourceId);

      // await resources.fetchResourceList();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const rows = resources.resourcesList.map((resource: resourceType) => (
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
            return <Text key={category.id}>{category.name}</Text>;
          })}
        </Text>
      </td>
      <td>
        <Text>{resource.createdAt}</Text>
      </td>
      <td>
        <Menu placement="center" withArrow closeOnItemClick>
          <Menu.Item icon={<Edit size={14} />} onClick={() => console.log('CLICKED')}>
            Edit
          </Menu.Item>
          <Menu.Item
            icon={<Trash size={14} color="red" />}
            onClick={() => handleDeleteResource(resource.id)}
          >
            Delete
          </Menu.Item>
        </Menu>
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
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <DeleteConfirmationModal
        openedModal={openedDeleteModal}
        setOpenedModal={setOpenedDeleteModal}
        resourceId={resourceId}
      />

    </>
  );
}

export default ResourcesTable;
