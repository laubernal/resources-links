import React from 'react';
import { useForm } from '@mantine/form';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import { useAuth } from '../../Hooks/useAuth';
import { Anchor, Button, Group, PasswordInput, Space, Text, TextInput } from '@mantine/core';
import SignUp from '../SignUp';

function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const auth = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      password: value => (value.length < 8 ? 'Password must have at least 8 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values, event: React.FormEvent<Element>) => {
    try {
      event.preventDefault();

      await auth.signin(values.email, values.password, () => navigate('/', { replace: true }));
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
      <Text size="md">
        Need an account?{' '}
        <Anchor component={Link} to="/signup" color="cyan">
          Sign up!
        </Anchor>
      </Text>
      <br />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </form>
  );
}

export default SignIn;
