import React, { useEffect } from 'react';
import { ActionIcon, CloseButton, Group, MultiSelect, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Check } from 'tabler-icons-react';

import { useResource } from '../Hooks/useResource';
import { useCategory } from '../Hooks/useCategory';

function NewResourceForm(): JSX.Element {
  const category = useCategory();
  const resource = useResource();

  useEffect(() => {
    (async () => {
      try {
        await category.fetchCategoryList();
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, [category.categoriesList]);

  const form = useForm({
    initialValues: {
      title: '',
      link: '',
      note: '',
      categories: [],
    },
  });

  const handleSubmit = async (values: typeof form.values, event: React.FormEvent<Element>) => {
    try {
      event.preventDefault();

      await resource.saveResource(values.title, values.link, values.note, values.categories);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCreateCategory = async (newCategory: string) => {
    try {
      await category.saveCategory(newCategory);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder="Title" label="Title"></TextInput>
        <TextInput placeholder="Link" label="Link" required></TextInput>
        <TextInput placeholder="Note" label="Note"></TextInput>
        <MultiSelect
          data={category.categoriesList}
          label="Categories"
          placeholder="Select the categories you want"
          searchable
          nothingFound="No categories found"
          creatable
          getCreateLabel={(category: string) => `+ Create ${category}`}
          onCreate={(category: string) => handleCreateCategory(category)}
          required
        ></MultiSelect>
        <Space h="md" />
        <Group spacing={5} position="right">
          <CloseButton
            title="Cancel"
            color="cyan"
            size="xl"
            iconSize={30}
            radius="lg"
            variant="transparent"
          />

          <ActionIcon title="Submit" color="cyan" size="xl" radius="lg" variant="transparent">
            <Check size={40} strokeWidth={1.5} />
          </ActionIcon>
        </Group>
      </form>
    </div>
  );
}

export default NewResourceForm;
