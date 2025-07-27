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
  test('renders email input type correctly', () => {
    render(<FormGroup {...defaultProps} type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  /* Test 3: Verifies that type password in FormGroup <input> renders correctly
     Second 'type' test is necessary to confirm type isn't hardcoded
     Uses querySelector to directly query the rendered html for input */
  test('renders password input type correctly', () => {
    render(<FormGroup {...defaultProps} type="password" />);

    const input = document.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  // Test 4: Verifies that the input field renders the input value correctly
  test('renders input with correct value', () => {
    render(<FormGroup {...defaultProps} value="test@example.com" />);

    const input = screen.getByRole('textbox', { hidden: true });
    expect(input).toHaveValue('test@example.com');
  });

  // Test 5: Verifies that FormGroup inputs are set to required by default
  test('input is required by default', () => {
    render(<FormGroup {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  // Test 6: Verifies that FormGroup input requirement can be changed to FALSE
  test('input can be optional when required=false', () => {
    render(<FormGroup {...defaultProps} required={false} />);

    const input = screen.getByRole('textbox');
    expect(input).not.toBeRequired();
  });

  /* Test 7: Verifies that input label is connected to htmlfor and id.
     Confirms that screen readers and clicking work correctly 
     use 'for' instead of 'htmlFor' because in testing we need the actual html name
     'for' is reserved in Javascript, so htmlFor is used.*/
  test('label is connected to input via htmlFor and id', () => {
    render(<FormGroup {...defaultProps} />);

    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for', 'email-input');
    expect(input).toHaveAttribute('id', 'email-input');
  });
});
