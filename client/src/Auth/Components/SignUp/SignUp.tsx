import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
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
import { AlertCircle } from 'tabler-icons-react';

type propsType = { setActiveTab: Function };

function SignUp({ setActiveTab }: propsType): JSX.Element {
  const auth = useAuth();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      password: value => (value.length < 8 ? 'Password must have at least 8 characters' : null),
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
        () => navigate('/resources', { replace: true })
      );
    } catch (error: any) {
      setShowAlert(true);
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

      {showAlert ? (
        <Box>
          <Space h="md" />
          <Alert icon={<AlertCircle size={16} />} title="Error signing up!" color="red">
            Some data is wrong, please check it.
          </Alert>
        </Box>
      ) : null}

      <Group mt="md" grow>
        <Button type="submit" radius="md" color="cyan">
          Submit
        </Button>
      </Group>

      <Space h="md" />

      <Group spacing={5}>
        <Text>Already have an account?</Text>
        <UnstyledButton onClick={() => setActiveTab(0)}>
          <Text variant="link" color="cyan">
            Sign in!
          </Text>
        </UnstyledButton>
      </Group>
    </form>
  );
}

export default SignUp;
