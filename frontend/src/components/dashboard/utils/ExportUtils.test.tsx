// frontend/src/components/dashboard/utils/ExportUtils.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { ExportButton } from './ExportUtils';
import {
  DownloadIcon, FileTextIcon, TableIcon, ImageIcon
} from 'lucide-react'; // Mocked icons

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  DownloadIcon: vitest.fn(() => <svg data-testid="icon-download" />),
  FileTextIcon: vitest.fn(() => <svg data-testid="icon-file-text" />),
  TableIcon: vitest.fn(() => <svg data-testid="icon-table" />),
  ImageIcon: vitest.fn(() => <svg data-testid="icon-image" />),
}));

describe('ExportButton Component', () => {
  const mockOnExport = vitest.fn();
  const mockFormats = ['csv', 'pdf', 'png'];
  const mockData = { a: 1, b: 2 };

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders the main download button', () => {
    render(<ExportButton formats={mockFormats} onExport={mockOnExport} />);
    expect(screen.getByTitle('Export')).toBeInTheDocument();
    expect(screen.getByTestId('icon-download')).toBeInTheDocument();
  });

  it('dropdown menu is initially hidden', () => {
    render(<ExportButton formats={mockFormats} onExport={mockOnExport} />);
    expect(screen.queryByText('Export CSV')).not.toBeInTheDocument();
  });

  it('toggles dropdown menu visibility on button click', () => {
    render(<ExportButton formats={mockFormats} onExport={mockOnExport} />);
    const exportButton = screen.getByTitle('Export');

    fireEvent.click(exportButton); // Open
    expect(screen.getByText('Export CSV')).toBeInTheDocument();
    expect(screen.getByText('Export PDF')).toBeInTheDocument();
    expect(screen.getByText('Export PNG')).toBeInTheDocument();

    fireEvent.click(exportButton); // Close
    expect(screen.queryByText('Export CSV')).not.toBeInTheDocument();
  });

  it('hides dropdown menu when clicking backdrop', () => {
    render(<ExportButton formats={mockFormats} onExport={mockOnExport} />);
    const exportButton = screen.getByTitle('Export');

    fireEvent.click(exportButton); // Open
    expect(screen.getByText('Export CSV')).toBeInTheDocument();

    fireEvent.click(document.body); // Click outside (backdrop is fixed inset-0)
    expect(screen.queryByText('Export CSV')).not.toBeInTheDocument();
  });

  it('calls onExport with correct format and data when an export option is selected', () => {
    render(<ExportButton formats={mockFormats} onExport={mockOnExport} data={mockData} />);
    fireEvent.click(screen.getByTitle('Export')); // Open dropdown

    fireEvent.click(screen.getByText('Export PDF'));
    expect(mockOnExport).toHaveBeenCalledWith('pdf', mockData);
    expect(screen.queryByText('Export PDF')).not.toBeInTheDocument(); // Dropdown should close
  });

  it('displays correct icons for each format', () => {
    render(<ExportButton formats={mockFormats} onExport={mockOnExport} />);
    fireEvent.click(screen.getByTitle('Export')); // Open dropdown

    expect(screen.getByText('Export CSV').querySelector('[data-testid="icon-table"]')).toBeInTheDocument();
    expect(screen.getByText('Export PDF').querySelector('[data-testid="icon-file-text"]')).toBeInTheDocument();
    expect(screen.getByText('Export PNG').querySelector('[data-testid="icon-image"]')).toBeInTheDocument();
  });

  it('handles default icon for unknown format', () => {
    render(<ExportButton formats={['unknown']} onExport={mockOnExport} />);
    fireEvent.click(screen.getByTitle('Export')); // Open dropdown
    expect(screen.getByText('Export UNKNOWN').querySelector('[data-testid="icon-download"]')).toBeInTheDocument();
  });
});
