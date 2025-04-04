// Import the expect library from Jest
import { expect, afterEach } from '@jest/globals';

// Import jest-dom extensions for DOM node assertions
import '@testing-library/jest-dom';

// Import cleanup utilities from React Testing Library
import { cleanup } from '@testing-library/react';

// Run cleanup after each test case
afterEach(() => {
  cleanup();
}); 