// Modal for confirming deletion of cleanup entries
import React from 'react';
import Modal from '../shared/Modal';
import FormButton from '../shared/FormButton';
import { modalHeadingTextStyle, modalTextStyle } from '../../styles/typography';
import {
  modalButtonContainer,
  modalContentStyleWrapper,
} from '../../styles/layout';

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
      <h2 style={modalHeadingTextStyle}>Delete Cleanup Entry</h2>
      <p style={modalTextStyle}>Are you sure you want to delete this entry?</p>
      <p>
        <strong>
          {entry.size} • {entry.type}
        </strong>
      </p>
      <p>
        Location: {entry.area} • Date: {entry.date}
      </p>

      <div style={modalContentStyleWrapper}>
        <p style={modalTextStyle}>
          This will subtract <strong>{entry.pointsEarned} points</strong> from
          your total.
        </p>
        <p style={modalTextStyle}>
          Current: <strong>{currentPoints} points</strong> → New:{' '}
          <strong>{newPointsTotal} points</strong>
        </p>
      </div>

      <div style={modalButtonContainer}>
        <FormButton onClick={handleConfirmDelete}>Delete Entry</FormButton>
        <FormButton isCancel={true} onClick={onCancel}>
          Cancel
        </FormButton>
      </div>
    </Modal>
  );
}
