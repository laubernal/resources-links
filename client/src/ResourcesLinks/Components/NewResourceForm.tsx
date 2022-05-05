import React, { useEffect } from 'react';
import { Button, Group, MultiSelect, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useResource } from '../Hooks/useResource';
import { useCategory } from '../Hooks/useCategory';

interface FormValues {
  title: string;
  link: string;
  note: string;
  categories: {
    id: string;
    name: string;
  }[];
}

function NewResourceForm(): JSX.Element {
  const category = useCategory();
  const resource = useResource();

  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      link: '',
      note: '',
      categories: [
        {
          id: '',
          name: '',
        },
      ],
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
      console.log(values);

      await resource.saveResource(values.title, values.link, values.note, values.categories);
      // CLOSE MODAL WHEN SAVED
      // SHOW ALERT WITH SAVED SUCCESSFULLY
    } catch (error: any) {
      console.log(error.message);
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
          data-autofocus
          {...form.getInputProps('title')}
        />
        <TextInput placeholder="Link" label="Link" required {...form.getInputProps('link')} />
        <TextInput placeholder="Note" label="Note" {...form.getInputProps('note')} />
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
          <Button type="submit" radius="md" color="cyan">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default NewResourceForm;
