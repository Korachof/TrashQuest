import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmLogout from '../ConfirmLogout';
import { vi } from 'vitest';

// Mock the useEscape hook that ConfirmLogout uses
vi.mock('../../hooks/useEscape', () => ({
  default: vi.fn(),
}));

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
});
