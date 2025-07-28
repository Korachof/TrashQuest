import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfirmLogout from '../ConfirmLogout';
import { vi } from 'vitest';

// Mock the useEscape hook that ConfirmLogout uses
vi.mock('../../hooks/useEscape', () => ({
  default: vi.fn(),
}));

describe('ConfirmLogout', () => {
  const defaultProps = {
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
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
});
