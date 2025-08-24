// Tests for the DeleteCleanupEntryModal component
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import DeleteCleanupEntryModal from '../DeleteCleanupEntryModal';
import Modal from '../../shared/Modal';
import FormButton from '../../shared/FormButton';

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

vi.mock('../../shared/FormButton', () => ({
  default: ({ children, onClick, isCancel }) => (
    <button
      data-testid={isCancel ? 'cancel-button' : 'confirm-button'}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

describe('DeleteCleanupEntryModal', () => {
  const mockOnConfirm = vi.fn();
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

  const mockCurrentPoints = 250;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Does not render when isOpen is false
  test('does not render when isOpen is false', () => {
    // Step 1: Render component with isOpen false
    render(
      <DeleteCleanupEntryModal
        isOpen={false}
        entry={mockEntry}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify modal is not rendered
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete Cleanup Entry')).not.toBeInTheDocument();
  });

  // Test 2: Does not render when entry to delete is null
  test('does not render when entry to delete is null', () => {
    // Step 1: Render component with null entry
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={null}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify modal is not rendered
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  // Test 3: Renders modal with confirmation text when open
  test('renders modal with confirmation text when open and entry exists', () => {
    // Step 1: Render component with valid props
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify modal and content are rendered
    expect(
      screen.getByText('Are you sure you want to delete this entry?')
    ).toBeInTheDocument();
  });

  // Test 4: Displays entry information correctly
  test('displays entry information correctly', () => {
    // Step 1: Render component
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify entry details are displayed
    expect(
      screen.getByText('Grocery Bag (~4 gallons) • General Recycling')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Location: Park • Date: 2024-01-15')
    ).toBeInTheDocument();
  });

  // Test 5: Shows correct points calculation
  test('shows correct points calculation', () => {
    // Step 1: Render component
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify the key numbers and text are present
    expect(screen.getByText('60 points')).toBeInTheDocument();
    expect(screen.getByText('250 points')).toBeInTheDocument();
    expect(screen.getByText('190 points')).toBeInTheDocument();
  });

  // Test 6: Handles zero resulting points after calculation
  test('handles case where deletion would result in low points', () => {
    // Step 1: Create scenario where deletion brings points to zero
    const entry = { ...mockEntry, pointsEarned: 250 };

    // Step 2: Render component
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={entry}
        currentPoints={250}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 3: Verify calculation shows 0 points (use getAllByText since 250 appears twice)
    expect(screen.getAllByText('250 points')).toHaveLength(2); // Once for subtract, once for current
    expect(screen.getByText('0 points')).toBeInTheDocument();
  });

  // Test 7: Handles negative resulting points after calculation
  test('handles case where deletion would result in negative points', () => {
    // Step 1: Create scenario where deletion brings points to zero
    const entry = { ...mockEntry, pointsEarned: 300 };

    // Step 2: Render component
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={entry}
        currentPoints={250}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 3: Verify calculation shows 0 points
    expect(screen.getByText('250 points')).toBeInTheDocument();
    expect(screen.getByText('-50 points')).toBeInTheDocument();
  });

  // Test 8: Calls onConfirm when Delete Entry button clicked
  test('calls onConfirm when Delete Entry button is clicked', () => {
    // Step 1: Render component
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Click delete button
    fireEvent.click(screen.getByTestId('confirm-button'));

    // Step 3: Verify onConfirm was called
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  // Test 9: Calls onCancel when Cancel button clicked
  test('calls onCancel when Cancel button is clicked', () => {
    // Step 1: Render component
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Click cancel button
    fireEvent.click(screen.getByTestId('cancel-button'));

    // Step 3: Verify onCancel was called
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  // Test 10: Calls onCancel when modal close button clicked
  test('calls onCancel when modal close button is clicked', () => {
    // Step 1: Render component
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Click modal close button
    fireEvent.click(screen.getByTestId('modal-close'));

    // Step 3: Verify onCancel was called
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  // Test 12: Button text is correct
  test('displays correct button text', () => {
    // Step 1: Render component
    render(
      <DeleteCleanupEntryModal
        isOpen={true}
        entry={mockEntry}
        currentPoints={mockCurrentPoints}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    // Step 2: Verify button text
    expect(screen.getByText('Delete Entry')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
