// frontend/src/components/product/BarcodeDisplay.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { BarcodeDisplay } from './BarcodeDisplay';

// --- Mock external dependencies ---
// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  ScanIcon: vitest.fn(() => <svg data-testid="icon-scan" />),
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

describe('BarcodeDisplay Component', () => {
  const mockBarcode = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // A 1x1 transparent PNG base64
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

  it('renders "No Barcode" state when barcode is empty', () => {
    render(<BarcodeDisplay barcode="" variant={mockVariant} />);
    expect(screen.getByText('No Barcode')).toBeInTheDocument();
    expect(screen.getByTestId('icon-scan')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders the barcode image and SKU', () => {
    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} />);
    const barcodeImage = screen.getByRole('img', { name: `Barcode for ${mockVariant.name}` });
    expect(barcodeImage).toBeInTheDocument();
    expect(barcodeImage).toHaveAttribute('src', `data:image/png;base64,${mockBarcode}`);
    expect(screen.getByText(mockVariant.sku)).toBeInTheDocument(); // SKU text
  });

  it('hides controls when showControls is false', () => {
    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} showControls={false} />);
    expect(screen.queryByTitle('Download Barcode')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Print Barcode')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Copy Barcode')).not.toBeInTheDocument();
  });

  it('hides SKU when showSKU is false', () => {
    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} showSKU={false} />);
    expect(screen.queryByText(mockVariant.sku)).not.toBeInTheDocument();
  });

  it('downloads the barcode image', () => {
    const mockLink = { click: vitest.fn(), download: '', href: '' };
    mockCreateElement.mockReturnValue(mockLink as any);

    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} />);
    fireEvent.click(screen.getByTitle('Download Barcode'));

    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe(`data:image/png;base64,${mockBarcode}`);
    expect(mockLink.download).toBe(`barcode-${mockVariant.sku}.png`);
    expect(mockAppendChild).toHaveBeenCalledWith(mockLink);
    expect(mockLink.click).toHaveBeenCalledTimes(1);
    expect(mockRemoveChild).toHaveBeenCalledWith(mockLink);
  });

  it('prints the barcode image', () => {
    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} />);
    fireEvent.click(screen.getByTitle('Print Barcode'));

    expect(mockWindowOpen).toHaveBeenCalledWith('', '_blank');
    expect(mockPrintWindow.document.write).toHaveBeenCalledWith(expect.stringContaining(`data:image/png;base64,${mockBarcode}`));
    expect(mockPrintWindow.document.write).toHaveBeenCalledWith(expect.stringContaining(`<h2>${mockVariant.product_name}</h2>`));
    expect(mockPrintWindow.document.close).toHaveBeenCalledTimes(1);
    expect(mockPrintWindow.print).toHaveBeenCalledTimes(1);
  });

  it('copies the barcode to clipboard', async () => {
    vitest.useFakeTimers();
    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} />);
    fireEvent.click(screen.getByTitle('Copy Barcode'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(`data:image/png;base64,${mockBarcode}`);
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

    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} />);
    fireEvent.click(screen.getByTitle('Copy Barcode'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockWriteText).toHaveBeenCalledWith(`data:image/png;base64,${mockBarcode}`);
      expect(screen.getByTestId('icon-check')).toBeInTheDocument();
    });
    vitest.useRealTimers();
  });

  it('applies correct size classes to barcode image', () => {
    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} size="lg" />);
    const barcodeImage = screen.getByRole('img');
    expect(barcodeImage).toHaveClass('h-16');
  });

  it('displays format info when size is not "sm"', () => {
    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} size="md" format="EAN13" />);
    expect(screen.getByText('EAN13 Format')).toBeInTheDocument();
  });

  it('does not display format info when size is "sm"', () => {
    render(<BarcodeDisplay barcode={mockBarcode} variant={mockVariant} size="sm" format="EAN13" />);
    expect(screen.queryByText('EAN13 Format')).not.toBeInTheDocument();
  });
});
