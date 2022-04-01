import React from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../Hooks/useAuth';
import {
  Button,
  Group,
  PasswordInput,
  Space,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';

type propsType = { setActiveTab: Function };

function SignIn({ setActiveTab }: propsType): JSX.Element {
  const navigate = useNavigate();
  const auth = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form.values, event: React.FormEvent<Element>) => {
    try {
      event.preventDefault();

      await auth.signin(values.email, values.password, () =>
        navigate('/resources', { replace: true })
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label="Email"
        placeholder="Enter your email"
        {...form.getInputProps('email')}
      />
      <PasswordInput
        required
        label="Password"
        placeholder="Enter your password"
        {...form.getInputProps('password')}
      />

      <Group mt="md" grow>
        <Button type="submit" radius="md" color="cyan">
          Submit
        </Button>
      </Group>
      <Space h="md" />
      <UnstyledButton onClick={() => setActiveTab(1)}>
        <Text size="md">
          Need an account?
          <Text variant="link" color="cyan">
            Sign up!
          </Text>
        </Text>
      </UnstyledButton>
    </form>
  );
}

export default SignIn;
