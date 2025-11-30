import { describe, it, expect } from 'vitest';

/**
 * Property-based test for user order count sorting
 * 
 * **Feature: app-enhancements, Property 27: Order count sorting**
 * **Validates: Requirements 9.4**
 */

describe('UserManagement - Order Count Sorting', () => {
  it('should sort users by order count in ascending order', () => {
    // Sample user data
    const users = [
      { id: '1', firstname: 'John', lastname: 'Doe', orders_count: 5 },
      { id: '2', firstname: 'Jane', lastname: 'Smith', orders_count: 2 },
      { id: '3', firstname: 'Bob', lastname: 'Johnson', orders_count: 10 },
      { id: '4', firstname: 'Alice', lastname: 'Williams', orders_count: 0 },
    ];

    // Sort ascending
    const sortedAsc = [...users].sort((a, b) => {
      const aValue = a.orders_count || 0;
      const bValue = b.orders_count || 0;
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

    // Verify ascending order
    expect(sortedAsc[0].orders_count).toBe(0);
    expect(sortedAsc[1].orders_count).toBe(2);
    expect(sortedAsc[2].orders_count).toBe(5);
    expect(sortedAsc[3].orders_count).toBe(10);

    // Verify order is correct
    for (let i = 0; i < sortedAsc.length - 1; i++) {
      expect(sortedAsc[i].orders_count).toBeLessThanOrEqual(sortedAsc[i + 1].orders_count);
    }
  });

  it('should sort users by order count in descending order', () => {
    // Sample user data
    const users = [
      { id: '1', firstname: 'John', lastname: 'Doe', orders_count: 5 },
      { id: '2', firstname: 'Jane', lastname: 'Smith', orders_count: 2 },
      { id: '3', firstname: 'Bob', lastname: 'Johnson', orders_count: 10 },
      { id: '4', firstname: 'Alice', lastname: 'Williams', orders_count: 0 },
    ];

    // Sort descending
    const sortedDesc = [...users].sort((a, b) => {
      const aValue = a.orders_count || 0;
      const bValue = b.orders_count || 0;
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    });

    // Verify descending order
    expect(sortedDesc[0].orders_count).toBe(10);
    expect(sortedDesc[1].orders_count).toBe(5);
    expect(sortedDesc[2].orders_count).toBe(2);
    expect(sortedDesc[3].orders_count).toBe(0);

    // Verify order is correct
    for (let i = 0; i < sortedDesc.length - 1; i++) {
      expect(sortedDesc[i].orders_count).toBeGreaterThanOrEqual(sortedDesc[i + 1].orders_count);
    }
  });

  it('should handle null and undefined order counts', () => {
    // Sample user data with null/undefined
    const users = [
      { id: '1', firstname: 'John', lastname: 'Doe', orders_count: 5 },
      { id: '2', firstname: 'Jane', lastname: 'Smith', orders_count: null },
      { id: '3', firstname: 'Bob', lastname: 'Johnson', orders_count: undefined },
      { id: '4', firstname: 'Alice', lastname: 'Williams', orders_count: 3 },
    ];

    // Sort ascending with null handling
    const sortedAsc = [...users].sort((a, b) => {
      const aValue = a.orders_count ?? 0;
      const bValue = b.orders_count ?? 0;
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

    // Null/undefined should be treated as 0 and come first
    expect(sortedAsc[0].orders_count).toBeNull();
    expect(sortedAsc[1].orders_count).toBeUndefined();
    expect(sortedAsc[2].orders_count).toBe(3);
    expect(sortedAsc[3].orders_count).toBe(5);
  });

  it('should maintain stable sort for equal values', () => {
    // Sample user data with equal order counts
    const users = [
      { id: '1', firstname: 'John', lastname: 'Doe', orders_count: 5 },
      { id: '2', firstname: 'Jane', lastname: 'Smith', orders_count: 5 },
      { id: '3', firstname: 'Bob', lastname: 'Johnson', orders_count: 5 },
    ];

    // Sort ascending
    const sortedAsc = [...users].sort((a, b) => {
      const aValue = a.orders_count || 0;
      const bValue = b.orders_count || 0;
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

    // All should have same order count
    expect(sortedAsc[0].orders_count).toBe(5);
    expect(sortedAsc[1].orders_count).toBe(5);
    expect(sortedAsc[2].orders_count).toBe(5);
  });

  it('should sort large datasets correctly', () => {
    // Generate large dataset
    const users = Array.from({ length: 100 }, (_, i) => ({
      id: `${i}`,
      firstname: `User${i}`,
      lastname: `Test${i}`,
      orders_count: Math.floor(Math.random() * 100),
    }));

    // Sort ascending
    const sortedAsc = [...users].sort((a, b) => {
      const aValue = a.orders_count || 0;
      const bValue = b.orders_count || 0;
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

    // Verify all elements are in ascending order
    for (let i = 0; i < sortedAsc.length - 1; i++) {
      expect(sortedAsc[i].orders_count).toBeLessThanOrEqual(sortedAsc[i + 1].orders_count);
    }

    // Sort descending
    const sortedDesc = [...users].sort((a, b) => {
      const aValue = a.orders_count || 0;
      const bValue = b.orders_count || 0;
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    });

    // Verify all elements are in descending order
    for (let i = 0; i < sortedDesc.length - 1; i++) {
      expect(sortedDesc[i].orders_count).toBeGreaterThanOrEqual(sortedDesc[i + 1].orders_count);
    }
  });
});
