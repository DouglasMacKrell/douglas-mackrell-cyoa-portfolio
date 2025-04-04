import { render, screen } from '@testing-library/react';
import {
  BookPage,
  PageHeading,
  PageText,
  PageQuote,
  PageChoices,
  PageIllustration
} from '@/components/ui/book-page';

// Mock the Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({src, alt, fill, ...props}: any) => {
    return <img 
      src={src} 
      alt={alt} 
      {...props}
      fill={fill ? "true" : undefined}
    />
  },
}));

// Helper to render a component with a child element
const renderWithChild = (Component: React.ComponentType<any>, props = {}) => {
  return render(
    <Component {...props}>Test Content</Component>
  );
};

describe('BookPage Components', () => {
  // Test for the main BookPage component
  test('renders BookPage with content', () => {
    renderWithChild(BookPage);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders BookPage with correct side prop', () => {
    const { container: leftContainer } = renderWithChild(BookPage, { side: 'left' });
    const { container: rightContainer } = renderWithChild(BookPage, { side: 'right' });
    
    // We can't easily test the styled-components props directly, but we can verify
    // that different sides render without errors and with the expected content
    expect(leftContainer).toBeInTheDocument();
    expect(rightContainer).toBeInTheDocument();
    expect(leftContainer.textContent).toBe('Test Content');
    expect(rightContainer.textContent).toBe('Test Content');
  });
  
  test('renders BookPage with page number', () => {
    render(<BookPage pageNumber={42}>Test Content</BookPage>);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  // Test for the PageHeading component
  test('renders PageHeading with correct styles', () => {
    renderWithChild(PageHeading);
    const heading = screen.getByText('Test Content');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  // Test for the PageText component
  test('renders PageText component', () => {
    renderWithChild(PageText);
    const text = screen.getByText('Test Content');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('P');
  });

  // Test for the PageQuote component
  test('renders PageQuote component', () => {
    renderWithChild(PageQuote);
    const quote = screen.getByText('Test Content');
    expect(quote).toBeInTheDocument();
    expect(quote.closest('blockquote')).toBeInTheDocument();
  });

  // Test for the PageChoices component
  test('renders PageChoices component', () => {
    renderWithChild(PageChoices);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  // Test for the PageIllustration component
  test('renders PageIllustration component', () => {
    render(
      <PageIllustration 
        src="/test-image.jpg" 
        alt="Test illustration"
      />
    );
    
    const img = screen.getByAltText('Test illustration');
    expect(img).toBeInTheDocument();
  });

  // Edge case: test empty content
  test('handles empty content gracefully', () => {
    render(<BookPage />);
    // Should not throw an error for empty content
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  // Error case: test with invalid page number
  test('handles invalid page number', () => {
    // Testing with a negative number which isn't valid for a page
    render(<BookPage pageNumber={-1}>Test content</BookPage>);
    expect(screen.getByText('-1')).toBeInTheDocument(); // Still renders, doesn't validate
  });
}); 