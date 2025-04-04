import { render, screen } from '@testing-library/react';
import {
  BookCover,
  BrandBadge,
  IllustrationFrame,
  BookTitle,
  Subtitle,
  AuthorByline,
  CreditLine
} from '@/components/ui/book-cover';

// Helper to render a component with a child element
const renderWithChild = (Component: React.ComponentType<any>) => {
  return render(
    <Component>Test Content</Component>
  );
};

describe('BookCover Component', () => {
  test('renders BookCover with content', () => {
    renderWithChild(BookCover);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders BrandBadge with CYOA text', () => {
    render(<BrandBadge />);
    expect(screen.getByText(/CHOOSE YOUR OWN ADVENTURE/i)).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('renders BookTitle with proper styling', () => {
    renderWithChild(BookTitle);
    const title = screen.getByText('Test Content');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });

  test('renders Subtitle component', () => {
    renderWithChild(Subtitle);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders AuthorByline component', () => {
    renderWithChild(AuthorByline);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders CreditLine component', () => {
    renderWithChild(CreditLine);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders IllustrationFrame with content', () => {
    renderWithChild(IllustrationFrame);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
}); 