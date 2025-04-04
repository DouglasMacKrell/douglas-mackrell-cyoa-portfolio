# 🧪 Testing Strategy

This document outlines the testing approach for the CYOA Portfolio project, promoting Test Driven Development (TDD) and ensuring consistent test coverage.

## Testing Philosophy

We follow a Test Driven Development (TDD) approach:

1. **Write the test first** - Define expected behavior before implementing
2. **Watch it fail** - Ensure the test fails as expected
3. **Implement the feature** - Write the minimum code needed to pass the test
4. **Refactor** - Clean up the implementation while keeping tests passing

## Testing Stack

- **Jest** - JavaScript testing framework
- **React Testing Library** - Testing utilities for React components
- **@testing-library/jest-dom** - Custom Jest matchers for DOM testing

## Test Types

### Component Tests

Component tests focus on how components render and behave in response to user interactions:

```tsx
// Example component test
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-4 py-2 rounded');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });
});
```

### Utility Tests

Utility tests focus on pure functions and application logic:

```tsx
// Example utility test
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  test('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  test('handles conditional classes', () => {
    expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
  });

  test('handles Tailwind conflicts', () => {
    expect(cn('p-4', 'p-6')).toBe('p-6');
  });
});
```

### Page Tests

Page tests focus on the integration of components within pages:

```tsx
// Example page test
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('HomePage', () => {
  test('renders the book cover', () => {
    render(<HomePage />);
    expect(screen.getByTestId('book-cover')).toBeInTheDocument();
  });

  test('renders the title', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { 
      name: /choose your own adventure/i 
    })).toBeInTheDocument();
  });
});
```

## Test Coverage Requirements

Every component, utility, and page should have tests that cover:

1. **Expected behavior** - Test the component under normal conditions
2. **Edge cases** - Test the component with extreme values or unusual inputs
3. **Failure states** - Test error handling and fallback behavior

## Testing Components with Styled-Components

For testing components that use Styled-Components, we typically don't test the styles directly but focus on functionality and accessibility:

```tsx
// Example of testing a styled component
import { render, screen } from '@testing-library/react';
import { BookCover } from '@/components/BookCover';

describe('BookCover', () => {
  test('renders the title and author', () => {
    render(<BookCover title="My Title" author="Test Author" />);
    expect(screen.getByText(/my title/i)).toBeInTheDocument();
    expect(screen.getByText(/test author/i)).toBeInTheDocument();
  });

  test('applies the correct data-testid', () => {
    render(<BookCover title="My Title" author="Test Author" />);
    expect(screen.getByTestId('book-cover')).toBeInTheDocument();
  });
});
```

## Running Tests

- **Run all tests**: `npm test`
- **Run tests in watch mode**: `npm run test:watch`
- **Run tests with coverage report**: `npm test -- --coverage`

## Test File Organization

Test files should be organized in one of two ways:

1. **Co-located tests**: Place test files in a `__tests__` directory next to the file they test:
   ```
   components/
   ├── Button.tsx
   └── __tests__/
       └── Button.test.tsx
   ```

2. **Mirrored test directory**: Mirror the src directory structure in a top-level `__tests__` directory:
   ```
   __tests__/
   └── components/
       └── Button.test.tsx
   ```

We primarily use the second approach in this project.

## Best Practices

- Use meaningful test descriptions
- Test behavior, not implementation details
- Keep tests simple and focused
- Use descriptive variable names
- Mock external dependencies
- Avoid testing third-party libraries
- Update tests when requirements change 