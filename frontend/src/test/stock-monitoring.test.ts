import { stockMonitor, StockMonitoringService } from '../services/stockMonitoring';

describe('Stock Monitoring Service', () => {
  let service: StockMonitoringService;

  beforeEach(() => {
    service = StockMonitoringService.getInstance();
  });

  test('should set stock thresholds correctly', () => {
    const variantId = 'test-variant-1';
    const thresholds = {
      low_stock_threshold: 10,
      critical_threshold: 5,
      out_of_stock_threshold: 0,
      email_notifications_enabled: true
    };

    service.setStockThreshold(variantId, thresholds);
    const threshold = service.getThreshold(variantId);

    expect(threshold).toBeDefined();
    expect(threshold?.low_stock_threshold).toBe(10);
    expect(threshold?.critical_threshold).toBe(5);
    expect(threshold?.out_of_stock_threshold).toBe(0);
    expect(threshold?.email_notifications_enabled).toBe(true);
  });

  test('should update stock and create alerts', () => {
    const variantId = 'test-variant-2';
    
    // Set thresholds
    service.setStockThreshold(variantId, {
      low_stock_threshold: 10,
      critical_threshold: 5,
      out_of_stock_threshold: 0,
      email_notifications_enabled: true
    });

    // Update stock to trigger low stock alert
    const alerts = service.updateStock(variantId, 8, 'Test Product', 'Test Variant');
    
    expect(alerts).toHaveLength(1);
    expect(alerts[0].alert_type).toBe('low_stock');
    
    const status = service.getStockStatus(variantId);
    expect(status.status).toBe('low_stock');
  });

  test('should handle out of stock correctly', () => {
    const variantId = 'test-variant-3';
    
    // Set thresholds
    service.setStockThreshold(variantId, {
      low_stock_threshold: 10,
      critical_threshold: 5,
      out_of_stock_threshold: 0,
      email_notifications_enabled: true
    });

    // First set some stock, then update to out of stock to trigger alert
    service.updateStock(variantId, 5, 'Test Product', 'Test Variant');
    const alerts = service.updateStock(variantId, 0, 'Test Product', 'Test Variant');
    
    expect(alerts).toHaveLength(1);
    expect(alerts[0].alert_type).toBe('out_of_stock');
    
    const status = service.getStockStatus(variantId);
    expect(status.status).toBe('out_of_stock');
    expect(status.message).toBe('Out of stock');
  });

  test('should handle bulk stock updates', () => {
    const updates = [
      {
        variant_id: 'bulk-1',
        new_stock: 3,
        product_name: 'Bulk Product 1',
        variant_name: 'Variant 1'
      },
      {
        variant_id: 'bulk-2',
        new_stock: 0,
        product_name: 'Bulk Product 2',
        variant_name: 'Variant 2'
      }
    ];

    // Set thresholds and initial stock for both variants
    updates.forEach(update => {
      service.setStockThreshold(update.variant_id, {
        low_stock_threshold: 10,
        critical_threshold: 5,
        out_of_stock_threshold: 0,
        email_notifications_enabled: true
      });
      // Set initial stock to trigger status change
      service.updateStock(update.variant_id, 15, update.product_name, update.variant_name);
    });

    const allAlerts = service.bulkUpdateStock(updates);
    
    expect(allAlerts).toHaveLength(2);
    expect(allAlerts.find(a => a.variant_id === 'bulk-1')?.alert_type).toBe('critical');
    expect(allAlerts.find(a => a.variant_id === 'bulk-2')?.alert_type).toBe('out_of_stock');
  });

  test('should acknowledge alerts', () => {
    const variantId = 'test-variant-4';
    
    service.setStockThreshold(variantId, {
      low_stock_threshold: 10,
      critical_threshold: 5,
      out_of_stock_threshold: 0,
      email_notifications_enabled: true
    });

    const alerts = service.updateStock(variantId, 3, 'Test Product', 'Test Variant');
    const alertId = alerts[0].id;

    // Check unacknowledged alerts
    const unacknowledged = service.getUnacknowledgedAlerts();
    expect(unacknowledged.some(a => a.id === alertId)).toBe(true);

    // Acknowledge the alert
    service.acknowledgeAlert(alertId);

    // Check that alert is now acknowledged
    const updatedUnacknowledged = service.getUnacknowledgedAlerts();
    expect(updatedUnacknowledged.some(a => a.id === alertId)).toBe(false);
  });
});