import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PageLayout from '../PageLayout';
import { useAuth } from '../../../context/AuthContext';

// Mock all dependencies
vi.mock('../Header', () => ({
  default: () => <header data-testid="mock-header">Header Component</header>,
}));

vi.mock('../Footer', () => ({
  default: () => <footer data-testid="mock-footer">Footer Component</footer>,
}));

vi.mock('../MainContainer', () => ({
  default: ({ children }) => <main data-testid="mock-main">{children}</main>,
}));

vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('PageLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({ currentUser: null });
  });

  // Test 1: Verifies that the Header component is rendering correctly
  test('renders Header component', () => {
    render(
      <PageLayout>
        <div data-testid="test-content">Test Content</div>
      </PageLayout>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  // Test 2: Verifies that the Footer component is rendering correctly
  test('renders Footer component', () => {
    render(
      <PageLayout>
        <div data-testid="test-content">Test Content</div>
      </PageLayout>
    );

    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  // Test 3: Verifies that the MainContainer component is rendering correctly
  test('renders MainContainer component', () => {
    render(
      <PageLayout>
        <div data-testid="test-content">Test Content</div>
      </PageLayout>
    );

    expect(screen.getByTestId('mock-main')).toBeInTheDocument();
  });

  // Test 4: Verifies that PageLayout is passing children to MainContainer correctly
  test('passes children to MainContainer', () => {
    render(
      <PageLayout>
        <div data-testid="test-content">Test Content</div>
      </PageLayout>
    );

    const mainContainer = screen.getByTestId('mock-main');
    const testContent = screen.getByTestId('test-content');
    expect(mainContainer).toContainElement(testContent);
  });
});
