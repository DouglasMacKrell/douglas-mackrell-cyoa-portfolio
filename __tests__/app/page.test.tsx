import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src as string} alt={alt} />
  ),
}));

// Mock styled-components to avoid styled-components related issues in tests
jest.mock('styled-components', () => {
  const styled = {
    div: () => 'div',
    h1: () => 'h1',
    p: () => 'p',
    span: () => 'span',
  };
  return {
    __esModule: true,
    default: styled,
    styled,
  };
});

// Allow tests to run without rendering the full page for faster results
// We're just testing for basic text elements
jest.mock('@/components/ui/book-cover', () => ({
  BookCover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  BrandBadge: () => <div>CHOOSE YOUR OWN ADVENTURE</div>,
  IllustrationFrame: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  BookTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Subtitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AuthorByline: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CreditLine: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Home Page', () => {
  test('renders the book title', () => {
    render(<HomePage />);
    expect(screen.getByText(/SOFTWARE ENGINEER/i)).toBeInTheDocument();
  });

  test('renders the subtitle', () => {
    render(<HomePage />);
    expect(screen.getByText(/YOU'RE THE STAR OF THE STORY/i)).toBeInTheDocument();
  });

  test('renders the author byline', () => {
    render(<HomePage />);
    // Use getAllByText and check the first occurrence, which is the author byline
    const authorElements = screen.getAllByText(/by Douglas MacKrell/i);
    expect(authorElements[0]).toBeInTheDocument();
  });

  test('renders the copyright text', () => {
    render(<HomePage />);
    expect(screen.getByText(/Copyright © 2024/i)).toBeInTheDocument();
  });
}); 