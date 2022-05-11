import React from 'react';
import { Button, Group, Modal } from '@mantine/core';
import { useResource } from '../Hooks/useResource';

interface DeleteConfirmationModalProps {
  openedModal: boolean;
  setOpenedModal: (boolean: boolean) => void;
  resourceId: string;
}

function DeleteConfirmationModal({
  openedModal: openedDeleteModal,
  setOpenedModal: setOpenedDeleteModal,
  resourceId,
}: DeleteConfirmationModalProps): JSX.Element {
  const resource = useResource();

  const handleConfirm = async (): Promise<void> => {
    try {
      await resource.deleteResource(resourceId);

      await resource.fetchResourceList();
      setOpenedDeleteModal(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      withinPortal
      centered
      size="xl"
      opened={openedDeleteModal}
      onClose={() => setOpenedDeleteModal(false)}
      title="Are you sure you want to delete this resource?"
    >
      <Group position="right">
        <Button
          variant="outline"
          radius="md"
          color="cyan"
          onClick={() => setOpenedDeleteModal(false)}
        >
          Cancel
        </Button>
        <Button radius="md" color="cyan" onClick={handleConfirm}>
          Confirm
        </Button>
      </Group>
    </Modal>
  );
}

export default DeleteConfirmationModal;
