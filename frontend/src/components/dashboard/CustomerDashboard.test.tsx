// frontend/src/components/dashboard/CustomerDashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { CustomerDashboard } from './CustomerDashboard';
import { CustomizableDashboard } from './widgets/CustomizableDashboard';

// Mock all custom widget components and CustomizableDashboard
vitest.mock('./widgets/CustomizableDashboard', () => ({
  CustomizableDashboard: vitest.fn(() => <div data-testid="mock-customizable-dashboard"></div>),
}));

// Mock individual widget components passed as props
vitest.mock('./widgets/CustomerMetricWidget', () => ({
  CustomerMetricWidget: vitest.fn(() => null),
}));
vitest.mock('./widgets/OrderHistoryWidget', () => ({
  OrderHistoryWidget: vitest.fn(() => null),
}));
vitest.mock('./widgets/WishlistWidget', () => ({
  WishlistWidget: vitest.fn(() => null),
}));
vitest.mock('./widgets/SpendingAnalyticsWidget', () => ({
  SpendingAnalyticsWidget: vitest.fn(() => null),
}));
vitest.mock('./widgets/RecommendationsWidget', () => ({
  RecommendationsWidget: vitest.fn(() => null),
}));
vitest.mock('./widgets/LoyaltyPointsWidget', () => ({
  LoyaltyPointsWidget: vitest.fn(() => null),
}));

// Mock lucide-react icons used in widget templates/props if necessary
vitest.mock('lucide-react', () => ({
  ShoppingBagIcon: vitest.fn(() => <svg data-testid="icon-shopping-bag" />),
  HeartIcon: vitest.fn(() => <svg data-testid="icon-heart" />),
  CreditCardIcon: vitest.fn(() => <svg data-testid="icon-credit-card" />),
  TruckIcon: vitest.fn(() => <svg data-testid="icon-truck" />),
  StarIcon: vitest.fn(() => <svg data-testid="icon-star" />),
  GiftIcon: vitest.fn(() => <svg data-testid="icon-gift" />),
  TrendingUpIcon: vitest.fn(() => <svg data-testid="icon-trending-up" />),
  BarChart3Icon: vitest.fn(() => <svg data-testid="icon-bar-chart" />),
  TableIcon: vitest.fn(() => <svg data-testid="icon-table" />),
}));


describe('CustomerDashboard Component', () => {
  const mockCustomizableDashboard = CustomizableDashboard as vitest.Mock;

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders CustomizableDashboard with default widgets and templates', async () => {
    render(<CustomerDashboard customerId="test-customer-123" />);

    await waitFor(() => {
      expect(mockCustomizableDashboard).toHaveBeenCalledTimes(1);
      const { widgets, widgetTemplates, editable, onWidgetsChange, onSave } = mockCustomizableDashboard.mock.calls[0][0];

      // Verify default widgets are populated
      expect(widgets).toBeInstanceOf(Array);
      expect(widgets.length).toBeGreaterThan(0);
      expect(widgets[0]).toEqual(
        expect.objectContaining({
          id: 'total-orders',
          type: 'metric',
          title: 'Total Orders',
          component: expect.any(Function), // Should be CustomerMetricWidget
          props: expect.objectContaining({
            value: '24',
            label: 'Lifetime Orders',
          }),
        })
      );

      // Verify widget templates are passed
      expect(widgetTemplates).toBeInstanceOf(Array);
      expect(widgetTemplates.length).toBeGreaterThan(0);
      expect(widgetTemplates[0]).toEqual(
        expect.objectContaining({
          id: 'customer-metric-template',
          type: 'metric',
          name: 'Personal Metric',
          component: expect.any(Function), // Should be CustomerMetricWidget
        })
      );
      
      expect(editable).toBe(true);
      expect(onWidgetsChange).toBeInstanceOf(Function);
      expect(onSave).toBeInstanceOf(Function);
    });
  });

  it('passes customerId to widget initialization (if relevant, though not explicitly used in this test)', async () => {
    const testCustomerId = 'another-customer-456';
    render(<CustomerDashboard customerId={testCustomerId} />);
    // In the actual component, customerId is used in the useEffect dependency array.
    // This test ensures the component renders, and implicitly the useEffect runs.
    await waitFor(() => {
      // If any widget props were dynamic based on customerId, we'd check them here.
      // For now, just verifying the dashboard itself rendered based on the prop.
      expect(mockCustomizableDashboard).toHaveBeenCalledTimes(1);
    });
  });
});
