import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth, AuthProvider } from '../AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

// Mock Firebase
const mockUnsubscribe = vi.fn();

// OnAuthStateChanged calls UnSubscribe
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(() => mockUnsubscribe),
}));

// Mock Firebase config
vi.mock('../../firebase', () => ({
  auth: {},
}));

/* Simple test component
React Context requires a component to test */
function TestComponent() {
  const { currentUser, authLoading } = useAuth();
  return (
    <div>
      <span data-testid="user">{currentUser ? 'User exists' : 'No user'}</span>
      <span data-testid="loading">{authLoading ? 'Loading' : 'Done'}</span>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verifies that AuthContext provides correct intial state
  test('provides initial state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
  });

  // Test 2: Verifies that onAuthStateChanged is called when AuthProvider mounts
  test('calls onAuthStateChanged on mount', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(onAuthStateChanged).toHaveBeenCalledWith({}, expect.any(Function));
  });

  // Test 3: Verifies that authLoading becomes false after Firebase responds
  test('sets authLoading to false after Firebase responds', async () => {
    let authCallback;

    // Capture the callback function passed to onAuthStateChanged
    onAuthStateChanged.mockImplementation((auth, callback) => {
      authCallback = callback;
      return mockUnsubscribe;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially should be loading
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');

    /* Simulate Firebase responding (with or without a user) - wrapped in act()
       act() wrapper tells React that this update is intentional */
    await act(async () => {
      authCallback(null);
    });

    // Loading should now be false, and should be labeled Done.
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Done');
    });
  });

  // Test 4: Verifies that currentUser updates when Firebase returns an authenticated user
  test('updates currentUser when Firebase returns authenticated user', async () => {
    let authCallback;

    // Capture the callback function passed to onAuthStateChanged
    onAuthStateChanged.mockImplementation((auth, callback) => {
      authCallback = callback;
      return mockUnsubscribe;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially should show no user
    expect(screen.getByTestId('user')).toHaveTextContent('No user');

    // Simulate Firebase returning an authenticated user
    const mockUser = { displayName: 'Test User', uid: '123' };

    // use act() wrapper to tell React that the update is intentional
    await act(async () => {
      authCallback(mockUser);
    });

    // Should now show user exists
    expect(screen.getByTestId('user')).toHaveTextContent('User exists');
  });

  // Test 5: Verifies that unsubscribe function is called when AuthProvider unmounts
  test('calls unsubscribe function on unmount', () => {
    const { unmount } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Verify Firebase listener was set up
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);

    // Unmount the component
    unmount();

    // Verify cleanup function was called
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  // Test 6: Verifies that useAuth throws error when used outside AuthProvider
  test('useAuth throws error when used outside AuthProvider', () => {
    // Suppress console.error for this test since we expect an error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow();

    // Restore console.error
    consoleSpy.mockRestore();
  });
});
