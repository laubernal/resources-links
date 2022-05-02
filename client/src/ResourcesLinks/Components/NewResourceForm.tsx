import React from 'react';
import { MultiSelect, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function NewResourceForm(): JSX.Element {
  const form = useForm({
    initialValues: {
      title: '',
      note: '',
      link: '',
      category: '',
    },
  });

  const data = [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
    { value: 'riot', label: 'Riot' },
    { value: 'next', label: 'Next.js' },
    { value: 'blitz', label: 'Blitz.js' },
  ];

  return (
    <div>
      <form>
        <TextInput placeholder="Title" label="Title"></TextInput>
        <TextInput placeholder="Note" label="Note"></TextInput>
        <TextInput placeholder="Link" label="Link"></TextInput>
        <MultiSelect
          data={data}
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
