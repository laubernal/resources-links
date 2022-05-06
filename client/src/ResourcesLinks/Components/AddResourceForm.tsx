import React, { useState } from 'react';
import { ActionIcon, Group, Modal } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

import NewResourceForm from './NewResourceForm';

function AddResourceForm(): JSX.Element {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal
        centered
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a new resource"
      >
        <NewResourceForm />
      </Modal>
      <Group position="right">
        <ActionIcon
          title="Add new resource"
          color="cyan"
          size="xl"
          radius="lg"
          variant="transparent"
        >
          <Plus size={40} strokeWidth={1.5} onClick={() => setOpened(true)} />
        </ActionIcon>
      </Group>
    </div>
  );
}

export default AddResourceForm;
