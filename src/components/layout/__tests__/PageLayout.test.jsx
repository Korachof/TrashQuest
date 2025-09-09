import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PageLayout from '../PageLayout';

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

describe('PageLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  // Test 5: Verifies that the components are rendering in correct order
  test('renders components in correct order', () => {
    render(
      <PageLayout>
        <div data-testid="test-content">Test Content</div>
      </PageLayout>
    );

    const wrapper = screen.getByTestId('mock-header').parentElement;
    const children = Array.from(wrapper.children);

    expect(children[0]).toHaveAttribute('data-testid', 'mock-header');
    expect(children[1]).toHaveAttribute('data-testid', 'mock-main');
    expect(children[2]).toHaveAttribute('data-testid', 'mock-footer');
  });

  // Test 6: Verifies that styles are being applied as expected
  test('applies layout styles', () => {
    render(
      <PageLayout>
        <div data-testid="test-content">Test Content</div>
      </PageLayout>
    );

    const wrapper = screen.getByTestId('mock-header').parentElement;
    expect(wrapper).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  /* Test 7: Verifies that PageLayout still renders even if no children (like
     a <div>) are passed through */
  test('renders without children', () => {
    expect(() => render(<PageLayout />)).not.toThrow();

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-main')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});
