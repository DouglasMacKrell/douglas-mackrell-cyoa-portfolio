# 🧩 Components Documentation

This directory contains documentation for the reusable UI components in the CYOA Portfolio project.

## Core Components

The following components form the core building blocks of the application:

- [**BookCover**](./BookCover.md) - The main book cover component with title and author display
- [**BrandBadge**](./BrandBadge.md) - Logo component for the portfolio branding
- [**PageTurner**](./PageTurner.md) - Handles page turning animations and interactions (*future*)
- [**QuickLinks**](./QuickLinks.md) - Floating red pill badges for quick navigation (*future*)

## UI Components

These components are used throughout the application for UI construction:

- [**Button**](./Button.md) - Styled button component with variants (*future*)
- [**Typography**](./Typography.md) - Text styling components (*future*)
- [**Card**](./Card.md) - Content container with CYOA styling (*future*)

## Layout Components

Components used for layout and structure:

- [**BookContainer**](./BookContainer.md) - Main container for the book interface (*future*)
- [**PageLayout**](./PageLayout.md) - Layout for individual book pages (*future*)
- [**ContentBlock**](./ContentBlock.md) - Standardized content sections (*future*)

## Creating New Components

When creating a new component:

1. Add a TypeScript file in the `/components` directory
2. Document the component here and in a dedicated markdown file
3. Include usage examples and props documentation
4. Add appropriate tests

## Component Structure

Components should follow this structure:

```tsx
import { FC } from 'react';
import styled from 'styled-components';
import { cn } from '@/lib/utils';

// Styled components
const StyledComponent = styled.div<{ $variant?: string }>`
  /* Base styles */
  
  /* Variant styles */
  ${props => props.$variant === 'primary' && `
    /* Primary variant styles */
  `}
`;

// Types
export interface ComponentProps {
  /** Description of the children prop */
  children: React.ReactNode;
  /** Description of the className prop */
  className?: string;
  /** Description of the variant prop */
  variant?: 'default' | 'primary';
  // Other props...
}

/**
 * Component description here
 */
export const Component: FC<ComponentProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <StyledComponent
      $variant={variant}
      className={cn('default-classes', className)}
      {...props}
    >
      {children}
    </StyledComponent>
  );
};
```

## Styling Guidelines

Remember to follow the hybrid styling approach:

- Use **Styled Components** for complex components with state-dependent styles
- Use **Tailwind CSS** for layout, spacing, and simple styling
- Integrate both using the `cn()` utility
- Prefix Styled Component props with `$` to avoid DOM attribute warnings 