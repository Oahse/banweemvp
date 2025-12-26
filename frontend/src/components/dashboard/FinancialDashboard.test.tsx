// frontend/src/components/dashboard/FinancialDashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { FinancialDashboard } from './FinancialDashboard';
import { CustomizableDashboard } from './widgets/CustomizableDashboard';

// Mock all custom widget components and CustomizableDashboard
vitest.mock('./widgets/CustomizableDashboard', () => ({
  CustomizableDashboard: vitest.fn(() => <div data-testid="mock-customizable-dashboard"></div>),
}));

// Mock individual widget components passed as props
vitest.mock('./widgets/FinancialMetricWidget', () => ({
  FinancialMetricWidget: vitest.fn(() => null),
}));
vitest.mock('./charts/RevenueAnalyticsWidget', () => ({
  RevenueAnalyticsWidget: vitest.fn(() => null),
}));
vitest.mock('./charts/ExpenseBreakdownWidget', () => ({
  ExpenseBreakdownWidget: vitest.fn(() => null),
}));
vitest.mock('./charts/CashFlowWidget', () => ({
  CashFlowWidget: vitest.fn(() => null),
}));
vitest.mock('./tables/TransactionsTableWidget', () => ({
  TransactionsTableWidget: vitest.fn(() => null),
}));
vitest.mock('./charts/ProfitMarginWidget', () => ({
  ProfitMarginWidget: vitest.fn(() => null),
}));

// Mock lucide-react icons used in widget templates/props if necessary
vitest.mock('lucide-react', () => ({
  DollarSignIcon: vitest.fn(() => <svg data-testid="icon-dollar-sign" />),
  TrendingUpIcon: vitest.fn(() => <svg data-testid="icon-trending-up" />),
  TrendingDownIcon: vitest.fn(() => <svg data-testid="icon-trending-down" />),
  PieChartIcon: vitest.fn(() => <svg data-testid="icon-pie-chart" />),
  BarChart3Icon: vitest.fn(() => <svg data-testid="icon-bar-chart" />),
  CreditCardIcon: vitest.fn(() => <svg data-testid="icon-credit-card" />),
  CalculatorIcon: vitest.fn(() => <svg data-testid="icon-calculator" />),
  LineChartIcon: vitest.fn(() => <svg data-testid="icon-line-chart" />),
  TableIcon: vitest.fn(() => <svg data-testid="icon-table" />),
}));


describe('FinancialDashboard Component', () => {
  const mockCustomizableDashboard = CustomizableDashboard as vitest.Mock;

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders CustomizableDashboard with default widgets and templates', async () => {
    render(<FinancialDashboard />);

    await waitFor(() => {
      expect(mockCustomizableDashboard).toHaveBeenCalledTimes(1);
      const { widgets, widgetTemplates, editable, onWidgetsChange, onSave } = mockCustomizableDashboard.mock.calls[0][0];

      // Verify default widgets are populated
      expect(widgets).toBeInstanceOf(Array);
      expect(widgets.length).toBeGreaterThan(0);
      expect(widgets[0]).toEqual(
        expect.objectContaining({
          id: 'total-revenue',
          type: 'metric',
          title: 'Total Revenue',
          component: expect.any(Function), // Should be FinancialMetricWidget
          props: expect.objectContaining({
            value: '$284,592',
            label: 'This Month',
          }),
        })
      );

      // Verify widget templates are passed
      expect(widgetTemplates).toBeInstanceOf(Array);
      expect(widgetTemplates.length).toBeGreaterThan(0);
      expect(widgetTemplates[0]).toEqual(
        expect.objectContaining({
          id: 'financial-metric-template',
          type: 'metric',
          name: 'Financial Metric',
          component: expect.any(Function), // Should be FinancialMetricWidget
        })
      );
      
      expect(editable).toBe(true);
      expect(onWidgetsChange).toBeInstanceOf(Function);
      expect(onSave).toBeInstanceOf(Function);
    });
  });
});
