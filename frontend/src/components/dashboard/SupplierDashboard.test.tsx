// frontend/src/components/dashboard/SupplierDashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { SupplierDashboard } from './SupplierDashboard';
import { CustomizableDashboard } from './widgets/CustomizableDashboard';

// Mock all custom widget components and CustomizableDashboard
vitest.mock('./widgets/CustomizableDashboard', () => ({
  CustomizableDashboard: vitest.fn(() => <div data-testid="mock-customizable-dashboard"></div>),
}));

// Mock individual widget components passed as props
vitest.mock('./widgets/SupplierMetricWidget', () => ({
  SupplierMetricWidget: vitest.fn(() => null),
}));
vitest.mock('./charts/PerformanceChartWidget', () => ({
  PerformanceChartWidget: vitest.fn(() => null),
}));
vitest.mock('./charts/OrderAnalyticsWidget', () => ({
  OrderAnalyticsWidget: vitest.fn(() => null),
}));
vitest.mock('./tables/ProductPerformanceWidget', () => ({
  ProductPerformanceWidget: vitest.fn(() => null),
}));
vitest.mock('./widgets/InventoryAlertWidget', () => ({
  InventoryAlertWidget: vitest.fn(() => null),
}));

// Mock lucide-react icons used in widget templates/props if necessary
vitest.mock('lucide-react', () => ({
  PackageIcon: vitest.fn(() => <svg data-testid="icon-package" />),
  DollarSignIcon: vitest.fn(() => <svg data-testid="icon-dollar-sign" />),
  TrendingUpIcon: vitest.fn(() => <svg data-testid="icon-trending-up" />),
  StarIcon: vitest.fn(() => <svg data-testid="icon-star" />),
  ShoppingCartIcon: vitest.fn(() => <svg data-testid="icon-shopping-cart" />),
  BarChart3Icon: vitest.fn(() => <svg data-testid="icon-bar-chart" />),
  LineChartIcon: vitest.fn(() => <svg data-testid="icon-line-chart" />),
  TableIcon: vitest.fn(() => <svg data-testid="icon-table" />),
  AlertTriangleIcon: vitest.fn(() => <svg data-testid="icon-alert-triangle" />),
}));


describe('SupplierDashboard Component', () => {
  const mockCustomizableDashboard = CustomizableDashboard as vitest.Mock;

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders CustomizableDashboard with default widgets and templates', async () => {
    render(<SupplierDashboard supplierId="test-supplier-123" />);

    await waitFor(() => {
      expect(mockCustomizableDashboard).toHaveBeenCalledTimes(1);
      const { widgets, widgetTemplates, editable, onWidgetsChange, onSave } = mockCustomizableDashboard.mock.calls[0][0];

      // Verify default widgets are populated
      expect(widgets).toBeInstanceOf(Array);
      expect(widgets.length).toBeGreaterThan(0);
      expect(widgets[0]).toEqual(
        expect.objectContaining({
          id: 'total-products',
          type: 'metric',
          title: 'Total Products',
          component: expect.any(Function), // Should be SupplierMetricWidget
          props: expect.objectContaining({
            value: '47',
            label: 'Active Listings',
          }),
        })
      );

      // Verify widget templates are passed
      expect(widgetTemplates).toBeInstanceOf(Array);
      expect(widgetTemplates.length).toBeGreaterThan(0);
      expect(widgetTemplates[0]).toEqual(
        expect.objectContaining({
          id: 'supplier-metric-template',
          name: 'Business Metric',
          component: expect.any(Function), // Should be SupplierMetricWidget
        })
      );
      
      expect(editable).toBe(true);
      expect(onWidgetsChange).toBeInstanceOf(Function);
      expect(onSave).toBeInstanceOf(Function);
    });
  });

  it('passes supplierId to widget initialization (if relevant, though not explicitly used in this test)', async () => {
    const testSupplierId = 'another-supplier-456';
    render(<SupplierDashboard supplierId={testSupplierId} />);
    // In the actual component, supplierId is used in the useEffect dependency array.
    // This test ensures the component renders, and implicitly the useEffect runs.
    await waitFor(() => {
      // If any widget props were dynamic based on supplierId, we'd check them here.
      // For now, just verifying the dashboard itself rendered based on the prop.
      expect(mockCustomizableDashboard).toHaveBeenCalledTimes(1);
    });
  });
});
