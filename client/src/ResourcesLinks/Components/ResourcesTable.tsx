import React, { useEffect, useState } from 'react';
import { Menu, Modal, Table, Text, Title } from '@mantine/core';

import { useResource } from '../Hooks/useResource';
import { categoryType, resourceType } from '../../types';
import { Edit, Trash } from 'tabler-icons-react';
import UpdateResourceForm from './UpdateResourceForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface ResourceTableProps {
  setShowSuccessNotification: (boolean: boolean) => void;
  setShowErrorNotification: (boolean: boolean) => void;
}

function ResourcesTable({
  setShowSuccessNotification,
  setShowErrorNotification,
}: ResourceTableProps): JSX.Element {
  const resources = useResource();

  const [openedUpdateModal, setOpenedUpdateModal] = useState(false);
  const [openedDeleteModal, setOpenedDeleteModal] = useState(false);
  const [resourceId, setResourceId] = useState('');
  const [resource, setResource] = useState({
    id: '',
    title: '',
    link: '',
    note: '',
    createdAt: '',
    categories: [{ id: '', name: '' }],
  });

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
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleUpdateResource = async (updateResource: resourceType): Promise<void> => {
    try {
      console.log(`HANDLE UPDATE RESOURCE ${updateResource.id}`);
      setResource(resource);
      console.log(`RESOURCE ${resource} ${resource}`);

      console.log('UPDATE MODAL 2', openedUpdateModal);
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
        <Menu placement="center" withArrow>
          {/* <Menu.Item icon={<Edit size={14} />} onClick={() => handleUpdateResource(resource)}> */}
          <Menu.Item icon={<Edit size={14} />} onClick={() => setOpenedUpdateModal(true)}>
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

      <Modal
        centered
        size="xl"
        opened={openedUpdateModal}
        onClose={() => setOpenedUpdateModal(false)}
        title="Edit resource"
        withinPortal
      >
        {/* <UpdateResourceForm
          setOpenedModal={setOpenedUpdateModal}
          setShowSuccessNotification={setShowSuccessNotification}
          setShowErrorNotification={setShowErrorNotification}
          resource={resource}
          // title={resource.id}
          // link={resource.link}
          // note={resource.note}
          // categories={resource.categories}
        /> */}
        Example
      </Modal>

      <DeleteConfirmationModal
        openedModal={openedDeleteModal}
        setOpenedModal={setOpenedDeleteModal}
        resourceId={resourceId}
      />
    </>
  );
}

export default ResourcesTable;
