// frontend/src/components/dashboard/widgets/RealTimeWidget.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { RealTimeWidget } from './RealTimeWidget';
import { InteractiveChart } from '../charts/InteractiveChart';

// --- Mock external dependencies ---
vitest.mock('../charts/InteractiveChart', () => ({
  InteractiveChart: vitest.fn((props) => (
    <div data-testid="mock-interactive-chart">Mock Chart</div>
  )),
}));

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  ActivityIcon: vitest.fn(() => <svg data-testid="icon-activity" />),
  WifiIcon: vitest.fn(() => <svg data-testid="icon-wifi" />),
  WifiOffIcon: vitest.fn(() => <svg data-testid="icon-wifi-off" />),
  PauseIcon: vitest.fn(() => <svg data-testid="icon-pause" />),
  PlayIcon: vitest.fn(() => <svg data-testid="icon-play" />),
  SettingsIcon: vitest.fn(() => <svg data-testid="icon-settings" />),
  AlertCircleIcon: vitest.fn(() => <svg data-testid="icon-alert-circle" />),
}));

// Mock global fetch
const mockFetch = vitest.fn();
vitest.stubGlobal('fetch', mockFetch);

// Mock WebSocket
const mockWebSocketInstance = {
  send: vitest.fn(),
  close: vitest.fn(),
  onopen: vitest.fn(),
  onmessage: vitest.fn(),
  onclose: vitest.fn(),
  onerror: vitest.fn(),
};
const MockWebSocket = vitest.fn(() => mockWebSocketInstance);
vitest.stubGlobal('WebSocket', MockWebSocket);

