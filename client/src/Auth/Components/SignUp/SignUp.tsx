import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Anchor, Button, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import SignIn from '../SignIn/SignIn';

function SignUp(): JSX.Element {
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

  return (
    <form>
      {/* <form onSubmit={form.onSubmit(handleSubmit)}> */}
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

      <Group position="right" mt="md">
        <Button type="submit" radius="xl" color="cyan">
          Submit
        </Button>
      </Group>
      <div>
        <Text size="sm">
          Already have an account?{' '}
          <Anchor component={Link} to="/signin" color="cyan">
            Sign in!
          </Anchor>
        </Text>
        <br />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </form>
  );
}

export default SignUp;
