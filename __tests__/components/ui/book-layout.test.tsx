import { render, screen } from '@testing-library/react';
import { BookLayout } from '@/components/ui/book-layout';

describe('BookLayout Component', () => {
  // Test: Expected behavior - renders with right page only
  test('renders with right page content', () => {
    render(
      <BookLayout 
        rightPage={<div>Right Page Content</div>} 
      />
    );
    
    expect(screen.getByText('Right Page Content')).toBeInTheDocument();
  });
  
  // Test: Expected behavior - renders with both left and right pages
  test('renders with both left and right page content', () => {
    render(
      <BookLayout 
        leftPage={<div>Left Page Content</div>}
        rightPage={<div>Right Page Content</div>} 
      />
    );
    
    expect(screen.getByText('Left Page Content')).toBeInTheDocument();
    expect(screen.getByText('Right Page Content')).toBeInTheDocument();
  });
  
  // Test: Edge case - custom className is applied
  test('applies custom className to the main element', () => {
    const { container } = render(
      <BookLayout 
        rightPage={<div>Right Page Content</div>}
        className="custom-class"
      />
    );
    
    // The main element should have the custom class
    const mainElement = container.querySelector('main');
    expect(mainElement).toHaveClass('custom-class');
  });
  
  // Test: Edge case - deeply nested content
  test('renders deeply nested content correctly', () => {
    render(
      <BookLayout 
        leftPage={
          <div>
            <h1>Left Heading</h1>
            <div>
              <p>Deeply <span>nested</span></p>
            </div>
          </div>
        }
        rightPage={
          <div>
            <h2>Right Heading</h2>
            <ul>
              <li>List item</li>
            </ul>
          </div>
        }
      />
    );
    
    expect(screen.getByText('Left Heading')).toBeInTheDocument();
    expect(screen.getByText('nested')).toBeInTheDocument();
    expect(screen.getByText('Right Heading')).toBeInTheDocument();
    expect(screen.getByText('List item')).toBeInTheDocument();
  });
  
  // Test: Error case - empty rightPage should not cause errors
  test('handles missing rightPage content gracefully', () => {
    // This would typically be a TypeScript error, but for runtime testing:
    // @ts-ignore - Deliberately testing with missing required prop
    const { container } = render(<BookLayout />);
    
    // Should render the container elements without errors
    expect(container.querySelector('main')).toBeInTheDocument();
  });
}); 