import React from 'react';
import { Box, Space, Title } from '@mantine/core';

import Auth from '../../Auth/Components/Auth';

function Home(): JSX.Element {
  return (
    <Box sx={{ maxWidth: 600 }} mx="auto">
      <Space h="xl" />
      <Title order={1} align="center">
        Welcome to Resources Links
      </Title>
      <Space h="xl" />
      <Auth />
    </Box>
  );
}

export default Home;
