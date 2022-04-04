import React from 'react';
import { Grid, Space } from '@mantine/core';

import SignOut from '../../Auth/Components/Auth/SignOut/SignOut';
import ResourcesLinks from '../../ResourcesLinks/Components/ResourcesLinks';
import Header from '../../Auth/Components/Header/Header';

function Resources(): JSX.Element {
  return (
    <>
      <Grid grow>
        <Grid.Col span={3}>
          <Header />
        </Grid.Col>
        <Grid.Col span={1} offset={8}>
          <SignOut />
        </Grid.Col>
      </Grid>
      <Space h="md" />
      <ResourcesLinks />
    </>
  );
}

export default Resources;
