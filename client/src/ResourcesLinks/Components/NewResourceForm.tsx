import React, { useEffect } from 'react';
import { ActionIcon, CloseButton, Group, MultiSelect, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Check, X } from 'tabler-icons-react';

import { useCategories } from '../Hooks/useCategories';
import { useResource } from '../Hooks/useResource';

function NewResourceForm(): JSX.Element {
  const { categories, setCategories } = useCategories();
  const resource = useResource();

  useEffect(() => {
    setCategories();
  }, []);

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

  const handleCreateCategory = async (category: string) => {
    try {
      // event?.preventDefault();
      // await category.saveCategory(category);
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
          data={categories}
          label="Categories"
          placeholder="Select the categories you want"
          searchable
          nothingFound="No categories found"
          creatable
          getCreateLabel={category => `+ Create ${category}`}
          onCreate={category => handleCreateCategory(category)}
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
