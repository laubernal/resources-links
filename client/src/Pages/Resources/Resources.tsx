import React, { useState } from 'react';
import { ActionIcon, Container, Grid, Group, Modal, Notification, Space } from '@mantine/core';

import SignOut from '../../Auth/Components/Auth/SignOut/SignOut';
import ResourcesTable from '../../ResourcesLinks/Components/ResourcesTable';
import Header from '../../Auth/Components/Header/Header';
import NewResourceForm from '../../ResourcesLinks/Components/NewResourceForm';
import { Check, Plus, X } from 'tabler-icons-react';

function Resources(): JSX.Element {
  const [openedModal, setOpenedModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);

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

        <ResourcesTable
          setShowSuccessNotification={setShowSuccessNotification}
          setShowErrorNotification={setShowErrorNotification}
        />

        <Space h="sm" />

        <Modal
          centered
          size="xl"
          opened={openedModal}
          onClose={() => setOpenedModal(false)}
          title="Add a new resource"
        >
          <NewResourceForm
            setOpenedModal={setOpenedModal}
            setShowSuccessNotification={setShowSuccessNotification}
            setShowErrorNotification={setShowErrorNotification}
          />
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

        {showSuccessNotification ? (
          <Group position="right">
            <Notification
              closeButtonProps={{ 'aria-label': 'Hide notification' }}
              icon={<Check size={18} />}
              color="teal"
              title="Saved!"
              onClose={() => setShowSuccessNotification(false)}
              {...setTimeout(() => setShowSuccessNotification(false), 3000)}
            >
              Your resource was saved succesfully!
            </Notification>
          </Group>
        ) : null}

        {showErrorNotification ? (
          <Group position="right">
            <Notification
              closeButtonProps={{ 'aria-label': 'Hide notification' }}
              icon={<X size={18} />}
              color="red"
              title="Error!"
              onClose={() => setShowErrorNotification(false)}
              {...setTimeout(() => setShowErrorNotification(false), 3000)}
            >
              There was a problem saving your resource! Please check your data
            </Notification>
          </Group>
        ) : null}
      </Container>
    </>
  );
}

export default Resources;
