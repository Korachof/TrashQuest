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

  // Test 9: Submit button disabled when form is invalid
  test('submit button disabled when required fields are empty', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Verify submit button is disabled
    expect(screen.getByRole('button', { name: 'Log Cleanup' })).toBeDisabled();
  });

  // Test 10: Submit button enabled when all required fields filled
  test('submit button enabled when all required fields are filled', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Fill all required fields
    fireEvent.change(screen.getByLabelText('Cleanup Size*'), {
      target: { value: 'Single Small Item' },
    });
    fireEvent.change(screen.getByLabelText('Cleanup Type*'), {
      target: { value: 'General Trash' },
    });
    fireEvent.change(screen.getByLabelText('General Area*'), {
      target: { value: 'Park' },
    });

    // Step 3: Verify submit button is enabled
    expect(
      screen.getByRole('button', { name: 'Log Cleanup' })
    ).not.toBeDisabled();
  });

  // Test 11: Successful form submission for new entry
  test('successfully submits new cleanup entry', async () => {
    // Step 1: Mock successful Firestore operations
    vi.mocked(addDoc).mockResolvedValue({ id: 'new-doc-id' });
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 100 }),
    });
    vi.mocked(updateDoc).mockResolvedValue();

    // Step 2: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 3: Fill form with valid data
    fireEvent.change(screen.getByLabelText('Cleanup Size*'), {
      target: { value: 'Single Small Item' },
    });
    fireEvent.change(screen.getByLabelText('Cleanup Type*'), {
      target: { value: 'General Trash' },
    });
    fireEvent.change(screen.getByLabelText('General Area*'), {
      target: { value: 'Park' },
    });

    // Step 4: Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Log Cleanup' }));

    // Step 5: Wait for async operations and verify
    await waitFor(() => {
      expect(addDoc).toHaveBeenCalled();
      expect(updateDoc).toHaveBeenCalled();
      expect(mockUpdateUserPoints).toHaveBeenCalledWith(3); // Single Small Item = 3 points
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      expect(global.alert).toHaveBeenCalledWith(
        'Cleanup logged successfully! You earned 3 Eco Points!'
      );
    });
  });

  // Test 12: Handles form submission errors
  test('handles form submission errors gracefully', async () => {
    // Step 1: Mock Firestore error
    vi.mocked(addDoc).mockRejectedValue(new Error('Firestore error'));

    // Step 2: Render and fill form
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Cleanup Size*'), {
      target: { value: 'Single Small Item' },
    });
    fireEvent.change(screen.getByLabelText('Cleanup Type*'), {
      target: { value: 'General Trash' },
    });
    fireEvent.change(screen.getByLabelText('General Area*'), {
      target: { value: 'Park' },
    });

    // Step 3: Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Log Cleanup' }));

    // Step 4: Wait for error handling
    await waitFor(() => {
      expect(global.console.error).toHaveBeenCalledWith(
        'Error logging cleanup:',
        expect.any(Error)
      );
      expect(global.alert).toHaveBeenCalledWith(
        'Error logging cleanup. Please try again.'
      );
    });
  });

  // Test 13: Cancel button resets form
  test('cancel button resets form to initial state', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Fill some form fields
    fireEvent.change(screen.getByLabelText('Cleanup Size*'), {
      target: { value: 'Single Large Item' },
    });
    fireEvent.change(screen.getByLabelText('City (Optional)'), {
      target: { value: 'Portland' },
    });

    // Step 3: Click cancel
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    // Step 4: Verify form reset
    expect(screen.getByLabelText('Cleanup Size*').value).toBe('');
    expect(screen.getByLabelText('City (Optional)').value).toBe('');
    expect(screen.getByLabelText('Date*').value).toBe('2024-01-15'); // Reset to today
  });

  // Test 14: Edit mode - initializes with existing entry data
  test('edit mode initializes with existing entry data', () => {
    // Step 1: Mock existing entry
    const existingEntry = {
      id: 'existing-123',
      date: '2024-01-10',
      size: 'Single Large Item',
      type: 'General Recycling',
      area: 'Beach',
      city: 'San Francisco',
      state: 'CA',
      pointsEarned: 10,
    };

    // Step 2: Render in edit mode
    render(
      <MemoryRouter>
        <LogCleanupForm editMode={true} existingEntry={existingEntry} />
      </MemoryRouter>
    );

    // Step 3: Verify fields populated with existing data
    expect(screen.getByLabelText('Date*').value).toBe('2024-01-10');
    expect(screen.getByLabelText('Cleanup Size*').value).toBe(
      'Single Large Item'
    );
    expect(screen.getByLabelText('City (Optional)').value).toBe(
      'San Francisco'
    );
    expect(screen.getByLabelText('State (Optional)').value).toBe('CA');
  });

  // Test 15: Edit mode - calls onCancel when cancel clicked
  test('edit mode calls onCancel when cancel button clicked', () => {
    // Step 1: Mock onCancel function
    const mockOnCancel = vi.fn();

    // Step 2: Render in edit mode
    render(
      <MemoryRouter>
        <LogCleanupForm
          editMode={true}
          existingEntry={{ id: '123' }}
          onCancel={mockOnCancel}
        />
      </MemoryRouter>
    );

    // Step 3: Click cancel
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    // Step 4: Verify onCancel called
    expect(mockOnCancel).toHaveBeenCalled();
  });

  // Test 16: Shows all size options with correct points
  test('displays all size options with correct point values', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Verify all size options are present
    const sizeSelect = screen.getByLabelText('Cleanup Size*');
    expect(sizeSelect).toHaveTextContent('Single Small Item (3 points)');
    expect(sizeSelect).toHaveTextContent('Single Large Item (10 points)');
    expect(sizeSelect).toHaveTextContent(
      'Grocery Bag (~4 gallons) (60 points)'
    );
    expect(sizeSelect).toHaveTextContent(
      'Standard Garbage Bag (~13 gallons) (180 points)'
    );
    expect(sizeSelect).toHaveTextContent(
      'Commercial Garbage Bag (~30 gallons) (450 points)'
    );
  });

  // Test 17: Shows all area options
  test('displays all area options', () => {
    // Step 1: Render component
    render(
      <MemoryRouter>
        <LogCleanupForm />
      </MemoryRouter>
    );

    // Step 2: Verify all area options are present
    const areaSelect = screen.getByLabelText('General Area*');
    expect(areaSelect).toHaveTextContent('Downtown');
    expect(areaSelect).toHaveTextContent('Residential');
    expect(areaSelect).toHaveTextContent('Park');
    expect(areaSelect).toHaveTextContent('Highway');
    expect(areaSelect).toHaveTextContent('Beach');
  });
});
