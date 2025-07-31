import React from 'react';
import { render, screen } from '@testing-library/react';
import MainContainer from '../MainContainer';

describe('MainContainer', () => {
  // Test 1: Verifies that MainContainer renders as "<main>" element
  test('renders as main element', () => {
    render(
      <MainContainer>
        <div data-testid="test-content">Test Content</div>
      </MainContainer>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  /* Test 2: Verifies that children are rendered correctly
     Ensures MainContainer component is a container (core function) */
  test('renders children correctly', () => {
    render(
      <MainContainer>
        <div data-testid="test-content">Test Content</div>
      </MainContainer>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  // Test 3: Verifies that the main element contains the children
  test('main element contains children', () => {
    render(
      <MainContainer>
        <div data-testid="test-content">Test Content</div>
      </MainContainer>
    );

    const mainElement = screen.getByRole('main');
    const testContent = screen.getByTestId('test-content');
    expect(mainElement).toContainElement(testContent);
  });

  // Test 4: Verifies that MainContainer works without any children
  test('renders without children', () => {
    expect(() => render(<MainContainer />)).not.toThrow();

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
