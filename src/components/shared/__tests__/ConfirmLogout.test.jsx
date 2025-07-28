import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmLogout from '../ConfirmLogout';
import { vi } from 'vitest';

describe('ConfirmLogout', () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();
  const defaultProps = {
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verifies that the confirm logout message renders
  test('renders confirmation message', () => {
    render(<ConfirmLogout {...defaultProps} />);

    expect(
      screen.getByText('Are you sure you want to log out?')
    ).toBeInTheDocument();
  });

  // Test 2: Verifies that Yes button renders correctly
  test('renders Yes button', () => {
    render(<ConfirmLogout {...defaultProps} />);

    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  // Test 3: Verifies that No button renders correctly
  test('renders No button', () => {
    render(<ConfirmLogout {...defaultProps} />);

    expect(screen.getByText('No')).toBeInTheDocument();
  });

  // Test 4: Verifies that clicking Yes calls onConfirm
  test('calls onConfirm when Yes button is clicked', () => {
    render(<ConfirmLogout {...defaultProps} />);

    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  // Test 5: Verifies that clicking No calls onCancel
  test('calls onCancel when No button is clicked', () => {
    render(<ConfirmLogout {...defaultProps} />);

    const noButton = screen.getByText('No');
    fireEvent.click(noButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  /* Test 6: Verifies that useEscape hook is called with onCancel
     Escape key should trigger the cancel function when pressed */
  test('pressing Escape key calls onCancel', () => {
    render(<ConfirmLogout {...defaultProps} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
