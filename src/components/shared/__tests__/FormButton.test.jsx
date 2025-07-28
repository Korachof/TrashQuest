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

  // Test 4: Verifies that the button is enabled by default
  test('is enabled by default', () => {
    render(<FormButton>Submit</FormButton>);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  // Test 5: Verifies that the button becomes disabled while loading
  test('is disabled when loading', () => {
    render(<FormButton isLoading={true}>Submit</FormButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  // Test 6: Verifies that the button shows default "loggin in..." text while loading
  test('shows default loading text when loading', () => {
    render(<FormButton isLoading={true}>Submit</FormButton>);

    expect(screen.getByText('🔄 Logging in...')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  // Test 7: Verifies that the button shows custom "loading" text when provided
  test('shows custom loading text when provided', () => {
    render(
      <FormButton isLoading={true} loadingText="🔄 Creating account...">
        Sign Up
      </FormButton>
    );

    expect(screen.getByText('🔄 Creating account...')).toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });
});
