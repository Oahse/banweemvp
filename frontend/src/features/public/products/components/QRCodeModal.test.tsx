// frontend/src/components/product/QRCodeModal.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { QRCodeModal } from './QRCodeModal';

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
  QrCodeIcon: vitest.fn(() => <svg data-testid="icon-qr-code" />),
  DownloadIcon: vitest.fn(() => <svg data-testid="icon-download" />),
  ShareIcon: vitest.fn(() => <svg data-testid="icon-share" />),
  XIcon: vitest.fn(() => <svg data-testid="icon-x" />),
}));

// Mock canvas and its context
const mockGetContext = vitest.fn(() => ({
  fillRect: vitest.fn(),
  fillText: vitest.fn(),
  // Add other canvas context methods if they are called
}));
const mockCanvasToDataURL = vitest.fn(() => 'data:image/png;base64,mock-qr-code-image');
const mockCanvasToBlob = vitest.fn((callback) => callback(new Blob([], { type: 'image/png' })));
const mockCanvasElement = {
  getContext: mockGetContext,
  toDataURL: mockCanvasToDataURL,
  toBlob: mockCanvasToBlob,
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
    } as unknown as HTMLElement;
  }
  return vitest.importActual('jsdom').JSDOM.fragment('<div></div>').firstChild as HTMLElement;
});


// Mock navigator.clipboard
const mockClipboardWrite = vitest.fn();
Object.defineProperty(navigator, 'clipboard', {
  value: { write: mockClipboardWrite },
  configurable: true,
});

// Mock navigator.share
const mockNavigatorShare = vitest.fn();
Object.defineProperty(navigator, 'share', {
  value: mockNavigatorShare,
  configurable: true,
});

describe('QRCodeModal Component', () => {
  const mockData = 'https://example.com/product-link';
  const mockOnClose = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    mockGetContext.mockClear();
    mockCanvasToDataURL.mockClear();
    mockCanvasToBlob.mockClear();
    mockLinkClick.mockClear();
    mockCreateElement.mockClear();
    mockClipboardWrite.mockClear();
    mockNavigatorShare.mockClear();

    // Reset canvas ref mock
    const useRefSpy = vitest.spyOn(React, 'useRef');
    useRefSpy.mockReturnValue({ current: mockCanvasElement });
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<QRCodeModal data={mockData} isOpen={false} onClose={mockOnClose} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal content when isOpen is true', () => {
    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} title="Product QR Code" description="Scan for details" />);
    expect(screen.getByText('Product QR Code')).toBeInTheDocument();
    expect(screen.getByText('Scan for details')).toBeInTheDocument();
    expect(screen.getByText(mockData)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
    expect(screen.getByTestId('icon-qr-code')).toBeInTheDocument();
  });

  it('calls generateQRCode on mount when open and with data', () => {
    const generateQRCodeSpy = vitest.spyOn(QRCodeModal.prototype, 'generateQRCode' as any); // Spy on the internal function
    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} />);
    expect(generateQRCodeSpy).toHaveBeenCalledTimes(1);
    expect(generateQRCodeSpy).toHaveBeenCalledWith(mockData, mockCanvasElement);
    generateQRCodeSpy.mockRestore(); // Restore original function
  });

  it('calls onClose when close button is clicked', () => {
    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByTestId('icon-x').closest('button')!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByTestId('motion-div')); // Click on the outer motion.div (backdrop)
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Product QR Code')); // Click on modal header
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('downloads QR code when "Download" button is clicked', () => {
    const mockLink = { click: vitest.fn(), download: '', href: '' };
    mockCreateElement.mockReturnValue(mockLink as any);

    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} title="My QR Code" />);
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));

    expect(mockCanvasToDataURL).toHaveBeenCalledTimes(1);
    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockLinkClick).toHaveBeenCalledTimes(1);
    expect(mockLink.download).toMatch(/^qr-code-\d+\.png$/);
    expect(mockLink.href).toBe('data:image/png;base64,mock-qr-code-image');
  });

  it('shares QR code using Web Share API when available', async () => {
    mockNavigatorShare.mockResolvedValueOnce({});
    Object.defineProperty(navigator, 'share', { value: mockNavigatorShare, configurable: true });

    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} title="My QR Code" description="Scan this" />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => {
      expect(mockCanvasToBlob).toHaveBeenCalledTimes(1);
      expect(mockNavigatorShare).toHaveBeenCalledWith(expect.objectContaining({
        title: 'My QR Code',
        text: 'Scan this',
        files: [expect.any(File)],
      }));
    });
  });

  it('copies QR code to clipboard as fallback if Web Share API is not available', async () => {
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true }); // Make navigator.share unavailable
    const mockAlert = vitest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} title="My QR Code" />);
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => {
      expect(mockCanvasToBlob).toHaveBeenCalledTimes(1);
      expect(mockClipboardWrite).toHaveBeenCalledTimes(1);
      expect(mockAlert).toHaveBeenCalledWith('QR code copied to clipboard!');
    });
    mockAlert.mockRestore();
  });

  it('applies correct size to canvas', () => {
    render(<QRCodeModal data={mockData} isOpen={true} onClose={mockOnClose} size={100} />);
    const canvas = screen.getByRole('img').closest('div')?.querySelector('canvas');
    expect(canvas).toHaveStyle('width: 100px');
    expect(canvas).toHaveStyle('height: 100px');
  });
});
