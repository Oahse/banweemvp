// frontend/src/components/ui/Navigation.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { BrowserRouter, useLocation, Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { HomeIcon, SettingsIcon } from 'lucide-react';

// Mock react-router-dom hooks and components
vitest.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vitest.fn(),
    Link: vitest.fn(({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    )),
  };
});

describe('Navigation Component', () => {
  const mockUseLocation = useLocation as vitest.Mock;
  const mockOnItemClick = vitest.fn();

  const mockItems = [
    { label: 'Home', href: '/', icon: <HomeIcon data-testid="home-icon" /> },
    { label: 'Products', href: '/products', badge: 5 },
    {
      label: 'Admin',
      href: '/admin',
      icon: <SettingsIcon data-testid="settings-icon" />,
      children: [
        { label: 'Users', href: '/admin/users' },
      ],
    },
    { label: 'External', href: 'https://example.com', external: true },
  ];

  beforeEach(() => {
    vitest.clearAllMocks();
    mockUseLocation.mockReturnValue({ pathname: '/' }); // Default to home path
  });

  // Helper to render with BrowserRouter context
  const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

  describe('Desktop Navigation', () => {
    it('renders top-level navigation items', () => {
      renderWithRouter(<Navigation items={mockItems} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('External')).toBeInTheDocument();
    });

    it('displays icons and badges for navigation items', () => {
      renderWithRouter(<Navigation items={mockItems} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument(); // Badge for Products
      expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
    });

    it('marks the current active item', () => {
      mockUseLocation.mockReturnValue({ pathname: '/' });
      renderWithRouter(<Navigation items={mockItems} variant="default" />);
      const homeLink = screen.getByText('Home').closest('a') || screen.getByText('Home').closest('button');
      expect(homeLink).toHaveClass('bg-primary/10');
      expect(homeLink).toHaveClass('text-primary');
    });

    it('opens and closes dropdowns for nested items', async () => {
      renderWithRouter(<Navigation items={mockItems} />);
      const adminButton = screen.getByText('Admin');

      // Open dropdown
      fireEvent.click(adminButton);
      await waitFor(() => {
        expect(screen.getByText('Users')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
      });

      // Close dropdown
      fireEvent.click(adminButton);
      await waitFor(() => {
        expect(screen.queryByText('Users')).not.toBeInTheDocument();
        expect(screen.queryByText('Settings')).not.toBeInTheDocument();
      });
    });

    it('calls onItemClick when an item is clicked', () => {
      renderWithRouter(<Navigation items={mockItems} onItemClick={mockOnItemClick} />);
      fireEvent.click(screen.getByText('Home'));
      expect(mockOnItemClick).toHaveBeenCalledWith(mockItems[0]);
    });

    it('handles external links correctly', () => {
      renderWithRouter(<Navigation items={mockItems} />);
      const externalLink = screen.getByText('External').closest('a');
      expect(externalLink).toHaveAttribute('href', 'https://example.com');
      expect(externalLink).toHaveAttribute('target', '_blank');
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Mobile Navigation', () => {
    // Set viewport to simulate mobile
    beforeAll(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
      window.dispatchEvent(new Event('resize'));
    });
    afterAll(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
      window.dispatchEvent(new Event('resize'));
    });

    it('toggles mobile menu open and close', async () => {
      renderWithRouter(<Navigation items={mockItems} />);
      const toggleButton = screen.getByLabelText('Toggle mobile menu');

      // Menu is initially closed
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
      expect(screen.queryByText('Products')).not.toBeInTheDocument();

      // Open menu
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
      });

      // Close menu
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(screen.queryByText('Products')).not.toBeInTheDocument();
      });
    });

    it('closes mobile menu when an item is clicked', async () => {
      renderWithRouter(<Navigation items={mockItems} onItemClick={mockOnItemClick} />);
      fireEvent.click(screen.getByLabelText('Toggle mobile menu')); // Open menu
      await waitFor(() => expect(screen.getByText('Home')).toBeInTheDocument());

      fireEvent.click(screen.getByText('Home'));
      expect(mockOnItemClick).toHaveBeenCalledWith(mockItems[0]);
      // The menu should close after clicking an item
      await waitFor(() => expect(screen.queryByText('Home')).not.toBeInTheDocument());
    });
  });

  describe('Variants and Orientations', () => {
    it('applies "pills" variant classes', () => {
      renderWithRouter(<Navigation items={[{ label: 'Test', href: '/' }]} variant="pills" />);
      const link = screen.getByText('Test').closest('a');
      expect(link).toHaveClass('rounded-full');
    });

    it('applies "underline" variant classes', () => {
      renderWithRouter(<Navigation items={[{ label: 'Test', href: '/' }]} variant="underline" />);
      const link = screen.getByText('Test').closest('a');
      expect(link).toHaveClass('border-b-2');
    });

    it('applies "vertical" orientation classes', () => {
      renderWithRouter(<Navigation items={[{ label: 'Test', href: '/' }]} orientation="vertical" />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('flex-col');
      expect(nav).toHaveClass('space-y-1');
    });
  });
});
