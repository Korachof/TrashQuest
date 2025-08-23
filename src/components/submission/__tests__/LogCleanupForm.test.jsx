// Tests for the LogCleanupForm component
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LogCleanupForm from '../LogCleanupForm';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  increment,
  setDoc,
} from 'firebase/firestore';
import { usePoints } from '../../../context/PointsContext';
import { useAuth } from '../../../context/AuthContext';

// Mock React Router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  getDoc: vi.fn(),
  increment: vi.fn(),
  setDoc: vi.fn(),
}));

// Mock Firebase config
vi.mock('../../firebase', () => ({
  db: {},
}));

// Mock contexts
vi.mock('../../../context/PointsContext', () => ({
  usePoints: vi.fn(),
}));

vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock alert and console
global.alert = vi.fn();
global.console.error = vi.fn();
global.console.log = vi.fn();

describe('LogCleanupForm', () => {
  const mockUpdateUserPoints = vi.fn();
  const mockUser = {
    uid: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock auth context
    vi.mocked(useAuth).mockReturnValue({
      currentUser: mockUser,
    });

    // Mock points context
    vi.mocked(usePoints).mockReturnValue({
      updateUserPoints: mockUpdateUserPoints,
    });

    // Mock current date to be consistent
    vi.setSystemTime(new Date('2024-01-15'));
  });

  // Test 1: Renders form with all required fields
  test('renders form with all required fields', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Verify all form fields are present
    expect(screen.getByLabelText('Date*')).toBeInTheDocument();
    expect(screen.getByLabelText('Cleanup Size*')).toBeInTheDocument();
    expect(screen.getByLabelText('Cleanup Type*')).toBeInTheDocument();
    expect(screen.getByLabelText('General Area*')).toBeInTheDocument();
    expect(screen.getByLabelText('City (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('State (Optional)')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Log Cleanup' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  // Test 2: Initializes with today's date
  test("initializes date field with today's date", () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Verify date field shows today's date
    const dateField = screen.getByLabelText('Date*');
    expect(dateField.value).toBe('2024-01-15');
  });

  // Test 3: Updates form data when Date input changes
  test('updates form data when Date input changes', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Change date
    fireEvent.change(screen.getByLabelText('Date*'), {
      target: { value: '2024-01-20' },
    });

    // Step 3: Verify value updated
    expect(screen.getByLabelText('Date*').value).toBe('2024-01-20');
  });

  // Test 4: Updates form data when cleanup size changes
  test('updates form data when cleanup size changes', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Change cleanup size
    fireEvent.change(screen.getByLabelText('Cleanup Size*'), {
      target: { value: 'Grocery Bag (~4 gallons)' },
    });

    // Step 3: Verify value updated
    expect(screen.getByLabelText('Cleanup Size*').value).toBe(
      'Grocery Bag (~4 gallons)'
    );
  });

  // Test 5: Updates form data when cleanup area changes
  test('updates form data when cleanup area changes', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Change cleanup size
    fireEvent.change(screen.getByLabelText('General Area*'), {
      target: { value: 'Park' },
    });

    // Step 3: Verify value updated
    expect(screen.getByLabelText('General Area*').value).toBe('Park');
  });

  // Test 6: Updates form data when city changes
  test('updates form data when city changes', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Change city
    fireEvent.change(screen.getByLabelText('City (Optional)'), {
      target: { value: 'Portland' },
    });

    // Step 3: Verify values updated
    expect(screen.getByLabelText('City (Optional)').value).toBe('Portland');
  });

  // Test 7: Updates form data when state changes
  test('updates form data when state changes', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Change city
    fireEvent.change(screen.getByLabelText('State (Optional)'), {
      target: { value: 'Oregon' },
    });

    // Step 3: Verify values updated
    expect(screen.getByLabelText('State (Optional)').value).toBe('Oregon');
  });

  // Test 8: Shows points preview when size is selected
  test('shows points preview when size is selected', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Select a size
    fireEvent.change(screen.getByLabelText('Cleanup Size*'), {
      target: { value: 'Single Large Item' },
    });

    // Step 3: Verify points preview appears
    expect(screen.getByText(/You'll earn 10 Eco Points!/)).toBeInTheDocument();
  });
});
