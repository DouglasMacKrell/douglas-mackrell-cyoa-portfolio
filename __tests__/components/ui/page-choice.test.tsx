import { render, screen, fireEvent } from '@testing-library/react';
import { PageChoice } from '@/components/ui/page-choice';

describe('PageChoice Component', () => {
  // Test: Expected behavior - renders the choice text
  test('renders choice text', () => {
    render(<PageChoice href="/path/to/page">Go to the castle</PageChoice>);
    expect(screen.getByText('Go to the castle')).toBeInTheDocument();
  });
  
  // Test: Expected behavior - renders as link with correct href
  test('renders as a link with the correct href', () => {
    render(<PageChoice href="/path/to/page">Go to the castle</PageChoice>);
    const link = screen.getByRole('link', { name: 'Go to the castle' });
    expect(link).toHaveAttribute('href', '/path/to/page');
  });
  
  // Test: Interaction - clicking the choice navigates (we can't test actual navigation in Jest)
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <PageChoice href="/path/to/page" onClick={handleClick}>
        Go to the castle
      </PageChoice>
    );
    
    fireEvent.click(screen.getByText('Go to the castle'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  // Test: Edge case - accepts custom className
  test('applies custom className', () => {
    render(
      <PageChoice href="/path/to/page" className="custom-choice-class">
        Go to the castle
      </PageChoice>
    );
    
    const link = screen.getByRole('link', { name: 'Go to the castle' });
    expect(link).toHaveClass('custom-choice-class');
  });
  
  // Test: Edge case - renders with page number
  test('renders with page number', () => {
    render(
      <PageChoice href="/path/to/page" pageNumber={42}>
        Go to the castle
      </PageChoice>
    );
    
    expect(screen.getByText('Go to the castle')).toBeInTheDocument();
    expect(screen.getByText('Turn to page 42')).toBeInTheDocument();
  });
  
  // Test: Error case - gracefully handles missing href
  test('handles missing href gracefully', () => {
    // @ts-ignore - Deliberately testing with missing required prop
    render(<PageChoice>Go to the castle</PageChoice>);
    
    // Should still render the text even if link won't work
    expect(screen.getByText('Go to the castle')).toBeInTheDocument();
  });
}); 