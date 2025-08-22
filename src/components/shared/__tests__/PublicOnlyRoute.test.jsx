// Tests for the PublicOnlyRoute component
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PublicOnlyRoute from '../PublicOnlyRoute';
import { useAuth } from '../../../context/AuthContext';

// Mock the useAuth hook
vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock the Loader component
vi.mock('../Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('PublicOnlyRoute', () => {
  // Reusable test component
  const TestChild = () => (
    <div data-testid="public-content">Welcome Page Content</div>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Renders public content when user is not authenticated
  test('renders children when user is not authenticated', () => {
    // Step 1: Mock unauthenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      authLoading: false,
    });

    // Step 2: Render PublicOnlyRoute with test content
    render(
      <MemoryRouter>
        <PublicOnlyRoute>
          <TestChild />
        </PublicOnlyRoute>
      </MemoryRouter>
    );

    // Step 3: Verify public content renders
    expect(screen.getByTestId('public-content')).toBeInTheDocument();
  });

  // Test 2: Shows loader while authentication is loading
  test('shows loader while authentication is loading', () => {
    // Step 1: Mock loading state
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      authLoading: true,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <PublicOnlyRoute>
          <TestChild />
        </PublicOnlyRoute>
      </MemoryRouter>
    );

    // Step 3: Verify loader appears and public content does not
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  // Test 3: Does not render children when user is authenticated
  test('does not render children when user is authenticated', () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: '123', email: 'test@example.com' },
      authLoading: false,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <PublicOnlyRoute>
          <TestChild />
        </PublicOnlyRoute>
      </MemoryRouter>
    );

    // Step 3: Verify public content does not render
    expect(screen.queryByTestId('public-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  // Test 4: Loading takes precedence over authentication state
  test('shows loader even when user is authenticated but auth is still loading', () => {
    // Step 1: Mock loading state with authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: '123', email: 'test@example.com' },
      authLoading: true, // Still loading even with user
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <PublicOnlyRoute>
          <TestChild />
        </PublicOnlyRoute>
      </MemoryRouter>
    );

    // Step 3: Verify loader appears (loading takes precedence)
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('public-content')).not.toBeInTheDocument();
  });

  // Test 5: Re-renders correctly when auth state changes from loading to unauthenticated
  test('re-renders correctly when auth state changes from loading to unauthenticated', () => {
    // Step 1: Mock initial loading state
    const mockUseAuth = vi.mocked(useAuth);
    mockUseAuth.mockReturnValue({
      currentUser: null,
      authLoading: true,
    });

    // Step 2: Render component
    const { rerender } = render(
      <MemoryRouter>
        <PublicOnlyRoute>
          <TestChild />
        </PublicOnlyRoute>
      </MemoryRouter>
    );

    // Step 4: Change to unauthenticated state
    mockUseAuth.mockReturnValue({
      currentUser: null,
      authLoading: false,
    });

    // Step 5: Re-render component
    rerender(
      <MemoryRouter>
        <PublicOnlyRoute>
          <TestChild />
        </PublicOnlyRoute>
      </MemoryRouter>
    );

    // Step 6: Verify public content now renders
    expect(screen.getByTestId('public-content')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  // Test 6: Re-renders correctly when auth state changes from loading to authenticated
  test('re-renders correctly when auth state changes from loading to authenticated', () => {
    // Step 1: Mock initial loading state
    const mockUseAuth = vi.mocked(useAuth);
    mockUseAuth.mockReturnValue({
      currentUser: null,
      authLoading: true,
    });

    // Step 2: Render component
    const { rerender } = render(
      <MemoryRouter>
        <PublicOnlyRoute>
          <TestChild />
        </PublicOnlyRoute>
      </MemoryRouter>
    );

    // Step 4: Change to authenticated state
    mockUseAuth.mockReturnValue({
      currentUser: { uid: '789', email: 'user@test.com' },
      authLoading: false,
    });

    // Step 5: Re-render component
    rerender(
      <MemoryRouter>
        <PublicOnlyRoute>
          <TestChild />
        </PublicOnlyRoute>
      </MemoryRouter>
    );

    // Step 6: Verify public content does NOT render (user gets redirected)
    expect(screen.queryByTestId('public-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
