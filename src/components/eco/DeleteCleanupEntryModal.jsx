// Modal for confirming deletion of cleanup entries
import React from 'react';
import Modal from '../shared/Modal';
import FormButton from '../shared/FormButton';
import { modalHeadingTextStyle, modalTextStyle } from '../../styles/typography';
import {
  modalButtonContainer,
  modalContentStyleWrapper,
} from '../../styles/layout';
import { deleteCleanupContent as content } from '../../content/deleteCleanup';

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
      <h2 style={modalHeadingTextStyle}>{content.title}</h2>
      <p style={modalTextStyle}>{content.subTitle}</p>
      <p>
        <strong>
          {entry.size} • {entry.type}
        </strong>
      </p>
      <p>
        {content.location}
        {entry.area}
        {content.date}
        {entry.date}
      </p>

      <div style={modalContentStyleWrapper}>
        <p style={modalTextStyle}>
          {content.subtractMsg}
          <strong>
            {entry.pointsEarned}
            {content.points}
          </strong>
          {content.fromTotal}
        </p>
        <p style={modalTextStyle}>
          {content.current}
          <strong>
            {currentPoints}
            {content.points}
          </strong>
          {content.newPoints}
          <strong>
            {newPointsTotal}
            {content.points}
          </strong>
        </p>
      </div>

      <div style={modalButtonContainer}>
        <FormButton onClick={handleConfirmDelete}>
          {content.deleteButton}
        </FormButton>
        <FormButton isCancel={true} onClick={onCancel}>
          {content.cancelButton}
        </FormButton>
      </div>
    </Modal>
  );
}
