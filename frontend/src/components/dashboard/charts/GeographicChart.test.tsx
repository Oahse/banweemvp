// frontend/src/components/dashboard/charts/GeographicChart.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { GeographicChart } from './GeographicChart';

// Mock Leaflet and react-leaflet completely
vitest.mock('leaflet', () => ({
  ...vitest.importActual('leaflet'), // Import and retain default exports if any
  Icon: {
    Default: {
      mergeOptions: vitest.fn(),
      prototype: {
        _getIconUrl: vitest.fn(),
      },
    },
  },
}));

vitest.mock('react-leaflet', () => ({
  MapContainer: vitest.fn(({ children, ...props }) => <div data-testid="mock-map-container" {...props}>{children}</div>),
  TileLayer: vitest.fn(() => <div data-testid="mock-tile-layer"></div>),
  CircleMarker: vitest.fn(({ children, eventHandlers, ...props }) => (
    <div data-testid="mock-circle-marker" onClick={eventHandlers?.click} {...props}>{children}</div>
  )),
  Popup: vitest.fn(({ children }) => <div data-testid="mock-popup">{children}</div>),
  Tooltip: vitest.fn(({ children }) => <div data-testid="mock-tooltip">{children}</div>),
}));

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  GlobeIcon: vitest.fn(() => <svg data-testid="icon-globe" />),
  MapIcon: vitest.fn(() => <svg data-testid="icon-map" />),
  ListIcon: vitest.fn(() => <svg data-testid="icon-list" />),
  BarChart3Icon: vitest.fn(() => <svg data-testid="icon-bar-chart" />),
}));

