import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import TrashTypeSelect from '../TrashTypeSelect';

// Mock the FormGroup component
vi.mock('../../shared/FormGroup', () => ({
  default: ({ id, label, type, value, onChange, required, children }) => (
    <div data-testid="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        data-testid="trash-type-select"
        value={value || ''}
        onChange={onChange}
        required={required}
      >
        {children}
      </select>
    </div>
  ),
}));

describe('TrashTypeSelect', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Renders with default props
  test('renders with default props', () => {
    // Step 1: Render component with minimal props
    render(<TrashTypeSelect value="" onChange={mockOnChange} />);

    // Step 2: Verify basic elements are present
    expect(screen.getByTestId('form-group')).toBeInTheDocument();
    expect(screen.getByTestId('trash-type-select')).toBeInTheDocument();
    expect(screen.getByText('Cleanup Type')).toBeInTheDocument();
    expect(screen.getByText('Select type...')).toBeInTheDocument();
  });

  // Test 2: Renders all cleanup type options
  test('renders all cleanup type options', () => {
    // Step 1: Render component
    render(<TrashTypeSelect value="" onChange={mockOnChange} />);

    // Step 2: Verify all expected options are present
    expect(screen.getByText('Select type...')).toBeInTheDocument();
    expect(screen.getByText('General Trash')).toBeInTheDocument();
    expect(screen.getByText('General Recycling')).toBeInTheDocument();
    expect(screen.getByText('Electronics Recycling')).toBeInTheDocument();
    expect(screen.getByText('Hazardous Waste Disposal')).toBeInTheDocument();
  });

  // Test 3: Displays selected value correctly
  test('displays selected value correctly', () => {
    // Step 1: Render component with selected value
    render(<TrashTypeSelect value="General Trash" onChange={mockOnChange} />);

    // Step 2: Verify the select shows the correct value
    const select = screen.getByTestId('trash-type-select');
    expect(select.value).toBe('General Trash');
  });

  // Test 4: Calls onChange when selection changes
  test('calls onChange when selection changes', () => {
    // Step 1: Render component
    render(<TrashTypeSelect value="" onChange={mockOnChange} />);

    // Step 2: Change the selection
    const select = screen.getByTestId('trash-type-select');
    fireEvent.change(select, { target: { value: 'General Recycling' } });

    // Step 3: Verify onChange was called
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  // Test 5: Shows required asterisk when required prop is true
  test('shows required asterisk when required prop is true', () => {
    // Step 1: Render component with required prop
    render(
      <TrashTypeSelect
        value=""
        onChange={mockOnChange}
        required={true}
        label="Cleanup Type"
      />
    );

    // Step 2: Verify asterisk is added to label
    expect(screen.getByText('Cleanup Type*')).toBeInTheDocument();
  });

  // Test 6: Does not show hazardous warning by default
  test('does not show hazardous warning by default', () => {
    // Step 1: Render component with non-hazardous selection
    render(<TrashTypeSelect value="General Trash" onChange={mockOnChange} />);

    // Step 2: Verify warning is not present
    expect(screen.queryByText(/Important:/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/check your local city\/state laws/i)
    ).not.toBeInTheDocument();
  });

  // Test 7: Shows hazardous warning when Hazardous Waste Disposal is selected
  test('shows hazardous warning when Hazardous Waste Disposal is selected', () => {
    // Step 1: Render component with hazardous waste selected
    render(
      <TrashTypeSelect
        value="Hazardous Waste Disposal"
        onChange={mockOnChange}
      />
    );

    // Step 2: Verify warning is displayed
    expect(screen.getByText(/Important:/)).toBeInTheDocument();
    expect(
      screen.getByText(/check your local city\/state laws/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/batteries, paint, chemicals, and motor oil/i)
    ).toBeInTheDocument();
  });

  // Test 8: Proper warning/yield symbol renders with Hazardous Warning
  test('warning symbol renders with hazardous warning', () => {
    // Step 1: Render component with hazardous selection
    render(
      <TrashTypeSelect
        value="Hazardous Waste Disposal"
        onChange={mockOnChange}
      />
    );

    // Step 2: Find the warning div
    const warningText = screen.getByText(/Important:/).parentElement;

    // Step 3: Verify warning contains all expected text elements
    expect(warningText).toHaveTextContent('⚠️');
  });

  // Test 9: Hides hazardous warning when selection changes away from hazardous
  test('hides hazardous warning when selection changes from hazardous to non-hazardous', () => {
    // Step 1: Render component with hazardous waste initially selected
    const { rerender } = render(
      <TrashTypeSelect
        value="Hazardous Waste Disposal"
        onChange={mockOnChange}
      />
    );

    // Step 2: Change selection to non-hazardous
    rerender(<TrashTypeSelect value="General Trash" onChange={mockOnChange} />);

    // Step 3: Verify warning is hidden
    expect(screen.queryByText(/Important:/)).not.toBeInTheDocument();
  });

  // Test 10: Shows hazardous warning when selection changes to hazardous
  test('shows hazardous warning when selection changes to hazardous', () => {
    // Step 1: Render component with non-hazardous selection
    const { rerender } = render(
      <TrashTypeSelect value="General Trash" onChange={mockOnChange} />
    );

    // Step 2: Verify warning is not shown
    expect(screen.queryByText(/Important:/)).not.toBeInTheDocument();

    // Step 3: Change selection to hazardous
    rerender(
      <TrashTypeSelect
        value="Hazardous Waste Disposal"
        onChange={mockOnChange}
      />
    );

    // Step 4: Verify warning is now shown
    expect(screen.getByText(/Important:/)).toBeInTheDocument();
  });
});
