// frontend/src/components/ui/VirtualScrolling.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { VirtualScrolling } from './VirtualScrolling';

describe('VirtualScrolling Component', () => {
  const mockItems = Array.from({ length: 100 }, (_, i) => ({ id: `item-${i}`, value: `Item ${i}` }));
  const itemHeight = 30;
  const containerHeight = 150; // Should show 5 items (150/30)
  const overscan = 2; // 5 visible + 2 overscan top + 2 overscan bottom = 9 items max rendered

  const mockRenderItem = vitest.fn((item) => <div data-testid={`rendered-item-${item.id}`}>{item.value}</div>);
  const mockOnScroll = vitest.fn();

  let scrollableContainer: HTMLDivElement;

  beforeEach(() => {
    vitest.clearAllMocks();

    // Create a mock DOM element for the scroll container
    scrollableContainer = document.createElement('div');
    scrollableContainer.style.height = `${containerHeight}px`;
    scrollableContainer.style.overflow = 'auto';
    document.body.appendChild(scrollableContainer); // Append to body for events to work

    // Mock useRef to return our controlled scrollableContainer
    vitest.spyOn(React, 'useRef').mockReturnValue({ current: scrollableContainer });
  });

  afterEach(() => {
    vitest.restoreAllMocks();
    document.body.removeChild(scrollableContainer); // Clean up
  });

  it('renders loading component when loading is true', () => {
    render(
      <VirtualScrolling
        items={mockItems}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={mockRenderItem}
        loading={true}
        loadingComponent={<div data-testid="custom-loading">Custom Loading...</div>}
      />,
      { container: scrollableContainer.parentElement! } // Render into parent of mock ref
    );
    expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('rendered-item-item-0')).not.toBeInTheDocument();
  });

  it('renders default loading message when loading is true and no custom component', () => {
    render(
      <VirtualScrolling
        items={mockItems}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={mockRenderItem}
        loading={true}
      />,
      { container: scrollableContainer.parentElement! }
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders empty component when items are empty', () => {
    render(
      <VirtualScrolling
        items={[]}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={mockRenderItem}
        emptyComponent={<div data-testid="custom-empty">No items found</div>}
      />,
      { container: scrollableContainer.parentElement! }
    );
    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('rendered-item-item-0')).not.toBeInTheDocument();
  });

  it('renders default empty message when items are empty and no custom component', () => {
    render(
      <VirtualScrolling
        items={[]}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={mockRenderItem}
      />,
      { container: scrollableContainer.parentElement! }
    );
    expect(screen.getByText('No items to display')).toBeInTheDocument();
  });

  it('renders only visible and overscan items initially', () => {
    render(
      <VirtualScrolling
        items={mockItems}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={mockRenderItem}
        overscan={overscan}
      />,
      { container: scrollableContainer.parentElement! }
    );

    // visibleStart = 0, visibleEnd = 4
    // start = max(0, 0-overscan) = 0
    // end = min(items.length - 1, visibleEnd + overscan) = min(99, 4+2) = 6
    // So, items 0 to 6 (7 items) should be rendered
    for (let i = 0; i <= 6; i++) {
      expect(screen.getByTestId(`rendered-item-item-${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId('rendered-item-item-7')).not.toBeInTheDocument();
    expect(mockRenderItem).toHaveBeenCalledTimes(7);
  });

  it('updates rendered items and transformY on scroll', async () => {
    render(
      <VirtualScrolling
        items={mockItems}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={mockRenderItem}
        overscan={overscan}
        onScroll={mockOnScroll}
      />,
      { container: scrollableContainer.parentElement! }
    );

    // Simulate scrolling down by 90px (3 items)
    act(() => {
      scrollableContainer.scrollTop = 90;
      fireEvent.scroll(scrollableContainer);
    });

    // visibleStart = 90 / 30 = 3
    // visibleEnd = min(3 + 5 - 1, 99) = 7
    // start = max(0, 3-2) = 1
    // end = min(99, 7+2) = 9
    // Expected rendered range: items 1 to 9 (9 items)
    
    await waitFor(() => {
      expect(screen.queryByTestId('rendered-item-item-0')).not.toBeInTheDocument(); // Item 0 should be gone
      for (let i = 1; i <= 9; i++) {
        expect(screen.getByTestId(`rendered-item-item-${i}`)).toBeInTheDocument();
      }
      expect(screen.queryByTestId('rendered-item-item-10')).not.toBeInTheDocument();
      
      const transformedDiv = screen.getByTestId(`rendered-item-item-1`).closest('div')!.parentElement;
      expect(transformedDiv).toHaveStyle(`transform: translateY(${1 * itemHeight}px)`);
      expect(mockOnScroll).toHaveBeenCalledWith(90);
    });
  });

  it('calls renderItem for each visible item', () => {
    render(
      <VirtualScrolling
        items={mockItems}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={mockRenderItem}
        overscan={0} // No overscan for simpler count
      />,
      { container: scrollableContainer.parentElement! }
    );
    // Visible items: 5
    expect(mockRenderItem).toHaveBeenCalledTimes(5);
    expect(mockRenderItem).toHaveBeenCalledWith(mockItems[0]);
    expect(mockRenderItem).toHaveBeenCalledWith(mockItems[4]);
    expect(mockRenderItem).not.toHaveBeenCalledWith(mockItems[5]);
  });
});