// frontend/src/components/product/QRCodeDisplay.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { QRCodeDisplay } from './QRCodeDisplay';

// --- Mock external dependencies ---
// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  QrCodeIcon: vitest.fn(() => <svg data-testid="icon-qr-code" />),
  DownloadIcon: vitest.fn(() => <svg data-testid="icon-download" />),
  PrinterIcon: vitest.fn(() => <svg data-testid="icon-printer" />),
  CopyIcon: vitest.fn(() => <svg data-testid="icon-copy" />),
  CheckIcon: vitest.fn(() => <svg data-testid="icon-check" />),
}));

// Mock global DOM manipulation functions
const mockCreateElement = vitest.spyOn(document, 'createElement');
const mockAppendChild = vitest.spyOn(document.body, 'appendChild');
const mockRemoveChild = vitest.spyOn(document.body, 'removeChild');

// Mock window.open and its associated methods
const mockPrintWindow = {
  document: { write: vitest.fn(), close: vitest.fn() },
  print: vitest.fn(),
};
const mockWindowOpen = vitest.spyOn(window, 'open').mockReturnValue(mockPrintWindow as any);

// Mock navigator.clipboard
const mockClipboardWrite = vitest.fn();
Object.defineProperty(navigator, 'clipboard', {
  value: { write: mockClipboardWrite },
  configurable: true,
});

// Mock ClipboardItem constructor
const mockClipboardItem = vitest.fn((items) => ({ items }));
vitest.stubGlobal('ClipboardItem', mockClipboardItem);

// Mock global fetch for copying to clipboard
const mockFetch = vitest.fn();
vitest.stubGlobal('fetch', mockFetch);

describe('QRCodeDisplay Component', () => {
  const mockQrCode = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // A 1x1 transparent PNG base64
  const mockVariant = {
    id: 'var-123',
    name: 'Test Product Variant',
    sku: 'SKU-001',
    product_name: 'Test Product',
  };

  beforeEach(() => {
    vitest.clearAllMocks();
    mockPrintWindow.document.write.mockClear();
    mockPrintWindow.document.close.mockClear();
    mockPrintWindow.print.mockClear();
    mockWindowOpen.mockClear();
    mockClipboardWrite.mockClear();
    mockCreateElement.mockClear();
    mockAppendChild.mockClear();
    mockRemoveChild.mockClear();
    mockFetch.mockResolvedValue({
      blob: () => Promise.resolve(new Blob()),
    });
  });

  it('renders "No QR Code" state when qrCode is empty', () => {
    render(<QRCodeDisplay qrCode="" variant={mockVariant} />);
    expect(screen.getByText('No QR Code')).toBeInTheDocument();
    expect(screen.getByTestId('icon-qr-code')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders the QR code image and variant info', () => {
    render(<QRCodeDisplay qrCode={mockQrCode} variant={mockVariant} />);
    const qrCodeImage = screen.getByRole('img', { name: `QR Code for ${mockVariant.name}` });
    expect(qrCodeImage).toBeInTheDocument();
    expect(qrCodeImage).toHaveAttribute('src', `data:image/png;base64,${mockQrCode}`);
    expect(screen.getByText(mockVariant.name)).toBeInTheDocument(); // Variant name
    expect(screen.getByText(mockVariant.sku)).toBeInTheDocument(); // Variant SKU
  });

  it('hides controls when showControls is false', () => {
    render(<QRCodeDisplay qrCode={mockQrCode} variant={mockVariant} showControls={false} />);
    expect(screen.queryByTitle('Download QR Code')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Print QR Code')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Copy QR Code')).not.toBeInTheDocument();
  });

  it('downloads the QR code image', () => {
    const mockLink = { click: vitest.fn(), download: '', href: '' };
    mockCreateElement.mockReturnValue(mockLink as any);

    render(<QRCodeDisplay qrCode={mockQrCode} variant={mockVariant} />);
    fireEvent.click(screen.getByTitle('Download QR Code'));

    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe(`data:image/png;base64,${mockQrCode}`);
    expect(mockLink.download).toBe(`qr-code-${mockVariant.sku}.png`);
    expect(mockAppendChild).toHaveBeenCalledWith(mockLink);
    expect(mockLink.click).toHaveBeenCalledTimes(1);
    expect(mockRemoveChild).toHaveBeenCalledWith(mockLink);
  });

  it('prints the QR code image', () => {
    render(<QRCodeDisplay qrCode={mockQrCode} variant={mockVariant} />);
    fireEvent.click(screen.getByTitle('Print QR Code'));

    expect(mockWindowOpen).toHaveBeenCalledWith('', '_blank');
    expect(mockPrintWindow.document.write).toHaveBeenCalledWith(expect.stringContaining(`data:image/png;base64,${mockQrCode}`));
    expect(mockPrintWindow.document.write).toHaveBeenCalledWith(expect.stringContaining(`<h2>${mockVariant.product_name}</h2>`));
    expect(mockPrintWindow.document.close).toHaveBeenCalledTimes(1);
    expect(mockPrintWindow.print).toHaveBeenCalledTimes(1);
  });

  it('copies the QR code to clipboard', async () => {
    vitest.useFakeTimers();
    render(<QRCodeDisplay qrCode={mockQrCode} variant={mockVariant} />);
    fireEvent.click(screen.getByTitle('Copy QR Code'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(`data:image/png;base64,${mockQrCode}`);
      expect(mockClipboardItem).toHaveBeenCalledWith(expect.any(Object));
      expect(mockClipboardWrite).toHaveBeenCalledTimes(1);
    });
    
    expect(screen.getByTestId('icon-check')).toBeInTheDocument(); // Shows check icon
    act(() => {
      vitest.advanceTimersByTime(2000); // Advance past copy success message duration
    });
    expect(screen.queryByTestId('icon-check')).not.toBeInTheDocument();
    expect(screen.getByTestId('icon-copy')).toBeInTheDocument();
    vitest.useRealTimers();
  });

  it('falls back to copying base64 string if image copy fails', async () => {
    vitest.useFakeTimers();
    mockFetch.mockRejectedValueOnce(new Error('Fetch error')); // Image fetch fails
    const mockWriteText = vitest.fn();
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: mockWriteText,
      configurable: true,
    });

    render(<QRCodeDisplay qrCode={mockQrCode} variant={mockVariant} />);
    fireEvent.click(screen.getByTitle('Copy QR Code'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockWriteText).toHaveBeenCalledWith(`data:image/png;base64,${mockQrCode}`);
      expect(screen.getByTestId('icon-check')).toBeInTheDocument();
    });
    vitest.useRealTimers();
  });

  it('applies correct size classes to QR code image', () => {
    render(<QRCodeDisplay qrCode={mockQrCode} variant={mockVariant} size="lg" />);
    const qrCodeImage = screen.getByRole('img');
    expect(qrCodeImage).toHaveClass('w-48', 'h-48');
  });

  it('hides variant info when size is "sm"', () => {
    render(<QRCodeDisplay qrCode={mockQrCode} variant={mockVariant} size="sm" />);
    expect(screen.queryByText(mockVariant.name)).not.toBeInTheDocument();
  });
});
