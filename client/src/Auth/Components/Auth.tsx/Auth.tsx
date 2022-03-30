import React from 'react';

import { Tabs, Box } from '@mantine/core';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

function Auth(): JSX.Element {
  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Tabs grow color="cyan">
        <Tabs.Tab label="Sign in">{<SignIn />}</Tabs.Tab>
        <Tabs.Tab label="Sign up">{<SignUp />}</Tabs.Tab>
      </Tabs>
    </Box>
  );
}

export default Auth;