describe('GeographicChart Component', () => {
  const mockData = [
    { country: 'Country A', countryCode: 'CA', coordinates: [0, 0] as [number, number], value: 100, percentage: 10, label: 'Label A', additionalData: { info: 'abc' } },
    { country: 'Country B', countryCode: 'CB', coordinates: [10, 10] as [number, number], value: 200, percentage: 20, label: 'Label B' },
    { country: 'Country C', countryCode: 'CC', coordinates: [20, 20] as [number, number], value: 50, percentage: 5, label: 'Label C' },
  ];
  const mockOnCountryClick = vitest.fn();
  const mockOnViewModeChange = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders loading skeleton when loading is true', () => {
    render(<GeographicChart data={[]} loading={true} />);
    expect(screen.getByRole('status', { name: 'Loading content...' })).toBeInTheDocument(); // generic skeleton
    expect(screen.queryByTestId('mock-map-container')).not.toBeInTheDocument();
  });

  it('renders title and view mode buttons', () => {
    render(<GeographicChart data={mockData} title="Global Distribution" />);
    expect(screen.getByText('Global Distribution')).toBeInTheDocument();
    expect(screen.getByTitle('Map View')).toBeInTheDocument();
    expect(screen.getByTitle('List View')).toBeInTheDocument();
    expect(screen.getByTitle('Chart View')).toBeInTheDocument();
  });

  it('switches view modes correctly', () => {
    render(<GeographicChart data={mockData} onViewModeChange={mockOnViewModeChange} />);
    
    // Default is map view
    expect(screen.getByTestId('mock-map-container')).toBeInTheDocument();
    
    fireEvent.click(screen.getByTitle('List View'));
    expect(screen.getByText('Country A')).toBeInTheDocument(); // List view content
    expect(screen.queryByTestId('mock-map-container')).not.toBeInTheDocument();
    expect(mockOnViewModeChange).toHaveBeenCalledWith('list');

    fireEvent.click(screen.getByTitle('Chart View'));
    expect(screen.getByText('Country A')).toBeInTheDocument(); // Chart view content
    expect(screen.queryByText('List View')).not.toBeInTheDocument();
    expect(mockOnViewModeChange).toHaveBeenCalledWith('chart');
  });

  describe('List View', () => {
    it('renders sorted data in list view', () => {
      render(<GeographicChart data={mockData} viewMode="list" />);
      const listItems = screen.getAllByText(/Country/);
      // Data is sorted by value descending
      expect(listItems[0]).toHaveTextContent('Country B');
      expect(listItems[1]).toHaveTextContent('Country A');
      expect(listItems[2]).toHaveTextContent('Country C');
    });

    it('calls onCountryClick when a list item is clicked', () => {
      render(<GeographicChart data={mockData} viewMode="list" onCountryClick={mockOnCountryClick} />);
      fireEvent.click(screen.getByText('Country A'));
      expect(mockOnCountryClick).toHaveBeenCalledWith(mockData[0]);
    });

    it('displays percentages in list view', () => {
      render(<GeographicChart data={mockData} viewMode="list" showPercentages={true} />);
      expect(screen.getByText('10.0%')).toBeInTheDocument();
      expect(screen.getByText('20.0%')).toBeInTheDocument();
    });
  });

  describe('Chart View', () => {
    it('renders sorted data in chart view as bars', () => {
      render(<GeographicChart data={mockData} viewMode="chart" />);
      const chartItems = screen.getAllByText(/Country/);
      expect(chartItems[0]).toHaveTextContent('Country B');
      expect(chartItems[1]).toHaveTextContent('Country A');
      expect(chartItems[2]).toHaveTextContent('Country C');
      expect(screen.getByText('200')).toBeInTheDocument(); // Value in chart bar
    });

    it('displays percentages in chart view', () => {
      render(<GeographicChart data={mockData} viewMode="chart" showPercentages={true} />);
      expect(screen.getByText('10.0%')).toBeInTheDocument();
      expect(screen.getByText('20.0%')).toBeInTheDocument();
    });
  });

  describe('Map View (Mocked)', () => {
    it('renders MapContainer and CircleMarkers with correct props', () => {
      const mockMapContainer = require('react-leaflet').MapContainer;
      const mockCircleMarker = require('react-leaflet').CircleMarker;

      render(<GeographicChart data={mockData} viewMode="map" />);

      expect(mockMapContainer).toHaveBeenCalledTimes(1);
      expect(mockMapContainer).toHaveBeenCalledWith(expect.objectContaining({
        center: [20, 0],
        zoom: 2,
      }), {});

      expect(mockCircleMarker).toHaveBeenCalledTimes(mockData.length);
      expect(mockCircleMarker).toHaveBeenCalledWith(expect.objectContaining({
        center: mockData[0].coordinates,
        radius: expect.any(Number),
        fillColor: expect.any(String),
      }), {});
    });

    it('calls onCountryClick when a CircleMarker is "clicked"', () => {
      const mockCircleMarker = require('react-leaflet').CircleMarker;
      render(<GeographicChart data={mockData} viewMode="map" onCountryClick={mockOnCountryClick} />);

      // Simulate a click on the first CircleMarker (Country A)
      const firstCircleMarkerCall = mockCircleMarker.mock.calls.find(call => call[0].center === mockData[0].coordinates);
      firstCircleMarkerCall[0].eventHandlers.click();

      expect(mockOnCountryClick).toHaveBeenCalledWith(mockData[0]);
    });

    it('displays tooltips with correct content', () => {
      const mockTooltip = require('react-leaflet').Tooltip;
      render(<GeographicChart data={mockData} viewMode="map" showTooltips={true} />);

      // Check if Tooltip is rendered for each marker and contains expected text
      expect(mockTooltip).toHaveBeenCalledTimes(mockData.length);
      expect(mockTooltip).toHaveBeenCalledWith(expect.objectContaining({
        children: expect.objectContaining({
          props: expect.objectContaining({
            children: expect.arrayContaining([
              expect.objectContaining({ props: { children: 'Country A' } }),
              expect.objectContaining({ props: { children: 'Value: 100' } }),
              expect.objectContaining({ props: { children: 'Percentage: 10.0%' } }),
            ]),
          }),
        }),
      }), {});
    });

    it('does not display tooltips when showTooltips is false', () => {
      const mockTooltip = require('react-leaflet').Tooltip;
      render(<GeographicChart data={mockData} viewMode="map" showTooltips={false} />);
      expect(mockTooltip).not.toHaveBeenCalled();
    });
  });
});