describe('RealTimeWidget Component', () => {
  const mockInteractiveChart = InteractiveChart as vitest.Mock;
  const mockOnDataUpdate = vitest.fn();
  const mockOnThresholdExceeded = vitest.fn();
  
  const POLLING_DATA_SOURCE = 'http://mock-api.com/data';
  const WEBSOCKET_DATA_SOURCE = 'ws://mock-ws.com/data';

  beforeEach(() => {
    vitest.clearAllMocks();
    vitest.useFakeTimers();
    // Default mock behavior for fetch
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ timestamp: Date.now(), value: Math.random() * 100 }),
    });

    // Default mock behavior for WebSocket
    mockWebSocketInstance.send.mockClear();
    mockWebSocketInstance.close.mockClear();
    mockWebSocketInstance.onopen = vitest.fn();
    mockWebSocketInstance.onmessage = vitest.fn();
    mockWebSocketInstance.onclose = vitest.fn();
    mockWebSocketInstance.onerror = vitest.fn();
    MockWebSocket.mockClear();
  });

  afterEach(() => {
    vitest.useRealTimers();
  });

  it('renders title and initial "Waiting for data..." message', () => {
    render(<RealTimeWidget title="Live Metrics" dataSource={POLLING_DATA_SOURCE} />);
    expect(screen.getByText('Live Metrics')).toBeInTheDocument();
    expect(screen.getByText('Waiting for data...')).toBeInTheDocument();
    expect(screen.getByText('Connecting...')).toBeInTheDocument();
  });

  describe('Polling Data Source', () => {
    it('fetches data on interval and updates chart', async () => {
      const initialValue = { timestamp: Date.now(), value: 10 };
      const nextValue = { timestamp: Date.now() + 1000, value: 20 };
      mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(initialValue) });
      mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(nextValue) });
      
      render(<RealTimeWidget title="Polling Data" dataSource={POLLING_DATA_SOURCE} updateInterval={1000} onDataUpdate={mockOnDataUpdate} />);
      
      // Initial fetch
      await act(async () => {
        vitest.advanceTimersByTime(0); // Allow promises to resolve
      });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Connected')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument(); // Current value

      // Second fetch after interval
      await act(async () => {
        vitest.advanceTimersByTime(1000);
      });
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(screen.getByText('20')).toBeInTheDocument(); // Current value
      expect(screen.getByText('↗')).toBeInTheDocument(); // Trend up
      
      expect(mockInteractiveChart).toHaveBeenCalledTimes(2); // Initial render + after first update
      expect(mockOnDataUpdate).toHaveBeenCalledTimes(2);
    });

    it('handles polling errors and attempts reconnect', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ timestamp: Date.now(), value: 30 }) }); // Successful reconnect

      render(<RealTimeWidget title="Polling Error" dataSource={POLLING_DATA_SOURCE} updateInterval={1000} />);
      
      await act(async () => {
        vitest.advanceTimersByTime(0); // Initial fetch fails
      });
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Polling error: Network error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();

      await act(async () => {
        vitest.advanceTimersByTime(1000 * 2 ** 0); // Reconnect attempt 1 (1s)
      });
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(screen.getByText('Connected')).toBeInTheDocument();
      expect(screen.queryByText('Polling error: Network error')).not.toBeInTheDocument();
    });
  });

  describe('WebSocket Data Source', () => {
    it('connects via WebSocket and updates chart', async () => {
      render(<RealTimeWidget title="WebSocket Data" dataSource={WEBSOCKET_DATA_SOURCE} onDataUpdate={mockOnDataUpdate} />);
      
      expect(MockWebSocket).toHaveBeenCalledWith(WEBSOCKET_DATA_SOURCE);
      expect(screen.getByText('Connecting...')).toBeInTheDocument();

      // Simulate connection open
      act(() => {
        mockWebSocketInstance.onopen();
      });
      expect(screen.getByText('Connected')).toBeInTheDocument();

      // Simulate message received
      const wsData1 = { timestamp: Date.now(), value: 10 };
      act(() => {
        mockWebSocketInstance.onmessage({ data: JSON.stringify(wsData1) });
      });
      expect(mockInteractiveChart).toHaveBeenCalledTimes(1);
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(mockOnDataUpdate).toHaveBeenCalledTimes(1);

      const wsData2 = { timestamp: Date.now() + 1000, value: 20 };
      act(() => {
        mockWebSocketInstance.onmessage({ data: JSON.stringify(wsData2) });
      });
      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('↗')).toBeInTheDocument(); // Trend up
      expect(mockOnDataUpdate).toHaveBeenCalledTimes(2);
    });

    it('handles WebSocket errors', async () => {
      render(<RealTimeWidget title="WebSocket Error" dataSource={WEBSOCKET_DATA_SOURCE} />);
      
      act(() => {
        mockWebSocketInstance.onerror(new Event('error'));
      });
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('WebSocket connection error')).toBeInTheDocument();
    });
  });

  it('pauses and resumes data updates', async () => {
    const initialValue = { timestamp: Date.now(), value: 10 };
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(initialValue) });

    render(<RealTimeWidget title="Pause/Resume" dataSource={POLLING_DATA_SOURCE} updateInterval={1000} />);
    
    await act(async () => {
      vitest.advanceTimersByTime(0); // Initial fetch
    });
    expect(screen.getByText('Connected')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    // Pause
    fireEvent.click(screen.getByTitle('Pause'));
    expect(screen.getByText('Paused')).toBeInTheDocument();
    expect(mockWebSocketInstance.close).toHaveBeenCalledTimes(1); // If WS, it closes
    expect(mockFetch).toHaveBeenCalledTimes(1); // No new fetches while paused

    await act(async () => {
      vitest.advanceTimersByTime(1000); // Advance time, no new data should come
    });
    expect(mockFetch).toHaveBeenCalledTimes(1); // Still only 1 fetch

    // Resume
    fireEvent.click(screen.getByTitle('Resume'));
    expect(screen.getByText('Connecting...')).toBeInTheDocument(); // Reconnects
    expect(mockFetch).toHaveBeenCalledTimes(2); // New fetch
    await act(async () => {
      vitest.advanceTimersByTime(0); // Allow fetch promise to resolve
    });
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });

  it('triggers onThresholdExceeded callback', async () => {
    const data1 = { timestamp: Date.now(), value: 50 };
    const data2 = { timestamp: Date.now() + 1000, value: 70 }; // Exceeds warning (60)
    const data3 = { timestamp: Date.now() + 2000, value: 90 }; // Exceeds critical (80)

    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(data1) });
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(data2) });
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(data3) });

    render(
      <RealTimeWidget
        title="Thresholds"
        dataSource={POLLING_DATA_SOURCE}
        updateInterval={1000}
        thresholds={{ warning: 60, critical: 80 }}
        onThresholdExceeded={mockOnThresholdExceeded}
      />
    );

    await act(async () => { vitest.advanceTimersByTime(0); }); // Data 1
    expect(mockOnThresholdExceeded).not.toHaveBeenCalled();

    await act(async () => { vitest.advanceTimersByTime(1000); }); // Data 2
    expect(mockOnThresholdExceeded).toHaveBeenCalledWith('warning', 70);

    await act(async () => { vitest.advanceTimersByTime(1000); }); // Data 3
    expect(mockOnThresholdExceeded).toHaveBeenCalledWith('critical', 90);
  });
});
