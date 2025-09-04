// Modal for updating cleanup entries
import React from 'react';
import LogCleanupForm from '../submission/LogCleanupForm';
import Modal from '../shared/Modal';
import { modalHeadingTextStyle } from '../../styles/typography';
import { updateCleanupContent as content } from '../../content/updateCleanup';

export default function UpdateCleanupEntryModal({
  isOpen,
  entry,
  onUpdate,
  onCancel,
}) {
  if (!entry) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h2 style={modalHeadingTextStyle}>{content.title}</h2>
      <LogCleanupForm
        editMode={true}
        existingEntry={entry}
        onCancel={onCancel}
        onUpdate={onUpdate}
      />
    </Modal>
  );
}
