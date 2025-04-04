# 💅 Style Guide

This document outlines the coding standards and style guidelines for the CYOA Portfolio project.

## Code Formatting

- Use 2-space indentation
- Use single quotes for strings
- Include semicolons
- Maximum line length of 100 characters
- Use parentheses around arrow function parameters, even when there's only one
- Use explicit return types for functions

## TypeScript Guidelines

- Use TypeScript for all files (`.ts`, `.tsx`)
- Define interfaces or types for all props and state
- Avoid using `any` type
- Use proper naming conventions:
  - PascalCase for components, interfaces, and types
  - camelCase for variables, functions, and methods
  - UPPER_SNAKE_CASE for constants
- Export types and interfaces that are used across multiple files

## Component Structure

- One component per file
- Component file names should match the component name (e.g., `Button.tsx` for `Button` component)
- Organize imports in the following order:
  1. React and Next.js imports
  2. Third-party libraries
  3. Custom components
  4. Styles, utilities, and types
- Use functional components with hooks instead of class components
- Keep components small and focused on a single responsibility

## Styling Approach

We use a hybrid styling approach that leverages both Styled Components and Tailwind CSS:

### Styled Components (Primary)

Use Styled Components for:
- Complex UI components (book cover, frames, etc.)
- Elements requiring advanced styling features (masks, complex borders)
- State-dependent styles
- Animations and transitions
- Component-specific styling that requires JavaScript interaction

Example:
```tsx
import styled from 'styled-components';

const Button = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? 'palevioletred' : 'white'};
  color: ${props => props.$primary ? 'white' : 'palevioletred'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  transition: all 0.3s ease;
`;
```

### Tailwind CSS (Supportive)

Use Tailwind CSS for:
- Layout and spacing
- Typography
- Simple responsive utilities
- Color utilities when not state-dependent
- Quick prototyping

Example:
```tsx
<div className="flex flex-col items-center justify-center p-4 space-y-2">
  <h1 className="text-2xl font-bold">Title</h1>
  <p className="text-gray-700">Content</p>
</div>
```

### Integration

For integrating both approaches:
- Use the `cn()` utility for combining Tailwind classes conditionally
- Prefix Styled Component prop names with `$` to avoid passing them to the DOM

Example:
```tsx
import { cn } from '@/lib/utils';
import styled from 'styled-components';

const StyledButton = styled.button<{ $variant: 'default' | 'primary' }>`
  /* Base styles with Styled Components */
  position: relative;
  font-weight: bold;
  transition: all 0.2s;
  
  /* Variant-specific styles */
  ${props => props.$variant === 'primary' && `
    background-color: blue;
    color: white;
  `}
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  className?: string;
}

export const Button = ({ 
  variant = 'default', 
  className, 
  children, 
  ...props 
}: ButtonProps) => {
  return (
    <StyledButton 
      $variant={variant} 
      className={cn(
        "px-4 py-2 rounded", // Tailwind utility classes
        variant === 'primary' ? 'hover:bg-blue-600' : 'hover:bg-gray-100',
        className
      )} 
      {...props}
    >
      {children}
    </StyledButton>
  );
};
```

## Testing Standards

- Write tests for all components and utilities
- Each component should have at least:
  - One test for expected behavior
  - One test for edge cases
  - One test for failure states
- Use meaningful test descriptions
- Follow the Arrange-Act-Assert pattern
- Mock external dependencies

## Documentation

- Add JSDoc comments for public functions and components
- Include parameter descriptions and return types
- Explain complex logic with inline comments
- Update documentation when making significant changes 