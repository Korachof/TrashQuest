// Modal for confirming deletion of cleanup entries
import React from 'react';
import Modal from '../shared/Modal';
import FormButton from '../shared/FormButton';

export default function DeleteCleanupEntryModal({
  isOpen,
  entry,
  currentPoints,
  onConfirm,
  onCancel,
}) {
  if (!entry) return null;

  const newPointsTotal = currentPoints - entry.pointsEarned;

  const handleConfirmDelete = () => {
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h3>Delete Cleanup Entry</h3>
      <p>Are you sure you want to delete this entry?</p>
      <p>
        <strong>
          {entry.size} • {entry.type}
        </strong>
      </p>
      <p>
        Location: {entry.area} • Date: {entry.date}
      </p>

      <div
        style={{
          margin: '1rem 0',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '4px',
        }}
      >
        <p>
          This will subtract <strong>{entry.pointsEarned} points</strong> from
          your total.
        </p>
        <p>
          Current: <strong>{currentPoints} points</strong> → New:{' '}
          <strong>{newPointsTotal} points</strong>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <FormButton onClick={handleConfirmDelete}>Delete Entry</FormButton>
        <FormButton isCancel={true} onClick={onCancel}>
          Cancel
        </FormButton>
      </div>
    </Modal>
  );
}
