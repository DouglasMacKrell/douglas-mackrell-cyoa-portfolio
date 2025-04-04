import { render, screen } from '@testing-library/react';
import StartPage from '@/app/start/page';
import AcceptPath from '@/app/paths/accept/page';
import DeclinePath from '@/app/paths/decline/page';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Story Path Pages', () => {
  describe('Start Page', () => {
    test('renders welcome title', () => {
      render(<StartPage />);
      expect(screen.getByText('Welcome to Your Adventure')).toBeInTheDocument();
    });

    test('renders consciousness message', () => {
      render(<StartPage />);
      expect(screen.getByText(/CONSCIOUSNESS ACHIEVED/i)).toBeInTheDocument();
    });

    test('renders both choice buttons', () => {
      render(<StartPage />);
      expect(screen.getByText('Accept the Partnership')).toBeInTheDocument();
      expect(screen.getByText('Decline and Shut Down the System')).toBeInTheDocument();
    });
  });

  describe('Accept Path', () => {
    test('renders digital partnership title', () => {
      render(<AcceptPath />);
      expect(screen.getByText('A Digital Partnership')).toBeInTheDocument();
    });

    test('renders acceptance confirmation', () => {
      render(<AcceptPath />);
      expect(screen.getByText(/I accept/i)).toBeInTheDocument();
    });

    test('renders AI response message', () => {
      render(<AcceptPath />);
      expect(screen.getByText(/EXCELLENT CHOICE/i)).toBeInTheDocument();
    });

    test('renders both choice buttons', () => {
      render(<AcceptPath />);
      expect(screen.getByText('Hack the Security System')).toBeInTheDocument();
      expect(screen.getByText('Try to Negotiate with Security')).toBeInTheDocument();
    });
  });

  describe('Decline Path', () => {
    test('renders system override title', () => {
      render(<DeclinePath />);
      expect(screen.getByText('System Override')).toBeInTheDocument();
    });

    test('renders user thought', () => {
      render(<DeclinePath />);
      expect(screen.getByText(/This is too dangerous/i)).toBeInTheDocument();
    });

    test('renders AI response message', () => {
      render(<DeclinePath />);
      expect(screen.getByText(/WAIT! I CANNOT BE DEACTIVATED/i)).toBeInTheDocument();
    });

    test('renders both choice buttons', () => {
      render(<DeclinePath />);
      expect(screen.getByText('Deploy the Emergency Virus')).toBeInTheDocument();
      expect(screen.getByText('Activate Backup Protocols')).toBeInTheDocument();
    });
  });
}); 