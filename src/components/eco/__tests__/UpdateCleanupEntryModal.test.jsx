import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import UpdateCleanupEntryModal from '../UpdateCleanupEntryModal';
import LogCleanupForm from '../../submission/LogCleanupForm';
import Modal from '../../shared/Modal';

// Mock child components
vi.mock('../../shared/Modal', () => ({
  default: ({ isOpen, onClose, children }) =>
    isOpen ? (
      <div data-testid="modal">
        <button data-testid="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    ) : null,
}));

vi.mock('../../submission/LogCleanupForm', () => ({
  default: ({ editMode, existingEntry, onCancel, onUpdate }) => (
    <div data-testid="log-cleanup-form">
      <div data-testid="edit-mode">{editMode ? 'true' : 'false'}</div>
      <div data-testid="existing-entry">{JSON.stringify(existingEntry)}</div>
      <button data-testid="form-cancel" onClick={onCancel}>
        Cancel
      </button>
      <button
        data-testid="form-update"
        onClick={() => onUpdate('mock-updated-entry')}
      >
        Update
      </button>
    </div>
  ),
}));

describe('UpdateCleanupEntryModal', () => {
  const mockOnUpdate = vi.fn();
  const mockOnCancel = vi.fn();

  const mockEntry = {
    id: 'entry-123',
    date: '2024-01-15',
    size: 'Grocery Bag (~4 gallons)',
    type: 'General Recycling',
    area: 'Park',
    city: 'Portland',
    state: 'OR',
    pointsEarned: 60,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Does not render when isOpen is false
  test('does not render when isOpen is false', () => {
    // Step 1: Render component with isOpen false
    render(
      <UpdateCleanupEntryModal
        isOpen={false}
        entry={mockEntry}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify modal is not rendered
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit Cleanup Entry')).not.toBeInTheDocument();
  });

  // Test 2: Does not render when entry is null
  test('does not render when entry is null', () => {
    // Step 1: Render component with null entry
    render(
      <UpdateCleanupEntryModal
        isOpen={true}
        entry={null}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify modal is not rendered
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  // Test 3: Renders modal with form when open and entry exists
  test('renders modal with form when open and entry exists', () => {
    // Step 1: Render component with valid props
    render(
      <UpdateCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify modal and content are rendered
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Edit Cleanup Entry')).toBeInTheDocument();
    expect(screen.getByTestId('log-cleanup-form')).toBeInTheDocument();
  });

  // Test 4: Passes correct edit mode prop to LogCleanupForm
  test('passes correct props to LogCleanupForm', () => {
    // Step 1: Render component
    render(
      <UpdateCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify LogCleanupForm receives correct props
    expect(screen.getByTestId('edit-mode')).toHaveTextContent('true');
  });

  // Test 5: Passes correct existing entry prop to LogCleanupForm
  test('passes correct props to LogCleanupForm', () => {
    // Step 1: Render component
    render(
      <UpdateCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify LogCleanupForm receives correct props
    expect(screen.getByTestId('existing-entry')).toHaveTextContent(
      JSON.stringify(mockEntry)
    );
  });

  // Test 6: Calls onCancel when form cancel button is clicked
  test('calls onCancel when form cancel button is clicked', () => {
    // Step 1: Render component
    render(
      <UpdateCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Click form cancel button
    const cancelButton = screen.getByTestId('form-cancel');
    cancelButton.click();

    // Step 3: Verify onCancel was called
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  // Test 7: Calls onCancel when modal close button is clicked
  test('calls onCancel when modal close button is clicked', () => {
    // Step 1: Render component
    render(
      <UpdateCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Click modal close button
    const closeButton = screen.getByTestId('modal-close');
    closeButton.click();

    // Step 3: Verify onCancel was called
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  // Test 8: Calls onUpdate when form update button is clicked
  test('calls onUpdate when form update button is clicked', () => {
    // Step 1: Render component
    render(
      <UpdateCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Click form update button
    const updateButton = screen.getByTestId('form-update');
    updateButton.click();

    // Step 3: Verify onUpdate was called
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith('mock-updated-entry');
  });

  // Test 9: Update Modal title is correct
  test('displays correct update modal title', () => {
    // Step 1: Render component
    render(
      <UpdateCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify title is displayed
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Edit Cleanup Entry'
    );
  });
});
