import React from 'react';
import { Container, Grid, Group, Space } from '@mantine/core';

import SignOut from '../../Auth/Components/Auth/SignOut/SignOut';
import ResourcesTable from '../../ResourcesLinks/Components/ResourcesTable';
import Header from '../../Auth/Components/Header/Header';
import AddResourceForm from '../../ResourcesLinks/Components/AddResourceForm';

function Resources(): JSX.Element {
  return (
    <>
      <Container size={1600}>
        <Grid>
          <Grid.Col span={3}>
            <Header />
          </Grid.Col>
          <Grid.Col span={1} offset={8}>
            <SignOut />
          </Grid.Col>
        </Grid>
        <Space h="xl" />
        <ResourcesTable />
        <Space h="sm" />
        <AddResourceForm />
      </Container>
    </>
  );
}

export default Resources;
