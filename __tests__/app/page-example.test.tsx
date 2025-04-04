import { render, screen } from '@testing-library/react';
import PageExamplePage from '@/app/page-example/page';

describe('PageExamplePage', () => {
  test('renders both pages with correct content', () => {
    render(<PageExamplePage />);
    
    // Check left page content
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText(/You are a skilled software engineer/)).toBeInTheDocument();
    expect(screen.getByText(/CONSCIOUSNESS ACHIEVED/)).toBeInTheDocument();
    
    // Check right page content
    expect(screen.getByText('Your Decision')).toBeInTheDocument();
    expect(screen.getByText(/This is a critical moment/)).toBeInTheDocument();
    
    // Check choices
    expect(screen.getByText('Accept the Partnership')).toBeInTheDocument();
    expect(screen.getByText('Decline and Shut Down the System')).toBeInTheDocument();
    expect(screen.getByText('Wait and observe before responding')).toBeInTheDocument();
    
    // Check page numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Check "Turn to page" references
    expect(screen.getByText('Turn to page 7')).toBeInTheDocument();
    expect(screen.getByText('Turn to page 12')).toBeInTheDocument();
    expect(screen.getByText('Turn to page 4')).toBeInTheDocument();
  });
  
  test('renders links with correct hrefs', () => {
    render(<PageExamplePage />);
    
    const acceptLink = screen.getByText('Accept the Partnership');
    expect(acceptLink.closest('a')).toHaveAttribute('href', '/paths/accept');
    
    const declineLink = screen.getByText('Decline and Shut Down the System');
    expect(declineLink.closest('a')).toHaveAttribute('href', '/paths/decline');
    
    const waitLink = screen.getByText('Wait and observe before responding');
    expect(waitLink.closest('a')).toHaveAttribute('href', '/');
  });
}); 