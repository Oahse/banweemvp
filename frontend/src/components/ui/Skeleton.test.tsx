// frontend/src/components/ui/Skeleton.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonRectangle, SkeletonRounded } from './Skeleton';

describe('Skeleton Component', () => {
  it('renders a div with role status and aria-label', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('status', { name: 'Loading content...' });
    expect(skeleton).toBeInTheDocument();
    expect(skeleton.tagName).toBe('DIV');
  });

  it('applies default rectangular variant and shimmer animation', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-md'); // Default rectangular
    expect(skeleton).toHaveClass('animate-shimmer'); // Default shimmer
  });

  it('applies circular variant correctly', () => {
    render(<Skeleton variant="circular" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-full');
    expect(skeleton).toHaveClass('aspect-square');
  });

  it('applies text variant with multiple lines and last line shorter', () => {
    render(<Skeleton variant="text" lines={3} />);
    const textLines = screen.getAllByRole('status');
    expect(textLines.length).toBe(3);
    expect(textLines[0]).toHaveClass('h-4');
    expect(textLines[textLines.length - 1]).toHaveStyle({ width: '75%' });
    expect(textLines[textLines.length - 2]).not.toHaveStyle({ width: '75%' });
  });

  it('applies rounded variant with custom rounded value', () => {
    render(<Skeleton variant="rounded" rounded="lg" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-lg');
  });

  it('applies pulse animation', () => {
    render(<Skeleton animation="pulse" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('applies wave animation', () => {
    render(<Skeleton animation="wave" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('animate-wave');
  });

  it('applies custom width and height', () => {
    render(<Skeleton width="100px" height="50px" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveStyle({ width: '100px', height: '50px' });
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-skeleton" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('custom-skeleton');
  });
});

describe('Specialized Skeleton Components', () => {
  it('SkeletonText renders with text variant', () => {
    render(<SkeletonText />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('h-4');
    expect(skeleton).toHaveStyle({ width: '100%' }); // Default for SkeletonText
  });

  it('SkeletonCircle renders with circular variant', () => {
    render(<SkeletonCircle />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-full');
    expect(skeleton).toHaveClass('aspect-square');
  });

  it('SkeletonRectangle renders with rectangular variant', () => {
    render(<SkeletonRectangle />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-md'); // Default rectangular
  });

  it('SkeletonRounded renders with rounded variant', () => {
    render(<SkeletonRounded rounded="xl" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('rounded-xl');
  });
});
