// frontend/src/components/ui/LazyImage.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { LazyImage } from './LazyImage';

// Mock IntersectionObserver
const mockIntersectionObserver = vitest.fn(() => ({
  observe: vitest.fn(),
  unobserve: vitest.fn(),
  disconnect: vitest.fn(),
}));
vitest.stubGlobal('IntersectionObserver', mockIntersectionObserver);

describe('LazyImage Component', () => {
  const src = 'http://example.com/image.jpg';
  const alt = 'Test Image';
  const blurDataURL = 'data:image/png;base64,...';
  const onLoad = vitest.fn();
  const onError = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    mockIntersectionObserver.mockClear();
    mockIntersectionObserver.mockReturnValue({
      observe: vitest.fn(),
      unobserve: vitest.fn(),
      disconnect: vitest.fn(),
    });
  });

  afterEach(() => {
    vitest.unstubAllGlobals();
  });


  it('renders a placeholder if not in view and not priority', () => {
    render(<LazyImage src={src} alt={alt} priority={false} />);
    expect(screen.getByTestId('lazy-image-placeholder')).toHaveClass('animate-pulse');
    expect(screen.queryByRole('img', { name: alt })).not.toBeInTheDocument();
  });

  it('loads image immediately if priority is true', async () => {
    render(<LazyImage src={src} alt={alt} priority={true} onLoad={onLoad} />);
    const img = screen.getByRole('img', { name: alt });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', src);
    fireEvent.load(img); // Simulate img load event
    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(mockIntersectionObserver).not.toHaveBeenCalled(); // No intersection observer for priority
  });

  it('loads image when it enters view (lazy loading)', async () => {
    render(<LazyImage src={src} alt={alt} priority={false} onLoad={onLoad} />);

    // Initially, the actual image should not be loaded
    expect(screen.queryByRole('img', { name: alt })).not.toBeInTheDocument();
    
    // Simulate intersection - call the callback that was passed to the constructor
    const instance = mockIntersectionObserver.mock.results[0].value;
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    observerCallback([{ isIntersecting: true, target: screen.getByTestId('lazy-image-root') }]);

    await waitFor(() => {
      const img = screen.getByRole('img', { name: alt });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', src);
    });
    
    const img = screen.getByRole('img', { name: alt });
    fireEvent.load(img);
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('displays blurDataURL as placeholder if provided', () => {
    render(<LazyImage src={src} alt={alt} blurDataURL={blurDataURL} priority={false} />);
    const blurImg = screen.getByAltText(''); // The blur image has empty alt
    expect(blurImg).toBeInTheDocument();
    expect(blurImg).toHaveAttribute('src', blurDataURL);
    expect(screen.queryByTestId('lazy-image-placeholder')).not.toBeInTheDocument();
  });

  it('displays error state if image fails to load', async () => {
    render(<LazyImage src={src} alt={alt} priority={true} onError={onError} />);
    const img = screen.getByRole('img', { name: alt });
    fireEvent.error(img); // Simulate error
    expect(onError).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('lazy-image-error-svg')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: alt })).not.toBeInTheDocument(); // Original image should be gone
  });

  it('generates srcset and sizes for optimized images', async () => {
    render(<LazyImage src={src} alt={alt} priority={true} sizes="100vw" />);
    const img = screen.getByRole('img', { name: alt });
    expect(img).toHaveAttribute('sizes', '100vw');
    expect(img).toHaveAttribute('srcset');
    expect(screen.getByTestId('source-tag-webp')).toBeInTheDocument();
    expect(screen.getByTestId('source-tag-webp')).toHaveAttribute('type', 'image/webp');
    expect(screen.getByTestId('source-tag-avif')).toBeInTheDocument();
    expect(screen.getByTestId('source-tag-avif')).toHaveAttribute('type', 'image/avif');
  });

  it('unobserves on component unmount', () => {
    const { unmount } = render(<LazyImage src={src} alt={alt} priority={false} />);
    const instance = mockIntersectionObserver.mock.results[0].value; // Get the mock instance
    expect(instance.observe).toHaveBeenCalledTimes(1);
    unmount();
    expect(instance.disconnect).toHaveBeenCalledTimes(1);
  });
});