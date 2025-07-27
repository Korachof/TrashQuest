// Tests for the FormGroup component
import React from 'react';
import { render, screen } from '@testing-library/react';
import FormGroup from '../FormGroup';
import { vi } from 'vitest';

describe('FormGroup', () => {
  const defaultProps = {
    label: 'Email',
    type: 'email',
    value: '',
    onChange: vi.fn(), // reusable mock
    id: 'email-input',
  };

  // clear the reused mock onChange() before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verifies if the form label text renders correctly
  test('renders label text correctly', () => {
    render(<FormGroup {...defaultProps} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  // Test 2: Verifies that type email in FormGroup <input> renders correctly
  test('renders email input correctly', () => {
    render(<FormGroup {...defaultProps} type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  /* Test 3: Verifies that type password in FormGroup <input> renders correctly
     Second 'type' test is necessary to confirm type isn't hardcoded */
  test('renders password input correctly', () => {
    render(<FormGroup {...defaultProps} type="password" />);
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'type',
      'password'
    );
  });
});
