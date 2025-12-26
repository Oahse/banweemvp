/**
 * CategoryCard Component Test Suite
 * Tests category display, navigation, image loading, and responsive behavior
 * Requirements: 1.1, 1.2, 1.3
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CategoryCard } from './CategoryCard';
import { renderWithRouter } from '../../test/utils';

describe('CategoryCard Component', () => {
  const mockCategory = {
    name: 'Electronics',
    path: '/category/electronics',
    image: 'https://example.com/electronics.jpg',
    count: 25
  };

  const mockCategoryWithoutCount = {
    name: 'Books',
    path: '/category/books',
    image: 'https://example.com/books.jpg'
  };

  const mockCategoryWithZeroCount = {
    name: 'Empty Category',
    path: '/category/empty',
    image: 'https://example.com/empty.jpg',
    count: 0
  };

  describe('Rendering Tests', () => {
    it('renders category information correctly', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('25 items')).toBeInTheDocument();
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/electronics.jpg');
      expect(image).toHaveAttribute('alt', 'Electronics');
    });

    it('renders category without count', () => {
      renderWithRouter(<CategoryCard category={mockCategoryWithoutCount} />);
      
      expect(screen.getByText('Books')).toBeInTheDocument();
      expect(screen.queryByText('items')).not.toBeInTheDocument();
    });

    it('does not render count when count is zero', () => {
      renderWithRouter(<CategoryCard category={mockCategoryWithZeroCount} />);
      
      expect(screen.getByText('Empty Category')).toBeInTheDocument();
      expect(screen.queryByText('0 items')).not.toBeInTheDocument();
    });

    it('renders as a clickable link', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/category/electronics');
    });
  });

  describe('Image Tests', () => {
    it('displays category image with correct attributes', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/electronics.jpg');
      expect(image).toHaveAttribute('alt', 'Electronics');
      expect(image).toHaveClass('w-full', 'h-full', 'object-cover');
    });

    it('handles missing image gracefully', () => {
      const categoryWithoutImage = {
        ...mockCategory,
        image: ''
      };
      
      expect(() => {
        renderWithRouter(<CategoryCard category={categoryWithoutImage} />);
      }).not.toThrow();
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '');
    });

    it('has proper image container styling', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const imageContainer = screen.getByRole('img').parentElement;
      expect(imageContainer).toHaveClass('relative', 'h-40');
    });
  });

  describe('Navigation Tests', () => {
    it('navigates to correct category path', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/category/electronics');
    });

    it('handles different path formats', () => {
      const categoryWithDifferentPath = {
        ...mockCategory,
        path: '/categories/electronics-gadgets'
      };
      
      renderWithRouter(<CategoryCard category={categoryWithDifferentPath} />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/categories/electronics-gadgets');
    });

    it('handles root path correctly', () => {
      const categoryWithRootPath = {
        ...mockCategory,
        path: '/'
      };
      
      renderWithRouter(<CategoryCard category={categoryWithRootPath} />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/');
    });
  });

  describe('Styling and Layout Tests', () => {
    it('has proper card styling', () => {
      const { container } = renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const card = container.querySelector('.bg-surface');
      expect(card).toHaveClass(
        'bg-surface',
        'rounded-lg',
        'overflow-hidden',
        'shadow-sm',
        'border',
        'border-border-light'
      );
    });

    it('has proper hover effects', () => {
      const { container } = renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const card = container.querySelector('.group');
      expect(card).toHaveClass('group');
      
      const cardContent = container.querySelector('.transition-shadow');
      expect(cardContent).toHaveClass('hover:shadow-md');
    });

    it('has proper text styling', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const title = screen.getByText('Electronics');
      expect(title).toHaveClass('font-medium', 'text-copy');
      
      const count = screen.getByText('25 items');
      expect(count).toHaveClass('text-sm', 'text-copy-light');
    });

    it('has proper image hover effects', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveClass('group-hover:scale-105', 'transition-transform', 'duration-300');
    });

    it('has proper title hover effects', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const title = screen.getByText('Electronics');
      expect(title).toHaveClass('group-hover:text-primary', 'transition-colors');
    });
  });

  describe('Interaction Tests', () => {
    it('handles click events on the entire card', async () => {
      const user = userEvent.setup();
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const link = screen.getByRole('link');
      
      // Should be clickable
      await user.click(link);
      expect(link).toHaveAttribute('href', '/category/electronics');
    });

    it('handles keyboard navigation', async () => {
      const user = userEvent.setup();
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const link = screen.getByRole('link');
      
      // Should be focusable
      await user.tab();
      expect(link).toHaveFocus();
    });
  });

  describe('Accessibility Tests', () => {
    it('has proper semantic structure', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Electronics');
    });

    it('has proper image alt text', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Electronics');
    });

    it('has proper link accessibility', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href');
      
      // Link should contain descriptive text
      expect(link).toHaveTextContent('Electronics');
    });

    it('maintains focus visibility', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const link = screen.getByRole('link');
      link.focus();
      
      expect(link).toHaveFocus();
    });
  });

  describe('Responsive Behavior Tests', () => {
    it('maintains proper aspect ratio on different screen sizes', () => {
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const imageContainer = screen.getByRole('img').parentElement;
      expect(imageContainer).toHaveClass('h-40');
    });

    it('handles text overflow properly', () => {
      const categoryWithLongName = {
        ...mockCategory,
        name: 'Very Long Category Name That Might Overflow'
      };
      
      renderWithRouter(<CategoryCard category={categoryWithLongName} />);
      
      const title = screen.getByText('Very Long Category Name That Might Overflow');
      expect(title).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined category gracefully', () => {
      expect(() => {
        renderWithRouter(<CategoryCard category={undefined} />);
      }).toThrow(); // Should throw since category is required
    });

    it('handles null category gracefully', () => {
      expect(() => {
        renderWithRouter(<CategoryCard category={null} />);
      }).toThrow(); // Should throw since category is required
    });

    it('handles empty category name', () => {
      const categoryWithEmptyName = {
        ...mockCategory,
        name: ''
      };
      
      renderWithRouter(<CategoryCard category={categoryWithEmptyName} />);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveTextContent('');
    });

    it('handles very large count numbers', () => {
      const categoryWithLargeCount = {
        ...mockCategory,
        count: 999999
      };
      
      renderWithRouter(<CategoryCard category={categoryWithLargeCount} />);
      
      expect(screen.getByText('999999 items')).toBeInTheDocument();
    });

    it('handles negative count numbers', () => {
      const categoryWithNegativeCount = {
        ...mockCategory,
        count: -5
      };
      
      renderWithRouter(<CategoryCard category={categoryWithNegativeCount} />);
      
      // Should not display negative count
      expect(screen.queryByText('-5 items')).not.toBeInTheDocument();
    });

    it('handles special characters in category name', () => {
      const categoryWithSpecialChars = {
        ...mockCategory,
        name: 'Electronics & Gadgets (New!)'
      };
      
      renderWithRouter(<CategoryCard category={categoryWithSpecialChars} />);
      
      expect(screen.getByText('Electronics & Gadgets (New!)')).toBeInTheDocument();
    });

    it('handles very long paths', () => {
      const categoryWithLongPath = {
        ...mockCategory,
        path: '/category/electronics/computers/laptops/gaming/high-performance'
      };
      
      renderWithRouter(<CategoryCard category={categoryWithLongPath} />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/category/electronics/computers/laptops/gaming/high-performance');
    });
  });

  describe('Performance Tests', () => {
    it('renders quickly with minimal DOM operations', () => {
      const startTime = performance.now();
      
      renderWithRouter(<CategoryCard category={mockCategory} />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render in less than 50ms
      expect(renderTime).toBeLessThan(50);
    });

    it('handles multiple rapid re-renders', () => {
      const { rerender } = renderWithRouter(<CategoryCard category={mockCategory} />);
      
      expect(() => {
        for (let i = 0; i < 10; i++) {
          rerender(<CategoryCard category={{
            ...mockCategory,
            count: i
          }} />);
        }
      }).not.toThrow();
    });
  });
});