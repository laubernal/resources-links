import React from 'react';
import { Container, Grid, Group, Space } from '@mantine/core';

import SignOut from '../../Auth/Components/Auth/SignOut/SignOut';
import ResourcesTable from '../../ResourcesLinks/Components/ResourcesTable';
import Header from '../../Auth/Components/Header/Header';
import AddResourceForm from '../../ResourcesLinks/Components/AddResourceForm';

function Resources(): JSX.Element {
  return (
    <>
      <Container size="xl">
        <Grid grow>
          <Grid.Col span={3}>
            <Header />
          </Grid.Col>
          <Grid.Col span={1} offset={8}>
            <SignOut />
          </Grid.Col>
        </Grid>
      </Container>
      <Space h="xl" />
      <Container size="xl">
        <Group position="center">
          <Space h="md" />
          <ResourcesTable />
        </Group>
        <AddResourceForm />
      </Container>
    </>
  );
}

export default Resources;
