import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CleanupEntriesList from '../CleanupEntriesList';
import useCleanupEntries from '../../../hooks/useCleanupEntries';
import DeleteCleanupEntryModal from '../DeleteCleanupEntryModal';
import UpdateCleanupEntryModal from '../UpdateCleanupEntryModal';
import { getButtonStyle } from '../../../styles/buttonStyles';
import { colors } from '../../../styles/colors';

// Mock React Router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock custom hook
vi.mock('../../../hooks/useCleanupEntries', () => ({
  default: vi.fn(),
}));

// Mock child components
vi.mock('../DeleteCleanupEntryModal', () => ({
  default: ({ isOpen, entry, currentPoints, onConfirm, onCancel }) =>
    isOpen ? (
      <div data-testid="delete-modal">
        <div data-testid="delete-entry-id">{entry?.id}</div>
        <div data-testid="delete-current-points">{currentPoints}</div>
        <button data-testid="delete-confirm" onClick={onConfirm}>
          Confirm Delete
        </button>
        <button data-testid="delete-cancel" onClick={onCancel}>
          Cancel Delete
        </button>
      </div>
    ) : null,
}));

vi.mock('../UpdateCleanupEntryModal', () => ({
  default: ({ isOpen, entry, onUpdate, onCancel }) =>
    isOpen ? (
      <div data-testid="update-modal">
        <div data-testid="update-entry-id">{entry?.id}</div>
        <button
          data-testid="update-confirm"
          onClick={() => onUpdate('updated-entry')}
        >
          Confirm Update
        </button>
        <button data-testid="update-cancel" onClick={onCancel}>
          Cancel Update
        </button>
      </div>
    ) : null,
}));

// Mock styles
vi.mock('../../../styles/buttonStyles', () => ({
  getButtonStyle: vi.fn(() => ({ padding: '8px 16px', borderRadius: '4px' })),
}));

vi.mock('../../../styles/colors', () => ({
  colors: {
    EcoDisplayTextColor: '#155724',
    navButtonTextColor: '#007bff',
  },
}));

describe('CleanupEntriesList', () => {
  const mockDeleteEntry = vi.fn();
  const mockUpdateEntry = vi.fn();

  const mockEntries = [
    {
      id: 'entry-1',
      date: '2024-01-15',
      size: 'Grocery Bag (~4 gallons)',
      type: 'General Recycling',
      area: 'Park',
      pointsEarned: 60,
    },
    {
      id: 'entry-2',
      date: '2024-01-10',
      size: 'Single Large Item',
      type: 'Electronics Recycling',
      area: 'Downtown',
      pointsEarned: 10,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Shows loading state
  test('displays loading state when loading', () => {
    // Step 1: Mock loading state
    useCleanupEntries.mockReturnValue({
      entries: [],
      loading: true,
      currentPoints: 0,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Verify loading message
    expect(screen.getByText('Loading cleanup entries...')).toBeInTheDocument();
  });

  // Test 2: Shows empty state when no entries exist
  test('displays empty state when no entries exist', () => {
    // Step 1: Mock empty entries
    useCleanupEntries.mockReturnValue({
      entries: [],
      loading: false,
      currentPoints: 0,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Verify empty state message
    expect(screen.getByText(/No cleanup entries yet/)).toBeInTheDocument();
    expect(
      screen.getByText(/Start logging your eco activities!/)
    ).toBeInTheDocument();
  });

  // Test 3: Shows delete button for each entry
  test('displays delete and edit buttons for each entry', () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Verify button is present
    const deleteButtons = screen.getAllByText('×');

    expect(deleteButtons).toHaveLength(2); // One for each entry
  });

  // Test 4: Shows edit button for each entry
  test('displays delete and edit buttons for each entry', () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Verify button is present
    const editButtons = screen.getAllByText('Edit');

    expect(editButtons).toHaveLength(2); // One for each entry
  });

  // Test 5: Opens delete modal when delete button clicked
  test('opens delete modal when delete button is clicked', () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Click delete button for first entry
    const deleteButtons = screen.getAllByText('×');
    fireEvent.click(deleteButtons[0]);

    // Step 4: Verify delete modal opens with correct entry
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });

  // Test 6: Opens edit modal when edit button clicked
  test('opens edit modal when edit button is clicked', () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Click edit button for second entry
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[1]);

    // Step 4: Verify edit modal opens with correct entry
    expect(screen.getByTestId('update-modal')).toBeInTheDocument();
  });

  // Test 7: Handles delete confirmation
  test('handles delete confirmation correctly', async () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Open delete modal
    const deleteButtons = screen.getAllByText('×');
    fireEvent.click(deleteButtons[0]);

    // Step 4: Confirm delete
    fireEvent.click(screen.getByTestId('delete-confirm'));

    // Step 5: Verify delete was called and navigation occurred
    await waitFor(() => {
      expect(mockDeleteEntry).toHaveBeenCalledWith('entry-1');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  // Test 8: Handles edit confirmation
  test('handles edit confirmation correctly', () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Open edit modal
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    // Step 4: Confirm update
    fireEvent.click(screen.getByTestId('update-confirm'));

    // Step 5: Verify update was called
    expect(mockUpdateEntry).toHaveBeenCalledWith('updated-entry');
  });

  // Test 9: Does not show View All button by default
  test('does not display View All button by default', () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component without showViewAll
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Verify View All button is not present
    expect(screen.queryByText('View All Entries')).not.toBeInTheDocument();
  });

  // Test 10: Shows View All button when showViewAll is true
  test('displays View All button when showViewAll prop is true', () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component with showViewAll
    render(
      <MemoryRouter>
        <CleanupEntriesList showViewAll={true} />
      </MemoryRouter>
    );

    // Step 3: Verify View All button is present
    expect(screen.getByText('View All Entries')).toBeInTheDocument();
  });

  // Test 11: View All button navigates correctly
  test('View All button navigates to correct route', () => {
    // Step 1: Mock entries data
    useCleanupEntries.mockReturnValue({
      entries: mockEntries,
      loading: false,
      currentPoints: 270,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component with showViewAll
    render(
      <MemoryRouter>
        <CleanupEntriesList showViewAll={true} />
      </MemoryRouter>
    );

    // Step 3: Click View All button
    fireEvent.click(screen.getByText('View All Entries'));

    // Step 4: Verify navigation
    expect(mockNavigate).toHaveBeenCalledWith('/cleanup-entries');
  });

  // Test 12: Handles single entry correctly
  test('handles single entry correctly', () => {
    // Step 1: Mock single entry
    const singleEntry = [mockEntries[0]];
    useCleanupEntries.mockReturnValue({
      entries: singleEntry,
      loading: false,
      currentPoints: 60,
      deleteEntry: mockDeleteEntry,
      updateEntry: mockUpdateEntry,
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <CleanupEntriesList />
      </MemoryRouter>
    );

    // Step 3: Verify single entry is displayed
    expect(screen.getByText('Grocery Bag (~4 gallons)')).toBeInTheDocument();
    expect(screen.getAllByText('×')).toHaveLength(1);
    expect(screen.getAllByText('Edit')).toHaveLength(1);
  });
});
