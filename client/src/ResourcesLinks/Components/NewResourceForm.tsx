import React, { useEffect } from 'react';
import { Button, Group, MultiSelect, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useResource } from '../Hooks/useResource';
import { useCategory } from '../Hooks/useCategory';
import { categoryType } from '../../types';

interface NewResourceFormProps {
  setOpenedModal: (boolean: boolean) => void;
  setShowSuccessNotification: (boolean: boolean) => void;
  setShowErrorNotification: (boolean: boolean) => void;
}

interface FormValues {
  title: string;
  link: string;
  note: string;
  categories: string[];
}

function NewResourceForm({
  setOpenedModal,
  setShowSuccessNotification,
  setShowErrorNotification,
}: NewResourceFormProps): JSX.Element {
  const category = useCategory();
  const resource = useResource();

  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      link: '',
      note: '',
      categories: [],
    },
  });

  useEffect(() => {
    (async () => {
      try {
        await category.fetchCategoryList();
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  const handleSubmit = async (values: typeof form.values, event: React.FormEvent<Element>) => {
    try {
      event.preventDefault();

      const categories: categoryType[] = values.categories.map(category => {
        return JSON.parse(category);
      });

      await resource.saveResource(values.title, values.link, values.note, categories);

      setShowSuccessNotification(true);
      setTimeout(() => setOpenedModal(false), 500);
    } catch (error: any) {
      console.log(error.message);
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

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="Title"
          label="Title"
          required
          data-autofocus
          {...form.getInputProps('title')}
        />
        <TextInput placeholder="Link" label="Link" required {...form.getInputProps('link')} />
        <TextInput placeholder="Note" label="Note" required {...form.getInputProps('note')} />

        <MultiSelect
          data={category.categoriesList}
          label="Categories"
          placeholder="Select the categories you want"
          required
          searchable
          nothingFound="No categories found"
          creatable
          getCreateLabel={(newCategory: string) => `+ Create ${newCategory}`}
          onCreate={(newCategory: string) => handleCreateCategory(newCategory)}
          clearButtonLabel="Clear selection"
          clearable
          {...form.getInputProps('categories')}
        />

        <Space h="md" />

        <Group mt="md" position="right">
          <Button radius="md" color="cyan" onClick={() => setOpenedModal(false)}>
            Cancel
          </Button>
          <Button type="submit" radius="md" color="cyan">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default NewResourceForm;
