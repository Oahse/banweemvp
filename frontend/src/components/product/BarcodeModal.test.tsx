// frontend/src/components/product/BarcodeModal.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { BarcodeModal } from './BarcodeModal';

// --- Mock external dependencies ---
vitest.mock('framer-motion', () => ({
  motion: {
    div: vitest.fn((props) => (
      <div data-testid="motion-div" {...props}>
        {props.children}
      </div>
    )),
  },
}));

vitest.mock('lucide-react', () => ({
  ScanLineIcon: vitest.fn(() => <svg data-testid="icon-scan-line" />),
  DownloadIcon: vitest.fn(() => <svg data-testid="icon-download" />),
  CopyIcon: vitest.fn(() => <svg data-testid="icon-copy" />),
  XIcon: vitest.fn(() => <svg data-testid="icon-x" />),
}));

// Mock canvas and its context
const mockGetContext = vitest.fn(() => ({
  fillRect: vitest.fn(),
  fillText: vitest.fn(),
  clearRect: vitest.fn(),
  // Add other canvas context methods if they are called
}));
const mockCanvasToDataURL = vitest.fn(() => 'data:image/png;base64,mock-barcode-image');
const mockCanvasElement = {
  getContext: mockGetContext,
  toDataURL: mockCanvasToDataURL,
  width: 0,
  height: 0,
};

// Mock document.createElement('a') for download functionality
const mockLinkClick = vitest.fn();
const mockCreateElement = vitest.spyOn(document, 'createElement');
mockCreateElement.mockImplementation((tagName) => {
  if (tagName === 'a') {
    return {
      href: '',
      download: '',
      click: mockLinkClick,
      // Mock appendChild and removeChild as they interact with document.body
      // For a simple 'a' tag download, these might not be strictly necessary to mock
      // as the link.click() is what performs the action.
      // However, the component does use them.
      // A more robust mock would involve creating a fake DOM element.
      // For now, we'll just check if click is called.
    } as unknown as HTMLElement;
  }
  return vitest.importActual('jsdom').JSDOM.fragment('<div></div>').firstChild as HTMLElement;
});


// Mock navigator.clipboard
const mockClipboardWriteText = vitest.fn();
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: mockClipboardWriteText },
  configurable: true,
});

describe('BarcodeModal Component', () => {
  const mockCode = '123456789012';
  const mockOnClose = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    mockGetContext.mockClear();
    mockCanvasToDataURL.mockClear();
    mockLinkClick.mockClear();
    mockCreateElement.mockClear();
    mockClipboardWriteText.mockClear();

    // Reset canvas ref mock
    const useRefSpy = vitest.spyOn(React, 'useRef');
    useRefSpy.mockReturnValue({ current: mockCanvasElement });
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<BarcodeModal code={mockCode} isOpen={false} onClose={mockOnClose} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal content when isOpen is true', () => {
    render(<BarcodeModal code={mockCode} isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Product Barcode')).toBeInTheDocument();
    expect(screen.getByText(mockCode)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy Code' })).toBeInTheDocument();
    expect(screen.getByTestId('icon-scan-line')).toBeInTheDocument();
  });

  it('calls generateBarcode on mount when open and with code', () => {
    const generateBarcodeSpy = vitest.spyOn(BarcodeModal.prototype, 'generateBarcode' as any); // Spy on the internal function
    render(<BarcodeModal code={mockCode} isOpen={true} onClose={mockOnClose} />);
    expect(generateBarcodeSpy).toHaveBeenCalledTimes(1);
    expect(generateBarcodeSpy).toHaveBeenCalledWith(mockCode, mockCanvasElement);
    generateBarcodeSpy.mockRestore(); // Restore original function
  });

  it('calls onClose when close button is clicked', () => {
    render(<BarcodeModal code={mockCode} isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByTestId('icon-x').closest('button')!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<BarcodeModal code={mockCode} isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByTestId('motion-div')); // Click on the outer motion.div (backdrop)
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(<BarcodeModal code={mockCode} isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Product Barcode')); // Click on modal header
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('downloads barcode when "Download" button is clicked', () => {
    render(<BarcodeModal code={mockCode} isOpen={true} onClose={mockOnClose} title="My Barcode" />);
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));

    expect(mockCanvasToDataURL).toHaveBeenCalledTimes(1);
    expect(mockCreateElement).toHaveBeenCalledWith('a');
    // For more robust checking of dynamic download link:
    // const link = mockCreateElement.mock.results[0].value;
    // expect(link.download).toMatch(/^barcode-123456789012-\d+\.png$/);
    // expect(link.href).toBe('data:image/png;base64,mock-barcode-image');
    expect(mockLinkClick).toHaveBeenCalledTimes(1);
  });

  it('copies code to clipboard when "Copy Code" button is clicked', async () => {
    // Mock window.alert as component uses it
    const mockAlert = vitest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<BarcodeModal code={mockCode} isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy Code' }));

    await waitFor(() => {
      expect(mockClipboardWriteText).toHaveBeenCalledWith(mockCode);
      expect(mockAlert).toHaveBeenCalledWith('Barcode copied to clipboard!');
    });
    mockAlert.mockRestore();
  });
});
