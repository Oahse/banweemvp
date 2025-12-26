// frontend/src/components/auth/UserDataExport.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { UserDataExport } from './UserDataExport';
import { Button } from '../ui/Button';

// Mock child components
vitest.mock('../ui/Button', () => ({
  Button: vitest.fn((props) => (
    <button {...props} data-testid="mock-button">
      {props.children}
    </button>
  )),
}));

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  DownloadIcon: vitest.fn(() => <svg data-testid="icon-download" />),
  FileTextIcon: vitest.fn(() => <svg data-testid="icon-file-text" />),
  TableIcon: vitest.fn(() => <svg data-testid="icon-table" />),
  CodeIcon: vitest.fn(() => <svg data-testid="icon-code" />),
}));

describe('UserDataExport Component', () => {
  const mockOnExport = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders title and description', () => {
    render(<UserDataExport onExport={mockOnExport} />);
    expect(screen.getByText('Export Your Data')).toBeInTheDocument();
    expect(screen.getByText('Download a copy of your personal data in your preferred format.')).toBeInTheDocument();
  });

  it('renders all export format options and defaults to CSV', () => {
    render(<UserDataExport onExport={mockOnExport} />);
    expect(screen.getByLabelText('CSV (Comma Separated Values)')).toBeInTheDocument();
    expect(screen.getByLabelText('Excel (.xlsx)')).toBeInTheDocument();
    expect(screen.getByLabelText('JSON (JavaScript Object Notation)')).toBeInTheDocument();

    const csvRadio = screen.getByLabelText('CSV (Comma Separated Values)') as HTMLInputElement;
    expect(csvRadio).toBeChecked();
  });

  it('changes selected format when another option is clicked', () => {
    render(<UserDataExport onExport={mockOnExport} />);
    const jsonRadio = screen.getByLabelText('JSON (JavaScript Object Notation)') as HTMLInputElement;
    fireEvent.click(jsonRadio);
    expect(jsonRadio).toBeChecked();
    expect(screen.getByRole('button', { name: 'Export as JSON' })).toBeInTheDocument();
  });

  it('calls onExport with the selected format when export button is clicked', async () => {
    render(<UserDataExport onExport={mockOnExport} />);
    const jsonRadio = screen.getByLabelText('JSON (JavaScript Object Notation)') as HTMLInputElement;
    fireEvent.click(jsonRadio); // Select JSON

    fireEvent.click(screen.getByRole('button', { name: 'Export as JSON' }));

    await waitFor(() => {
      expect(mockOnExport).toHaveBeenCalledWith('json');
    });
  });

  it('shows "Preparing Export..." and disables button when exporting', async () => {
    mockOnExport.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100))); // Simulate async export
    render(<UserDataExport onExport={mockOnExport} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Export as CSV' }));
    
    expect(screen.getByRole('button', { name: 'Preparing Export...' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Preparing Export...' })).toBeDisabled();

    await act(async () => {
      vitest.advanceTimersByTime(100);
    });
    expect(screen.queryByText('Preparing Export...')).not.toBeInTheDocument();
  });

  it('disables export button when loading prop is true', () => {
    render(<UserDataExport onExport={mockOnExport} loading={true} />);
    expect(screen.getByRole('button', { name: 'Export as CSV' })).toBeDisabled();
  });

  it('renders data included section', () => {
    render(<UserDataExport onExport={mockOnExport} />);
    expect(screen.getByText('Data Included in Export')).toBeInTheDocument();
    expect(screen.getByText('Personal information (name, email, phone)')).toBeInTheDocument();
  });

  it('renders privacy notice section', () => {
    render(<UserDataExport onExport={mockOnExport} />);
    expect(screen.getByText('Privacy Notice')).toBeInTheDocument();
    expect(screen.getByText('Your exported data contains sensitive personal information.')).toBeInTheDocument();
  });
});
