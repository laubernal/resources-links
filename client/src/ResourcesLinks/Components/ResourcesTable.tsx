import React, { useEffect, useState } from 'react';
import {
  Button,
  Group,
  Menu,
  Modal,
  MultiSelect,
  Space,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import { useResource } from '../Hooks/useResource';
import { categoryType, resourceType, updateResourceType } from '../../types';
import { Edit, Trash } from 'tabler-icons-react';
import UpdateResourceForm from './UpdateResourceForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useForm } from '@mantine/hooks';
import { useCategory } from '../Hooks/useCategory';

interface ResourceTableProps {
  setShowSuccessNotification: (boolean: boolean) => void;
  setShowErrorNotification: (boolean: boolean) => void;
}

interface UpdateResourceFormProps {
  setOpenedModal: (boolean: boolean) => void;
  setShowSuccessNotification: (boolean: boolean) => void;
  setShowErrorNotification: (boolean: boolean) => void;
  resource: updateResourceType;
}

interface FormValues {
  title: string;
  link: string;
  note: string;
  categories: categoryType[];
}

function ResourcesTable({
  setShowSuccessNotification,
  setShowErrorNotification,
}: ResourceTableProps): JSX.Element {
  const resources = useResource();
  const category = useCategory();

  const [openedUpdateModal, setOpenedUpdateModal] = useState(false);
  const [openedDeleteModal, setOpenedDeleteModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState({
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
        await category.fetchCategoryList();
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  const handleDeleteResourceClick = async (resourceId: string): Promise<void> => {
    try {
      const resource = resources.resourcesList.find(resource => resource.id === resourceId);

      if (resource) {
        setSelectedResource(resource);
      }

      setOpenedDeleteModal(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleUpdateResourceClick = async (updateResource: resourceType): Promise<void> => {
    try {
      console.log(updateResource);
      setOpenedUpdateModal(true);

      form.setValues({
        title: updateResource.title,
        link: updateResource.link,
        note: updateResource.note,
        categories: updateResource.categories,
      });

      // setResource(resource);
      setSelectedResource(updateResource);
      // console.log(`RESOURCE ${resource} ${resource}`);
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
          <Menu.Item icon={<Edit size={14} />} onClick={() => handleUpdateResourceClick(resource)}>
            Edit
          </Menu.Item>
          <Menu.Item
            icon={<Trash size={14} color="red" />}
            onClick={() => handleDeleteResourceClick(resource.id)}
          >
            Delete
          </Menu.Item>
        </Menu>
      </td>
    </tr>
  ));

  const form = useForm<FormValues>({
    initialValues: {
      title: selectedResource.title,
      link: selectedResource.link,
      note: selectedResource.note,
      categories: [],
    },
  });

  const handleSubmit = async (values: typeof form.values, event: React.FormEvent<Element>) => {
    try {
      event.preventDefault();

      // const categories: categoryType[] = values.categories.map(category => {
      //   return JSON.parse(category);
      // });

      await resources.updateResource(
        selectedResource.id,
        values.title,
        values.link,
        values.note,
        values.categories
      );

      await resources.fetchResourceList();

      setShowSuccessNotification(true);
      setTimeout(() => setOpenedUpdateModal(false), 500);
    } catch (error: any) {
      console.log(error.message);
      setTimeout(() => setOpenedUpdateModal(false), 500);
      setShowErrorNotification(true);
    }
  };

  const handleCreateCategory = async (newCategory: string) => {
    try {
      await category.saveCategory(newCategory);

      await category.fetchCategoryList();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  console.log('SELECTED RESOURCE', selectedResource);

  const categoriesList: string[] = selectedResource.categories.map(category => {
    console.log('CATEGORY', category);
    return category.id;
  });

  console.log('CATEGORIES LIST', categoriesList);
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
          resource={selectedResource}
        /> */}

        {/* <form onSubmit={form.onSubmit(handleSubmit)}> */}

        <form>
          <TextInput
            placeholder="Title"
            label="Title"
            data-autofocus
            {...form.getInputProps('title')}
          />
          <TextInput placeholder="Link" label="Link" required {...form.getInputProps('link')} />
          <TextInput placeholder="Note" label="Note" {...form.getInputProps('note')} />

          <MultiSelect
            data={category.categoriesList}
            label="Categories"
            // placeholder="Select the categories you want"
            required
            searchable
            nothingFound="No categories found"
            creatable
            // getCreateLabel={(newCategory: string) => `+ Create ${newCategory}`}
            // onCreate={(newCategory: string) => handleCreateCategory(newCategory)}
            clearButtonLabel="Clear selection"
            clearable
            {...form.getInputProps('categories')}
          />

          <Space h="md" />

          <Group mt="md" position="right">
            <Button radius="md" color="cyan" onClick={() => setOpenedUpdateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" radius="md" color="cyan">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>

      <DeleteConfirmationModal
        openedModal={openedDeleteModal}
        setOpenedModal={setOpenedDeleteModal}
        resourceId={selectedResource.id}
      />
    </>
  );
}

export default ResourcesTable;
