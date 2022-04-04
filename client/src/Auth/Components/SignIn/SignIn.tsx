import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
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
import { AlertCircle } from 'tabler-icons-react';

import { useAuth } from '../../Hooks/useAuth';

type propsType = { setActiveTab: Function };

function SignIn({ setActiveTab }: propsType): JSX.Element {
  const navigate = useNavigate();
  const auth = useAuth();

  const [showAlert, setShowAlert] = useState(false);

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
      setShowAlert(true);
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

      {showAlert ? (
        <Box>
          <Space h="md" />
          <Alert icon={<AlertCircle size={16} />} title="Error signing in!" color="red">
            Email or password is wrong.
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
        <Text>Need an account?</Text>
        <UnstyledButton onClick={() => setActiveTab(1)}>
          <Text variant="link" color="cyan">
            Sign up!
          </Text>
        </UnstyledButton>
      </Group>
    </form>
  );
}

export default SignIn;
