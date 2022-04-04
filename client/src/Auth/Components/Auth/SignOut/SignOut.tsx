import React from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../Hooks/useAuth';

function SignOut(): JSX.Element {
  const auth = useAuth();
  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault();

      auth.signout(() => navigate('/', { replace: true }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Button radius="md" color="cyan" onClick={onClick}>
      Sign out
    </Button>
  );
}

export default SignOut;
