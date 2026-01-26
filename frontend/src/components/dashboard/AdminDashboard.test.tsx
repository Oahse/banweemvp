// frontend/src/components/dashboard/AdminDashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { AdminDashboard } from './AdminDashboard';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import { CustomizableDashboard } from './widgets/CustomizableDashboard';
import { InteractiveChart } from './charts/InteractiveChart';
import { GeographicChart } from './charts/GeographicChart';
import { AdvancedTable } from './tables/AdvancedTable';

// Mock external dependencies
vitest.mock('../../hooks/useApi', () => ({
  useApi: vitest.fn(),
}));

vitest.mock('../../apis', () => ({
  AdminAPI: {
    getAdminStats: vitest.fn(),
  },
}));

vitest.mock('./widgets/CustomizableDashboard', () => ({
  CustomizableDashboard: vitest.fn(() => <div data-testid="mock-customizable-dashboard"></div>),
}));

// Mock individual widget components as they are passed as props
vitest.mock('./charts/InteractiveChart', () => ({ InteractiveChart: vitest.fn(() => null) }));
vitest.mock('./charts/GeographicChart', () => ({ GeographicChart: vitest.fn(() => null) }));
vitest.mock('./tables/AdvancedTable', () => ({ AdvancedTable: vitest.fn(() => null) }));

// Mock lucide-react icons if they cause issues, though for component props usually not needed
vitest.mock('lucide-react', () => ({
  BarChart3Icon: vitest.fn(() => <svg data-testid="icon-bar-chart" />),
  MapIcon: vitest.fn(() => <svg data-testid="icon-map" />),
  TableIcon: vitest.fn(() => <svg data-testid="icon-table" />),
  ActivityIcon: vitest.fn(() => <svg data-testid="icon-activity" />),
  PieChartIcon: vitest.fn(() => <svg data-testid="icon-pie-chart" />),
  LineChartIcon: vitest.fn(() => <svg data-testid="icon-line-chart" />),
}));


describe('AdminDashboard Component', () => {
  const mockUseApi = useApi as vitest.Mock;
  const mockGetAdminStats = AdminAPI.getAdminStats as vitest.Mock;
  const mockCustomizableDashboard = CustomizableDashboard as vitest.Mock;
  const mockExecute = vitest.fn();

  const mockStatsData = {
    total_customers: 1234,
    customers_change: 10,
    total_orders: 567,
    orders_change: -5,
    total_revenue: 98765.43,
    revenue_change: 15,
    total_products: 89,
    products_change: 20,
  };

  beforeEach(() => {
    vitest.clearAllMocks();
    mockUseApi.mockReturnValue({
      data: { data: mockStatsData },
      loading: false,
      error: null,
      execute: mockExecute,
    });
  });

  it('fetches admin stats on mount', () => {
    render(<AdminDashboard />);
    expect(mockExecute).toHaveBeenCalledTimes(1);
    expect(mockExecute).toHaveBeenCalledWith(mockGetAdminStats);
  });

  it('renders CustomizableDashboard with appropriate props when data is loaded', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(mockCustomizableDashboard).toHaveBeenCalledTimes(1);
      const { widgets, widgetTemplates, editable, onWidgetsChange, onSave } = mockCustomizableDashboard.mock.calls[0][0];

      // Verify default widgets are populated with stats data
      expect(widgets).toBeInstanceOf(Array);
      expect(widgets.length).toBeGreaterThan(0);
      expect(widgets[0]).toEqual(
        expect.objectContaining({
          id: 'total-users',
          type: 'metric',
          title: 'Total Customers',
          props: expect.objectContaining({
            value: mockStatsData.total_customers.toLocaleString(),
            label: 'Active Users',
            change: mockStatsData.customers_change,
          }),
        })
      );
      // Ensure specific widget components are passed
      expect(widgets[0].component).toBeDefined();

      // Verify widgetTemplates are passed
      expect(widgetTemplates).toBeInstanceOf(Array);
      expect(widgetTemplates.length).toBeGreaterThan(0);
      expect(widgetTemplates[0]).toEqual(
        expect.objectContaining({
          id: 'metric-template',
          type: 'metric',
          name: 'Metric Card',
          component: expect.any(Function), // Should be MetricWidget
        })
      );
      
      expect(editable).toBe(true);
      expect(onWidgetsChange).toBeInstanceOf(Function);
      expect(onSave).toBeInstanceOf(Function);
    });
  });

  it('passes loading state to metric widgets during data fetch', () => {
    mockUseApi.mockReturnValue({
      data: { data: null }, // No data yet
      loading: true,
      error: null,
      execute: mockExecute,
    });
    render(<AdminDashboard />);

    const { widgets } = mockCustomizableDashboard.mock.calls[0][0];
    expect(widgets[0].props.value).toBe('...');
  });
});
