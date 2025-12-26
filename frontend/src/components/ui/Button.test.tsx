/**
 * Button Component Test Suite
 * Tests all button variants, sizes, states, and accessibility features
 * Requirements: 1.1, 1.2, 1.3, 1.4
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
  describe('Rendering Tests', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('renders without children', () => {
      render(<Button />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variant Tests', () => {
    const variants = [
      'primary',
      'secondary', 
      'outline',
      'ghost',
      'link',
      'danger',
      'success',
      'warning',
      'info'
    ] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Size Tests', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'icon'] as const;

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Button size={size}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('State Tests', () => {
    it('renders loading state correctly', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders disabled state correctly', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
    });

    it('renders full width correctly', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interaction Tests', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not trigger click when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick} isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility Tests', () => {
    it('has proper ARIA attributes', () => {
      render(<Button>Accessible Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('type', 'button');
    });

    it('supports custom ARIA attributes', () => {
      render(
        <Button aria-label="Custom label" aria-describedby="description">
          Button
        </Button>
      );
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });

    it('has proper loading state accessibility', () => {
      render(<Button isLoading>Loading</Button>);
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});

/**
 * Property-Based Tests for Button Component
 * Feature: frontend-test-coverage, Property 1: Component Rendering Stability
 * Validates: Requirements 1.1
 */

import * as fc from 'fast-check';

describe('Button Property-Based Tests', () => {
  describe('Property 1: Component Rendering Stability', () => {
    it('should render consistently with any valid props without throwing errors', () => {
      // Feature: frontend-test-coverage, Property 1: Component Rendering Stability
      
      const buttonVariants = fc.constantFrom(
        'primary', 'secondary', 'outline', 'ghost', 'link', 
        'danger', 'success', 'warning', 'info'
      );
      
      const buttonSizes = fc.constantFrom('xs', 'sm', 'md', 'lg', 'xl', 'icon');
      
      const roundedOptions = fc.constantFrom('sm', 'md', 'lg', 'xl', 'full');
      
      const buttonProps = fc.record({
        variant: fc.option(buttonVariants, { nil: undefined }),
        size: fc.option(buttonSizes, { nil: undefined }),
        rounded: fc.option(roundedOptions, { nil: undefined }),
        isLoading: fc.boolean(),
        disabled: fc.boolean(),
        fullWidth: fc.boolean(),
        children: fc.option(fc.string({ minLength: 0, maxLength: 100 }), { nil: undefined }),
        className: fc.option(fc.string({ minLength: 0, maxLength: 50 }), { nil: undefined })
      });

      fc.assert(
        fc.property(buttonProps, (props) => {
          // Test that rendering doesn't throw errors
          expect(() => {
            const { unmount } = render(<Button {...props} />);
            
            // Verify button is in document
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            
            // Verify consistent DOM structure
            expect(button.tagName).toBe('BUTTON');
            
            // Clean up
            unmount();
          }).not.toThrow();
        }),
        { 
          numRuns: 100,
          verbose: false
        }
      );
    });

    it('should maintain consistent DOM structure across multiple renders with same props', () => {
      // Feature: frontend-test-coverage, Property 1: Component Rendering Stability
      
      const stableProps = fc.record({
        variant: fc.constantFrom('primary', 'secondary', 'outline'),
        size: fc.constantFrom('sm', 'md', 'lg'),
        children: fc.string({ minLength: 1, maxLength: 20 }),
        disabled: fc.boolean()
      });

      fc.assert(
        fc.property(stableProps, (props) => {
          // First render
          const { unmount: unmount1 } = render(<Button {...props} />);
          const button1 = screen.getByRole('button');
          const classes1 = button1.className;
          const textContent1 = button1.textContent;
          unmount1();

          // Second render with same props
          const { unmount: unmount2 } = render(<Button {...props} />);
          const button2 = screen.getByRole('button');
          const classes2 = button2.className;
          const textContent2 = button2.textContent;
          unmount2();

          // Should have identical structure
          expect(classes1).toBe(classes2);
          expect(textContent1).toBe(textContent2);
        }),
        { 
          numRuns: 100,
          verbose: false
        }
      );
    });
  });
});

/**
 * Property-Based Tests for Button Component Prop Handling
 * Feature: frontend-test-coverage, Property 2: Component Prop Handling Consistency
 * Validates: Requirements 1.2
 */

describe('Button Property-Based Tests - Prop Handling', () => {
  describe('Property 2: Component Prop Handling Consistency', () => {
    it('should handle props consistently and display expected content without errors', () => {
      // Feature: frontend-test-coverage, Property 2: Component Prop Handling Consistency
      
      const buttonProps = fc.record({
        variant: fc.option(fc.constantFrom(
          'primary', 'secondary', 'outline', 'ghost', 'link', 
          'danger', 'success', 'warning', 'info'
        ), { nil: undefined }),
        size: fc.option(fc.constantFrom('xs', 'sm', 'md', 'lg', 'xl', 'icon'), { nil: undefined }),
        children: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
        disabled: fc.boolean(),
        isLoading: fc.boolean(),
        fullWidth: fc.boolean(),
        'aria-label': fc.option(fc.string({ minLength: 1, maxLength: 30 }), { nil: undefined }),
        'data-testid': fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined })
      });

      fc.assert(
        fc.property(buttonProps, (props) => {
          // Test that prop handling is consistent
          expect(() => {
            const { unmount } = render(<Button {...props} />);
            
            const button = screen.getByRole('button');
            
            // Verify button exists and is properly rendered
            expect(button).toBeInTheDocument();
            
            // Verify disabled state is handled correctly
            if (props.disabled || props.isLoading) {
              expect(button).toBeDisabled();
            } else {
              expect(button).not.toBeDisabled();
            }
            
            // Verify aria-label is applied if provided
            if (props['aria-label']) {
              expect(button).toHaveAttribute('aria-label', props['aria-label']);
            }
            
            // Verify data-testid is applied if provided
            if (props['data-testid']) {
              expect(button).toHaveAttribute('data-testid', props['data-testid']);
            }
            
            // Verify children content is displayed if provided
            if (props.children && !props.isLoading) {
              expect(button).toHaveTextContent(props.children);
            }
            
            unmount();
          }).not.toThrow();
        }),
        { 
          numRuns: 100,
          verbose: false
        }
      );
    });

    it('should maintain prop consistency across re-renders', () => {
      // Feature: frontend-test-coverage, Property 2: Component Prop Handling Consistency
      
      const stableProps = fc.record({
        variant: fc.constantFrom('primary', 'secondary', 'outline'),
        children: fc.string({ minLength: 1, maxLength: 20 }),
        disabled: fc.boolean(),
        className: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined })
      });

      fc.assert(
        fc.property(stableProps, (props) => {
          // First render
          const { rerender, unmount } = render(<Button {...props} />);
          const button1 = screen.getByRole('button');
          const disabled1 = button1.disabled;
          const className1 = button1.className;
          const textContent1 = button1.textContent;

          // Re-render with same props
          rerender(<Button {...props} />);
          const button2 = screen.getByRole('button');
          const disabled2 = button2.disabled;
          const className2 = button2.className;
          const textContent2 = button2.textContent;

          // Properties should remain consistent
          expect(disabled1).toBe(disabled2);
          expect(className1).toBe(className2);
          expect(textContent1).toBe(textContent2);
          
          unmount();
        }),
        { 
          numRuns: 100,
          verbose: false
        }
      );
    });
  });
});