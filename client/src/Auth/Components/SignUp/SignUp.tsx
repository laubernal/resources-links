import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Group,
  PasswordInput,
  Space,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { useAuth } from '../../Hooks/useAuth';

type propsType = { setActiveTab: Function };

function SignUp({ setActiveTab: setTabActive }: propsType): JSX.Element {
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      passwordConfirmation: (value, values) =>
        value !== values.password ? `Passwords don't match` : null,
    },
  });

  const handleSubmit = async (values: typeof form.values, event: React.FormEvent<Element>) => {
    try {
      event.preventDefault();
      await auth.signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.passwordConfirmation,
        () => navigate('/', { replace: true })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group direction="row" grow>
        <TextInput
          required
          label="First name"
          placeholder="Enter your first name"
          {...form.getInputProps('firstName')}
        />

        <TextInput
          required
          label="Last name"
          placeholder="Enter your last name"
          {...form.getInputProps('lastName')}
        />
      </Group>
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
      <PasswordInput
        required
        label="Password confirmation"
        placeholder="Repeat your password"
        {...form.getInputProps('passwordConfirmation')}
      />

      <Group mt="md" grow>
        <Button type="submit" radius="md" color="cyan">
          Submit
        </Button>
      </Group>
      <Space h="md" />
      <UnstyledButton onClick={() => setTabActive(0)}>
        <Text size="md">
          Already have an account?{' '}
          <Text variant="link" color="cyan">
            Sign in!
          </Text>
        </Text>
      </UnstyledButton>
    </form>
  );
}

export default SignUp;
