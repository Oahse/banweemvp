// frontend/src/components/ui/ResponsiveTable.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { ResponsiveTable } from './ResponsiveTable';

interface MockDataType {
  id: string;
  name: string;
  age: number;
  status: string;
}

const mockData: MockDataType[] = [
  { id: '1', name: 'Alice', age: 30, status: 'Active' },
  { id: '2', name: 'Bob', age: 24, status: 'Inactive' },
];

const mockColumns = [
  { key: 'name', label: 'Name', render: (item: MockDataType) => item.name },
  { key: 'age', label: 'Age', render: (item: MockDataType) => <span>{item.age} years</span>, mobileLabel: 'Person Age' },
  { key: 'status', label: 'Status', render: (item: MockDataType) => item.status, hideOnMobile: true },
];

const mockKeyExtractor = (item: MockDataType) => item.id;
const mockOnRowClick = vitest.fn();

describe('ResponsiveTable Component', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
    // Default to desktop view for most tests
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    window.dispatchEvent(new Event('resize'));
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 }); // Reset to default
    window.dispatchEvent(new Event('resize'));
  });

  it('renders loading skeletons when loading is true', () => {
    render(<ResponsiveTable data={[]} columns={mockColumns} keyExtractor={mockKeyExtractor} loading={true} />);

    // Check for desktop skeleton
    expect(screen.getByTestId('desktop-skeleton-header-cell')).toBeInTheDocument();
    expect(screen.getAllByTestId('desktop-skeleton-data-cell').length).toBeGreaterThan(0);
    expect(screen.queryByText('No data available')).not.toBeInTheDocument();

    // Check for mobile skeleton (initially hidden by CSS, but elements exist)
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    window.dispatchEvent(new Event('resize'));
    expect(screen.getAllByTestId('mobile-skeleton-row').length).toBeGreaterThan(0);
  });

  it('renders empty message when data is empty and not loading', () => {
    render(<ResponsiveTable data={[]} columns={mockColumns} keyExtractor={mockKeyExtractor} emptyMessage="No items here!" />);
    expect(screen.getByText('No items here!')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders desktop table view with data', () => {
    render(<ResponsiveTable data={mockData} columns={mockColumns} keyExtractor={mockKeyExtractor} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Age' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('30 years')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('triggers onRowClick when a row is clicked in desktop view', () => {
    render(<ResponsiveTable data={mockData} columns={mockColumns} keyExtractor={mockKeyExtractor} onRowClick={mockOnRowClick} />);
    fireEvent.click(screen.getByText('Alice').closest('tr') as HTMLElement);
    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('renders mobile list view with data', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    window.dispatchEvent(new Event('resize'));
    render(<ResponsiveTable data={mockData} columns={mockColumns} keyExtractor={mockKeyExtractor} />);

    expect(screen.queryByRole('table')).not.toBeInTheDocument(); // Desktop table should not be visible

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Person Age:')).toBeInTheDocument(); // mobileLabel for age
    expect(screen.getByText('30 years')).toBeInTheDocument();
    expect(screen.queryByText('Status:')).not.toBeInTheDocument(); // hideOnMobile column
  });

  it('triggers onRowClick when an item is clicked in mobile view', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    window.dispatchEvent(new Event('resize'));
    render(<ResponsiveTable data={mockData} columns={mockColumns} keyExtractor={mockKeyExtractor} onRowClick={mockOnRowClick} />);

    fireEvent.click(screen.getByText('Alice').closest('div.bg-surface') as HTMLElement);
    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
  });
});