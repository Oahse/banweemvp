// frontend/src/components/ui/Breadcrumbs.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { BrowserRouter, Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs'; // Default export

// Mock react-router-dom Link component
vitest.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Link: vitest.fn(({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    )),
  };
});

describe('Breadcrumbs Component', () => {
  // Helper to render with BrowserRouter context
  const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

  it('renders a single breadcrumb item correctly', () => {
    const items = [{ label: 'Home', link: '/' }];
    renderWithRouter(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.queryByTestId('chevron-right-icon')).not.toBeInTheDocument();
  });

  it('renders multiple breadcrumb items with separators', () => {
    const items = [
      { label: 'Home', link: '/' },
      { label: 'Category', link: '/category' },
      { label: 'Product Detail' },
    ];
    renderWithRouter(<Breadcrumbs items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Product Detail')).toBeInTheDocument();

    // Check for separators (using lucide-react ChevronRightIcon's data-testid)
    const separators = screen.getAllByRole('img', { hidden: true }); // Lucide icons are img roles
    expect(separators.length).toBe(2); // One between Home and Category, another between Category and Product Detail
  });

  it('renders an item without a link as plain text', () => {
    const items = [
      { label: 'Home', link: '/' },
      { label: 'Current Page' },
    ];
    renderWithRouter(<Breadcrumbs items={items} />);
    expect(screen.getByText('Current Page')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Current Page' })).not.toBeInTheDocument();
  });

  it('applies aria-label for accessibility', () => {
    const items = [{ label: 'Home', link: '/' }];
    renderWithRouter(<Breadcrumbs items={items} />);
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    renderWithRouter(<Breadcrumbs items={[]} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
