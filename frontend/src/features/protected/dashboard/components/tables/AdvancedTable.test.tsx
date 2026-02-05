// frontend/src/components/dashboard/tables/AdvancedTable.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { AdvancedTable } from './AdvancedTable';
import {
  ChevronUpIcon, ChevronDownIcon, SearchIcon, FilterIcon,
  DownloadIcon, EyeIcon, ChevronLeftIcon, ChevronRightIcon
} from 'lucide-react'; // Mocked icons

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  ChevronUpIcon: vitest.fn(() => <svg data-testid="icon-chevron-up" />),
  ChevronDownIcon: vitest.fn(() => <svg data-testid="icon-chevron-down" />),
  SearchIcon: vitest.fn(() => <svg data-testid="icon-search" />),
  FilterIcon: vitest.fn(() => <svg data-testid="icon-filter" />),
  DownloadIcon: vitest.fn(() => <svg data-testid="icon-download" />),
  EyeIcon: vitest.fn(() => <svg data-testid="icon-eye" />),
  ChevronLeftIcon: vitest.fn(() => <svg data-testid="icon-chevron-left" />),
  ChevronRightIcon: vitest.fn(() => <svg data-testid="icon-chevron-right" />),
}));

// Mock Intl.NumberFormat for consistent testing
const mockNumberFormat = vitest.fn((locale, options) => ({
  format: vitest.fn((value) => {
    if (options.style === 'currency') return `$${value.toFixed(2)}`;
    return value.toLocaleString();
  }),
}));
vitest.stubGlobal('Intl', { NumberFormat: mockNumberFormat });

