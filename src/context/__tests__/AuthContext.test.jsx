import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
