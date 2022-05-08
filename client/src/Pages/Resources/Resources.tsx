import React, { useState } from 'react';
import { ActionIcon, Container, Grid, Group, Modal, Space } from '@mantine/core';

import SignOut from '../../Auth/Components/Auth/SignOut/SignOut';
import ResourcesTable from '../../ResourcesLinks/Components/ResourcesTable';
import Header from '../../Auth/Components/Header/Header';
import NewResourceForm from '../../ResourcesLinks/Components/NewResourceForm';
import { Plus } from 'tabler-icons-react';

function Resources(): JSX.Element {
  const [openedModal, setOpenedModal] = useState(false);

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
        <Modal
          centered
          size="xl"
          opened={openedModal}
          onClose={() => setOpenedModal(false)}
          title="Add a new resource"
        >
          <NewResourceForm setOpenedModal={setOpenedModal} />
        </Modal>
        <Group position="right">
          <ActionIcon
            title="Add new resource"
            color="cyan"
            size="xl"
            radius="lg"
            variant="transparent"
          >
            <Plus size={40} strokeWidth={1.5} onClick={() => setOpenedModal(true)} />
          </ActionIcon>
        </Group>
      </Container>
    </>
  );
}

export default Resources;
