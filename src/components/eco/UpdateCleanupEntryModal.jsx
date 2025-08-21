// Modal for updating cleanup entries
import React from 'react';
import LogCleanupForm from '../submission/LogCleanupForm';
import Modal from '../shared/Modal';

export default function UpdateCleanupEntryModal({
  isOpen,
  entry,
  onUpdate,
  onCancel,
}) {
  if (!entry) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h3>Edit Cleanup Entry</h3>
      <LogCleanupForm
        editMode={true}
        existingEntry={entry}
        onCancel={onCancel}
      />
    </Modal>
  );
}