describe('AdvancedTable Component', () => {
  const mockColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true, format: 'number' },
    { key: 'status', label: 'Status', render: (val: string) => <span className={val === 'Active' ? 'text-green-500' : 'text-red-500'}>{val}</span> },
    { key: 'email', label: 'Email', hidden: true },
  ];
  const mockData = [
    { id: '1', name: 'Alice', age: 30, status: 'Active', email: 'alice@example.com' },
    { id: '2', name: 'Bob', age: 24, status: 'Inactive', email: 'bob@example.com' },
    { id: '3', name: 'Charlie', age: 35, status: 'Active', email: 'charlie@example.com' },
    { id: '4', name: 'David', age: 28, status: 'Active', email: 'david@example.com' },
    { id: '5', name: 'Eve', age: 40, status: 'Inactive', email: 'eve@example.com' },
    { id: '6', name: 'Frank', age: 22, status: 'Active', email: 'frank@example.com' },
    { id: '7', name: 'Grace', age: 31, status: 'Active', email: 'grace@example.com' },
    { id: '8', name: 'Heidi', age: 29, status: 'Inactive', email: 'heidi@example.com' },
    { id: '9', name: 'Ivan', age: 33, status: 'Active', email: 'ivan@example.com' },
    { id: '10', name: 'Judy', age: 26, status: 'Active', email: 'judy@example.com' },
    { id: '11', name: 'Karen', age: 38, status: 'Inactive', email: 'karen@example.com' },
  ];
  const mockOnRowClick = vitest.fn();
  const mockOnSelectionChange = vitest.fn();
  const mockOnExport = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders loading skeleton when loading is true', () => {
    render(<AdvancedTable columns={mockColumns} data={[]} loading={true} />);
    expect(screen.getByRole('status', { name: 'Loading content...' })).toBeInTheDocument(); // generic skeleton
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders table headers and data correctly', () => {
    render(<AdvancedTable columns={mockColumns} data={mockData} title="User List" />);
    expect(screen.getByText('User List')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'ID' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Alice' })).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument(); // Age formatted as number
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.queryByRole('columnheader', { name: 'Email' })).not.toBeInTheDocument(); // Hidden column
  });

  it('handles search functionality', () => {
    render(<AdvancedTable columns={mockColumns} data={mockData} searchable={true} />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'bob' } });
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });

  it('handles sorting by column', () => {
    render(<AdvancedTable columns={mockColumns} data={mockData} sortable={true} />);
    fireEvent.click(screen.getByRole('columnheader', { name: 'Name' })); // Sort ascending by Name
    let rows = screen.getAllByRole('row').slice(1).map(row => row.children[1].textContent); // Get names from first visible column
    expect(rows[0]).toBe('Alice');
    expect(rows[rows.length - 1]).toBe('Judy'); // Due to pagination, only first page is shown

    fireEvent.click(screen.getByRole('columnheader', { name: 'Name' })); // Sort descending by Name
    rows = screen.getAllByRole('row').slice(1).map(row => row.children[1].textContent);
    expect(rows[0]).toBe('Karen'); // Based on mockData
  });

  it('handles pagination', () => {
    render(<AdvancedTable columns={mockColumns} data={mockData} pagination={true} pageSize={5} />);
    expect(screen.getAllByRole('row').length - 1).toBe(5); // 5 data rows + 1 header row

    fireEvent.click(screen.getByTestId('icon-chevron-right')); // Go to next page
    expect(screen.getByText('Frank')).toBeInTheDocument(); // Item from second page
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('icon-chevron-left')); // Go to previous page
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('handles row selection', () => {
    render(<AdvancedTable columns={mockColumns} data={mockData.slice(0, 2)} selectable={true} onSelectionChange={mockOnSelectionChange} />);
    const selectAllCheckbox = screen.getByRole('checkbox', { name: /select all/i });
    const aliceCheckbox = screen.getByRole('checkbox', { name: /select row 1/i }); // Assuming implicit ARIA label
    
    // Select Alice
    fireEvent.click(aliceCheckbox);
    expect(aliceCheckbox).toBeChecked();
    expect(mockOnSelectionChange).toHaveBeenCalledWith([{ id: '1', name: 'Alice', age: 30, status: 'Active', email: 'alice@example.com' }]);
    
    // Select all
    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).toBeChecked();
    expect(mockOnSelectionChange).toHaveBeenCalledWith(mockData.slice(0, 2));
  });

  it('toggles column visibility', () => {
    render(<AdvancedTable columns={mockColumns} data={mockData} />);
    fireEvent.click(screen.getByTitle('Column Visibility')); // Open column selector
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument(); // Hidden column checkbox

    fireEvent.click(screen.getByLabelText('Email')); // Make Email visible
    expect(screen.getByRole('columnheader', { name: 'Email' })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Name')); // Hide Name
    expect(screen.queryByRole('columnheader', { name: 'Name' })).not.toBeInTheDocument();
  });

  it('calls onExport when export button is clicked', () => {
    render(<AdvancedTable columns={mockColumns} data={mockData} exportable={true} onExport={mockOnExport} />);
    fireEvent.click(screen.getByTitle('Export'));
    expect(mockOnExport).toHaveBeenCalledWith('csv'); // Default export format is CSV
  });

  it('calls onRowClick when a data row is clicked', () => {
    render(<AdvancedTable columns={mockColumns} data={mockData} onRowClick={mockOnRowClick} />);
    fireEvent.click(screen.getByText('Alice'));
    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0], expect.any(Number));
  });

  it('formats cell values based on column.format', () => {
    const formattedData = [{ id: '1', name: 'Test', age: 30, status: 'Active', email: 'test@example.com', price: 123.45, date: '2024-01-20T10:00:00Z', percentage: 0.25 }];
    const formattedColumns = [
      ...mockColumns,
      { key: 'price', label: 'Price', format: 'currency' },
      { key: 'date', label: 'Date', format: 'date' },
      { key: 'percentage', label: 'Growth', format: 'percentage' },
    ];
    render(<AdvancedTable columns={formattedColumns} data={formattedData} />);
    expect(screen.getByText('$123.45')).toBeInTheDocument();
    expect(screen.getByText(new Date('2024-01-20T10:00:00Z').toLocaleDateString())).toBeInTheDocument(); // Date format
    expect(screen.getByText('25.0%')).toBeInTheDocument();
  });
});
