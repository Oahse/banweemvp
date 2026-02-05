// frontend/src/components/dashboard/charts/TimeSeriesChart.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { TimeSeriesChart } from './TimeSeriesChart';
import { InteractiveChart } from './InteractiveChart';
import * as dateFns from 'date-fns'; // Import date-fns as a module to mock
import {
  CalendarIcon, ClockIcon, TrendingUpIcon, TrendingDownIcon
} from 'lucide-react'; // Mocked icons

// --- Mock external dependencies ---
vitest.mock('./InteractiveChart', () => ({
  InteractiveChart: vitest.fn((props) => (
    <div data-testid="mock-interactive-chart">Mock Interactive Chart {props.type}</div>
  )),
}));

vitest.mock('lucide-react', () => ({
  CalendarIcon: vitest.fn(() => <svg data-testid="icon-calendar" />),
  ClockIcon: vitest.fn(() => <svg data-testid="icon-clock" />),
  TrendingUpIcon: vitest.fn(() => <svg data-testid="icon-trending-up" />),
  TrendingDownIcon: vitest.fn(() => <svg data-testid="icon-trending-down" />),
}));

// Mock date-fns
const MOCK_DATE = new Date('2024-01-20T12:00:00.000Z');
vitest.setSystemTime(MOCK_DATE); // Control Date.now()
vitest.mock('date-fns', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    subDays: vitest.fn((date, amount) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() - amount);
      return newDate;
    }),
    subYears: vitest.fn((date, amount) => {
      const newDate = new Date(date);
      newDate.setFullYear(newDate.getFullYear() - amount);
      return newDate;
    }),
    startOfDay: vitest.fn((date) => {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    }),
    endOfDay: vitest.fn((date) => {
      const newDate = new Date(date);
      newDate.setHours(23, 59, 59, 999);
      return newDate;
    }),
  };
});


