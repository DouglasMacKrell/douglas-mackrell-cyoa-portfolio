# 🏗️ Project Architecture Overview

This document provides a high-level overview of the CYOA Portfolio application architecture, explaining the system design, component relationships, and data flow.

## System Architecture

The CYOA Portfolio is a Next.js application using the App Router pattern, which provides file-based routing and server components. The application follows a component-based architecture with a clear separation of concerns.

```
┌─────────────────────────────────────────┐
│              Next.js App                │
│                                         │
│   ┌─────────────┐     ┌─────────────┐   │
│   │   Pages     │     │  Components │   │
│   │  (Routes)   │     │  (Reusable) │   │
│   └─────────────┘     └─────────────┘   │
│             │               │           │
│             └───────┬───────┘           │
│                     ▼                   │
│   ┌─────────────────────────────────┐   │
│   │           Utilities             │   │
│   │      (Helper Functions)         │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## Key Architectural Components

### 1. Page Components (app/)

These components define the routes and layout of the application, leveraging Next.js 14's App Router:

- `app/page.tsx` - The main entry point containing the book interface
- `app/layout.tsx` - The root layout with global styles and providers
- Future pages will represent different "paths" in the CYOA story

### 2. UI Components (components/)

Reusable UI components that make up the application interface:

- `BookCover` - The main book cover display
- `BrandBadge` - Logo component for the portfolio
- Other components for page turning, navigation, and content display

### 3. Utilities (lib/)

Helper functions and shared logic:

- `utils.ts` - Contains the `cn()` utility for class name merging
- Other utility functions for animations, state management, etc.

## Data Flow

The application follows a unidirectional data flow pattern:

1. **User Interaction** - User interacts with a UI component (e.g., clicks a link)
2. **State Change** - Component state is updated based on the interaction
3. **Re-render** - UI components re-render to reflect the new state
4. **Side Effects** - Any necessary side effects (e.g., animations, page transitions) are triggered

## State Management

The application uses React's built-in state management options:

- **Component State** - `useState` for component-specific state
- **Context API** - For sharing state across multiple components (where needed)
- State primarily revolves around:
  - Current page/path in the CYOA journey
  - Animation states for page turning
  - UI interaction states

## Styling Architecture

The project employs a hybrid styling approach:

- **Styled Components** for complex UI elements, animations, and state-dependent styles
- **Tailwind CSS** for layout, spacing, and simple styling needs
- Integration via the `cn()` utility that combines Tailwind classes

## File Size and Modularization

To maintain code quality and readability:

- No file should exceed 500 lines of code
- Components are split into smaller sub-components when they grow too large
- Shared logic is extracted into utility functions
- Related components are grouped in feature-specific directories

## Accessibility Considerations

The architecture includes accessibility as a core consideration:

- Semantic HTML structure
- Keyboard navigation support
- ARIA attributes for screen readers
- Support for reduced motion preferences

## Performance Optimization

The application is optimized for performance through:

- Component memoization where appropriate
- Code splitting via Next.js's built-in features
- Optimized assets and images
- Efficient state management to minimize re-renders

## Future Architecture Expansion

As the project grows, the architecture will evolve to include:

- More sophisticated page transition animations
- Enhanced state management for complex user journeys
- Dynamic content loading for different CYOA paths
- Potentially a backend integration for analytics or user preferences 