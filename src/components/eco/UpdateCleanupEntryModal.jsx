// Modal for updating cleanup entries
import React from 'react';
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
      <p>
        Editing: {entry.size} • {entry.type}
      </p>
      <p>This will be the LogCleanupForm soon</p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={onUpdate}>Update Entry</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
}
