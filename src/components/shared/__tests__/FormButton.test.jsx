// Tests for the FormButton component
import React from 'react';
import { render, screen } from '@testing-library/react';
import FormButton from '../FormButton';
import { vi } from 'vitest';

describe('FormButton', () => {
  // Test 1: Verifies that the button renders child text correctly
  test('renders children text correctly', () => {
    render(<FormButton>Log In</FormButton>);

    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  // Test 2: Verifies that button has the submit type by default
  test('has submit type by default', () => {
    render(<FormButton>Submit</FormButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  // Test 3: Verifies that the button type can be overridden for reusability
  test('can override default type prop', () => {
    render(<FormButton type="button">Click Me</FormButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
