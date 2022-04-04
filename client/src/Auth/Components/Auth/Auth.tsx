import React, { useState } from 'react';

import { Tabs, Box } from '@mantine/core';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

function Auth(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ maxWidth: 350 }} mx="auto">
      <Tabs grow color="cyan" active={activeTab} onTabChange={setActiveTab}>
        <Tabs.Tab label="Sign in">{<SignIn setActiveTab={setActiveTab} />}</Tabs.Tab>
        <Tabs.Tab label="Sign up">{<SignUp setActiveTab={setActiveTab} />}</Tabs.Tab>
      </Tabs>
    </Box>
  );
}

export default Auth;
