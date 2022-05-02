import React, { useState } from 'react';
import { ActionIcon, Group, Modal, TextInput } from '@mantine/core';
import { CirclePlus } from 'tabler-icons-react';

import NewResourceForm from './NewResourceForm';

function AddResourceForm(): JSX.Element {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add a new resource">
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
          <CirclePlus onClick={() => setOpened(true)} />
        </ActionIcon>
      </Group>
    </div>
  );
}

export default AddResourceForm;
