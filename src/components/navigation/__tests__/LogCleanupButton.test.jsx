import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LogCleanupButton from '../LogCleanupButton';
import { vi } from 'vitest';

// Mock React Router's useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('LogCleanupButton', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  // Test 1: Verifies that the button renders with default text
  test('renders with default text', () => {
    render(
      <MemoryRouter>
        <LogCleanupButton />
      </MemoryRouter>
    );
    expect(screen.getByText('🌱 Log New Cleanup')).toBeInTheDocument();
  });

  // Test 2: Verifies that the button renders with custom text
  test('renders with custom text when provided', () => {
    render(
      <MemoryRouter>
        <LogCleanupButton text="Custom Cleanup Text" />
      </MemoryRouter>
    );
    expect(screen.getByText('🌱 Custom Cleanup Text')).toBeInTheDocument();
  });

  // Test 3: Verifies that the button is actually a button element
  test('renders as button element', () => {
    render(
      <MemoryRouter>
        <LogCleanupButton />
      </MemoryRouter>
    );
    const button = screen.getByText('🌱 Log New Cleanup');
    expect(button.tagName).toBe('BUTTON');
  });

  // Test 4: Verifies that clicking the button calls navigation exactly once.
  test('navigates to log-cleanup page when clicked', () => {
    render(
      <MemoryRouter>
        <LogCleanupButton />
      </MemoryRouter>
    );
    const button = screen.getByText('🌱 Log New Cleanup');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  // Test 5: Verifies that clicking the button calls navigation with correct path
  test('navigates to log-cleanup page when clicked', () => {
    render(
      <MemoryRouter>
        <LogCleanupButton />
      </MemoryRouter>
    );
    const button = screen.getByText('🌱 Log New Cleanup');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/log-cleanup');
  });

  // Test 6: Verifies that navigation isn't called on rendering of the button
  test('does not navigate on initial render', () => {
    render(
      <MemoryRouter>
        <LogCleanupButton />
      </MemoryRouter>
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
