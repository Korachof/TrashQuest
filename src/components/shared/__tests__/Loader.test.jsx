import react from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader', () => {
  // Test 1: Verifies that the loading message renders
  test('renders loading message', () => {
    render(<Loader />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Test 2: Verifies that the component renders a div element
  test('renders as a div element', () => {
    render(<Loader />);

    const loader = screen.getByText('Loading...');
    expect(loader.tagName).toBe('DIV');
  });

  // Test 3: Verifies that component renders without any props
  test('renders without props', () => {
    expect(() => render(<Loader />)).not.toThrow();
  });
});
