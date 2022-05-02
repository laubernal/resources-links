import React, { useEffect } from 'react';
import { MultiSelect, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

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

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder="Title" label="Title"></TextInput>
        <TextInput placeholder="Link" label="Link"></TextInput>
        <TextInput placeholder="Note" label="Note"></TextInput>
        <MultiSelect
          data={categories}
          label="Categories"
          placeholder="Select the categories you want"
          searchable
          nothingFound="No categories found"
        ></MultiSelect>
      </form>
    </div>
  );
}

export default NewResourceForm;
