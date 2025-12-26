// frontend/src/components/ui/ZoomableImage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { ZoomableImage } from './ZoomableImage';
import { LazyImage } from './LazyImage'; // Assume LazyImage is also mocked or a simple pass-through

// Mock LazyImage since its internal loading logic isn't the focus here,
// and we just need to check props and styles applied to it.
vitest.mock('./LazyImage', () => ({
  LazyImage: vitest.fn((props) => <img data-testid="lazy-image" {...props} />),
}));

describe('ZoomableImage Component', () => {
  const imageUrl = 'http://example.com/image.jpg';
  const imageAlt = 'A test image';

  beforeEach(() => {
    // Reset mock before each test
    (LazyImage as vitest.Mock).mockClear();
  });

  it('renders LazyImage with correct src and alt', () => {
    render(<ZoomableImage src={imageUrl} alt={imageAlt} />);
    const lazyImage = screen.getByTestId('lazy-image');
    expect(lazyImage).toBeInTheDocument();
    expect(lazyImage).toHaveAttribute('src', imageUrl);
    expect(lazyImage).toHaveAttribute('alt', imageAlt);
  });

  it('applies default styles and cursor', () => {
    render(<ZoomableImage src={imageUrl} alt={imageAlt} />);
    const container = screen.getByTestId('lazy-image').closest('div');
    expect(container).toHaveClass('relative');
    expect(container).toHaveClass('overflow-hidden');
    expect(container).toHaveClass('cursor-zoom-in');
  });

  it('changes zoom state on mouse enter and leave', () => {
    render(<ZoomableImage src={imageUrl} alt={imageAlt} />);
    const container = screen.getByTestId('lazy-image').closest('div');
    const lazyImage = screen.getByTestId('lazy-image');

    // Initially not zoomed
    expect(lazyImage).toHaveClass('scale-100');

    // On mouse enter, it should zoom
    fireEvent.mouseEnter(container!);
    expect(lazyImage).not.toHaveClass('scale-100');
    expect(lazyImage).toHaveClass('scale-200'); // Default zoomScale is 2, so scale-200

    // On mouse leave, it should unzoom
    fireEvent.mouseLeave(container!);
    expect(lazyImage).toHaveClass('scale-100');
    expect(lazyImage).not.toHaveClass('scale-200');
  });

  it('updates transformOrigin on mouse move', () => {
    render(<ZoomableImage src={imageUrl} alt={imageAlt} />);
    const container = screen.getByTestId('lazy-image').closest('div');
    const lazyImage = screen.getByTestId('lazy-image');

    // Simulate mouse entering to enable zoom and then moving
    fireEvent.mouseEnter(container!);

    // Mock getBoundingClientRect to control mouse position calculations
    vitest.spyOn(container!, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      right: 100,
      bottom: 100,
      toJSON: () => {}
    });

    fireEvent.mouseMove(container!, { clientX: 25, clientY: 75 });
    expect(lazyImage).toHaveStyle('transform-origin: 25% 75%;');

    fireEvent.mouseMove(container!, { clientX: 50, clientY: 50 });
    expect(lazyImage).toHaveStyle('transform-origin: 50% 50%;');
  });

  it('applies custom zoomScale', () => {
    render(<ZoomableImage src={imageUrl} alt={imageAlt} zoomScale={3} />);
    const container = screen.getByTestId('lazy-image').closest('div');
    const lazyImage = screen.getByTestId('lazy-image');

    fireEvent.mouseEnter(container!);
    expect(lazyImage).toHaveClass('scale-300');
    expect(lazyImage).not.toHaveClass('scale-200');
  });
});
