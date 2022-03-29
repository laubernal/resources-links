import React from 'react';
import { useForm } from '@mantine/form';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../Hooks/useAuth';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import SignUp from '../SignUp/SignUp';

function SignIn(): JSX.Element {
  //   const { state, saveEmail, savePassword } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  //   const from = location?.state?.from?.pathname || '/';

  const handleSubmit = async (
    values: { email: string; password: string },
    event: React.FormEvent<Element>
  ) => {
    try {
      event.preventDefault();
      // await auth.signin(values.email, values.password, () => navigate(from, { replace: true }));
      await auth.signin(values.email, values.password, () => navigate('/', { replace: true }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      password: value => (value.length < 8 ? 'Password must have at least 8 characters' : null),
    },
  });

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

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
      <div>
        <p>
          Need an account? <Link to="/signup">Sign up!</Link>
        </p>{' '}
        <br />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </form>
  );
}

export default SignIn;
