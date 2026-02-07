// frontend/src/components/product/ProductImageGallery.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { ProductImageGallery } from './ProductImageGallery';

// --- Mock external dependencies ---
vitest.mock('framer-motion', () => ({
  motion: {
    div: vitest.fn((props) => (
      <div data-testid="motion-div" {...props}>
        {props.children}
      </div>
    )),
  },
  AnimatePresence: vitest.fn((props) => <>{props.children}</>),
}));

vitest.mock('lucide-react', () => ({
  ChevronLeftIcon: vitest.fn(() => <svg data-testid="icon-chevron-left" />),
  ChevronRightIcon: vitest.fn(() => <svg data-testid="icon-chevron-right" />),
  ZoomInIcon: vitest.fn(() => <svg data-testid="icon-zoom-in" />),
  XIcon: vitest.fn(() => <svg data-testid="icon-x" />),
}));

describe('ProductImageGallery Component', () => {
  const mockImages = [
    { id: '1', url: 'http://example.com/img1.jpg', alt_text: 'Image 1', sort_order: 1, is_primary: true },
    { id: '2', url: 'http://example.com/img2.jpg', alt_text: 'Image 2', sort_order: 2, is_primary: false },
    { id: '3', url: 'http://example.com/img3.jpg', alt_text: 'Image 3', sort_order: 3, is_primary: false },
  ];
  const mockOnImageSelect = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders "No images available" when images array is empty', () => {
    render(<ProductImageGallery images={[]} selectedImageIndex={0} onImageSelect={mockOnImageSelect} />);
    expect(screen.getByText('No images available')).toBeInTheDocument();
  });

  it('renders the current main image and thumbnails', () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={0} onImageSelect={mockOnImageSelect} />);
    expect(screen.getByAltText('Image 1')).toHaveAttribute('src', 'http://example.com/img1.jpg');
    expect(screen.getAllByRole('img').length).toBe(mockImages.length + 1); // Main + Thumbnails
    expect(screen.getByText('1 / 3')).toBeInTheDocument(); // Image counter
  });

  it('navigates to next image on "Next" button click', () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={0} onImageSelect={mockOnImageSelect} />);
    fireEvent.click(screen.getByTestId('icon-chevron-right').closest('button')!);
    expect(mockOnImageSelect).toHaveBeenCalledWith(1);
  });

  it('navigates to previous image on "Previous" button click', () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={1} onImageSelect={mockOnImageSelect} />);
    fireEvent.click(screen.getByTestId('icon-chevron-left').closest('button')!);
    expect(mockOnImageSelect).toHaveBeenCalledWith(0);
  });

  it('selects image on thumbnail click', () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={0} onImageSelect={mockOnImageSelect} />);
    fireEvent.click(screen.getByAltText('Image 3').closest('button')!); // Click third thumbnail
    expect(mockOnImageSelect).toHaveBeenCalledWith(2);
  });

  it('toggles zoom on main image hover', () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={0} onImageSelect={mockOnImageSelect} zoomEnabled={true} />);
    const mainImageContainer = screen.getByAltText('Image 1').closest('div')!;
    const mainImage = screen.getByAltText('Image 1');

    fireEvent.mouseEnter(mainImageContainer);
    expect(mainImage).toHaveClass('scale-150');
    expect(mainImage).toHaveStyle('transform-origin: 50% 50%'); // Default origin if no mousemove

    fireEvent.mouseLeave(mainImageContainer);
    expect(mainImage).not.toHaveClass('scale-150');
  });

  it('updates zoom position on mouse move', () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={0} onImageSelect={mockOnImageSelect} zoomEnabled={true} />);
    const mainImageContainer = screen.getByAltText('Image 1').closest('div')!;
    const mainImage = screen.getByAltText('Image 1');

    // Mock getBoundingClientRect for accurate mouse position calculation
    vitest.spyOn(mainImageContainer, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      x: 0, y: 0, right: 100, bottom: 100, toJSON: () => {},
    });

    fireEvent.mouseEnter(mainImageContainer);
    fireEvent.mouseMove(mainImageContainer, { clientX: 25, clientY: 75 });
    expect(mainImage).toHaveStyle('transform-origin: 25% 75%;');
  });

  it('enters and exits fullscreen mode', async () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={0} onImageSelect={mockOnImageSelect} />);
    fireEvent.click(screen.getByAltText('Image 1')); // Click main image to enter fullscreen

    await waitFor(() => {
      expect(screen.getByTestId('motion-div')).toBeInTheDocument(); // Fullscreen modal
      expect(screen.getByAltText('Image 1')).toHaveClass('max-w-full', 'max-h-full'); // Fullscreen image
    });

    fireEvent.click(screen.getByTestId('icon-x').closest('button')!); // Click close button
    await waitFor(() => {
      expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    });
  });

  it('navigates images in fullscreen with keyboard arrows', async () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={0} onImageSelect={mockOnImageSelect} />);
    fireEvent.click(screen.getByAltText('Image 1')); // Enter fullscreen
    await waitFor(() => expect(screen.getByTestId('motion-div')).toBeInTheDocument());

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(mockOnImageSelect).toHaveBeenCalledWith(1); // Next image

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(mockOnImageSelect).toHaveBeenCalledWith(0); // Previous image

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument(); // Exit fullscreen
    });
  });

  it('does not render thumbnails when showThumbnails is false', () => {
    render(<ProductImageGallery images={mockImages} selectedImageIndex={0} onImageSelect={mockOnImageSelect} showThumbnails={false} />);
    expect(screen.queryByAltText('Thumbnail 1')).not.toBeInTheDocument();
  });
});