describe('TimeSeriesChart Component', () => {
  const mockInteractiveChart = InteractiveChart as vitest.Mock;
  const mockSubDays = dateFns.subDays as vitest.Mock;
  const mockSubYears = dateFns.subYears as vitest.Mock;
  const mockStartOfDay = dateFns.startOfDay as vitest.Mock;
  const mockEndOfDay = dateFns.endOfDay as vitest.Mock;

  const mockDatasets = [
    {
      label: 'Dataset 1',
      data: [
        { timestamp: new Date('2024-01-14T00:00:00.000Z'), value: 100 },
        { timestamp: new Date('2024-01-15T00:00:00.000Z'), value: 120 },
        { timestamp: new Date('2024-01-16T00:00:00.000Z'), value: 110 },
        { timestamp: new Date('2024-01-17T00:00:00.000Z'), value: 130 },
      ],
      color: 'blue',
      fillColor: 'lightblue',
    },
    {
      label: 'Dataset 2',
      data: [
        { timestamp: new Date('2024-01-14T00:00:00.000Z'), value: 50 },
        { timestamp: new Date('2024-01-15T00:00:00.000Z'), value: 40 },
        { timestamp: new Date('2024-01-16T00:00:00.000Z'), value: 60 },
        { timestamp: new Date('2024-01-17T00:00:00.000Z'), value: 55 },
      ],
      color: 'green',
      fillColor: 'lightgreen',
    },
  ];
  const mockOnTimeRangeChange = vitest.fn();
  const mockOnDataUpdate = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    vitest.useFakeTimers(); // Control Date.now() and setTimeout
    mockOnDataUpdate.mockResolvedValue(mockDatasets); // Default behavior for data update
  });

  afterEach(() => {
    vitest.useRealTimers(); // Restore real timers
  });

  it('renders title and time range options', () => {
    render(<TimeSeriesChart datasets={[]} title="Sales Over Time" />);
    expect(screen.getByText('Sales Over Time')).toBeInTheDocument();
    expect(screen.getByText('7D')).toBeInTheDocument();
    expect(screen.getByText('30D')).toBeInTheDocument();
  });

  it('renders InteractiveChart with initial datasets', () => {
    render(<TimeSeriesChart datasets={mockDatasets} title="Sales Over Time" />);
    expect(mockInteractiveChart).toHaveBeenCalledTimes(1);
    expect(mockInteractiveChart).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'area',
        data: {
          datasets: expect.arrayContaining([
            expect.objectContaining({ label: 'Dataset 1' }),
            expect.objectContaining({ label: 'Dataset 2' }),
          ]),
        },
      }),
      {}
    );
  });

  it('displays trend data for datasets', async () => {
    render(<TimeSeriesChart datasets={mockDatasets} title="Sales Over Time" showTrend={true} />);
    
    // Dataset 1: 100 -> 130 (+30%)
    // Dataset 2: 50 -> 55 (+10%)
    await waitFor(() => {
      expect(screen.getByText('Dataset 1:')).toBeInTheDocument();
      expect(screen.getByText('30.0%')).toBeInTheDocument();
      expect(screen.getAllByTestId('icon-trending-up').length).toBeGreaterThanOrEqual(1);

      expect(screen.getByText('Dataset 2:')).toBeInTheDocument();
      expect(screen.getByText('10.0%')).toBeInTheDocument();
    });
  });

  it('calls onTimeRangeChange and onDataUpdate when time range button is clicked', async () => {
    render(<TimeSeriesChart datasets={[]} onTimeRangeChange={mockOnTimeRangeChange} onDataUpdate={mockOnDataUpdate} />);
    
    fireEvent.click(screen.getByRole('button', { name: '30D' }));

    await waitFor(() => {
      const expectedEndDate = dateFns.endOfDay(MOCK_DATE);
      const expectedStartDate = dateFns.startOfDay(dateFns.subDays(MOCK_DATE, 30));

      expect(mockOnTimeRangeChange).toHaveBeenCalledWith('30d', expectedStartDate, expectedEndDate);
      expect(mockOnDataUpdate).toHaveBeenCalledWith('30d');
      expect(mockInteractiveChart).toHaveBeenCalledTimes(2); // Initial render + after data update
    });
  });

  it('shows loading spinner when isLoadingData is true', async () => {
    mockOnDataUpdate.mockReturnValueOnce(new Promise(() => {})); // Never resolves
    render(<TimeSeriesChart datasets={[]} onDataUpdate={mockOnDataUpdate} />);
    
    fireEvent.click(screen.getByRole('button', { name: '30D' }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument(); // Loading spinner
      expect(screen.queryByTestId('mock-interactive-chart')).not.toBeInTheDocument();
    });
  });

  it('displays custom date range inputs when "Custom" is selected', async () => {
    render(<TimeSeriesChart datasets={[]} onTimeRangeChange={mockOnTimeRangeChange} onDataUpdate={mockOnDataUpdate} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Custom' }));

    await waitFor(() => {
      expect(screen.getAllByLabelText('Date and time')[0]).toBeInTheDocument(); // datetime-local inputs
      expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
    });
  });

  it('calls onTimeRangeChange and onDataUpdate for custom range when "Apply" is clicked', async () => {
    render(<TimeSeriesChart datasets={[]} onTimeRangeChange={mockOnTimeRangeChange} onDataUpdate={mockOnDataUpdate} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Custom' }));
    
    const dateInputs = screen.getAllByLabelText('Date and time');
    fireEvent.change(dateInputs[0], { target: { value: '2024-01-01T10:00' } });
    fireEvent.change(dateInputs[1], { target: { value: '2024-01-05T15:00' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

    await waitFor(() => {
      expect(mockOnTimeRangeChange).toHaveBeenCalledWith(
        'custom',
        new Date('2024-01-01T10:00:00.000Z'),
        new Date('2024-01-05T15:00:00.000Z')
      );
      expect(mockOnDataUpdate).toHaveBeenCalledWith('custom');
    });
  });

  it('displays comparison metrics when showComparison is true', () => {
    render(<TimeSeriesChart datasets={mockDatasets} showComparison={true} />);
    expect(screen.getByText('Dataset 1')).toBeInTheDocument();
    expect(screen.getByText('Avg')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('115')).toBeInTheDocument(); // Avg for Dataset 1
    expect(screen.getByText('130')).toBeInTheDocument(); // Max for Dataset 1
    expect(screen.getByText('110')).toBeInTheDocument(); // Min for Dataset 1
  });
});
