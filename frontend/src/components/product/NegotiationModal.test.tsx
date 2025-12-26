// frontend/src/components/product/NegotiationModal.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { NegotiationModal } from './NegotiationModal';

// --- Mock external dependencies ---
vitest.mock('framer-motion', () => ({
  motion: {
    div: vitest.fn((props) => (
      <div data-testid="motion-div" {...props}>
        {props.children}
      </div>
    )),
  },
  AnimatePresence: vitest.fn((props) => <>{props.children}</>),
}));

vitest.mock('lucide-react', () => ({
  X: vitest.fn(() => <svg data-testid="icon-x" />),
  DollarSign: vitest.fn(() => <svg data-testid="icon-dollar-sign" />),
  TrendingUp: vitest.fn(() => <svg data-testid="icon-trending-up" />),
  TrendingDown: vitest.fn(() => <svg data-testid="icon-trending-down" />),
  CheckCircle: vitest.fn(() => <svg data-testid="icon-check-circle" />),
  XCircle: vitest.fn(() => <svg data-testid="icon-x-circle" />),
  Clock: vitest.fn(() => <svg data-testid="icon-clock" />),
}));

vitest.mock('react-hot-toast', () => ({
  toast: {
    success: vitest.fn(),
    error: vitest.fn(),
    info: vitest.fn(),
  },
}));

vitest.mock('../ui/Button', () => ({
  Button: vitest.fn((props) => (
    <button {...props} data-testid="mock-button">
      {props.children}
    </button>
  )),
}));
vitest.mock('../ui/Input', () => ({
  Input: vitest.fn((props) => (
    <div data-testid={`mock-input-${props.label?.replace(/\s/g, '-')}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        {...props}
        data-testid={`input-${props.label?.toLowerCase().replace(/\s/g, '-')}`}
        value={props.value || ''}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {props.error && <p data-testid={`input-error-${props.label?.toLowerCase().replace(/\s/g, '-')}`}>{props.error}</p>}
    </div>
  )),
}));

vitest.mock('../../apis/client', () => ({
  apiClient: {
    startNegotiation: vitest.fn(),
    getNegotiationState: vitest.fn(),
    stepNegotiation: vitest.fn(),
  },
}));

describe('NegotiationModal Component', () => {
  const mockProduct = {
    id: 'prod-123',
    name: 'Awesome Product',
    price: 100.00,
  };
  const mockOnClose = vitest.fn();
  const mockOnDealAccepted = vitest.fn();

  const mockApiClient = require('../../apis/client').apiClient;

  beforeEach(() => {
    vitest.clearAllMocks();
    vitest.useFakeTimers();
  });

  afterEach(() => {
    vitest.useRealTimers();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<NegotiationModal isOpen={false} product={mockProduct} onClose={mockOnClose} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders setup step initially when isOpen is true', () => {
    render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} />);
    expect(screen.getByText('Negotiate Price')).toBeInTheDocument();
    expect(screen.getByText(`Current Price: $${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByLabelText('Target Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum Price')).toBeInTheDocument();
    expect(screen.getByText('Negotiation Style')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start Negotiation' })).toBeInTheDocument();
  });

  it('validates prices before starting negotiation', () => {
    render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} />);
    const startButton = screen.getByRole('button', { name: 'Start Negotiation' });

    // Empty fields
    fireEvent.click(startButton);
    expect(toast.error).toHaveBeenCalledWith('Please enter both target and limit prices');

    // Invalid target (higher than limit)
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '90' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '80' } });
    fireEvent.click(startButton);
    expect(toast.error).toHaveBeenCalledWith('Target price cannot be higher than limit price');

    // Invalid limit (higher than product price)
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '110' } });
    fireEvent.click(startButton);
    expect(toast.error).toHaveBeenCalledWith('Limit price cannot be higher than the product price');
  });

  it('starts negotiation and transitions to negotiating step', async () => {
    mockApiClient.startNegotiation.mockResolvedValueOnce({ success: true, data: { negotiation_id: 'neg-123' } });
    mockApiClient.getNegotiationState.mockResolvedValueOnce({ success: true, data: { round: 1, message: 'Initial offer', finished: false } });

    render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '80' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Negotiation' }));

    await waitFor(() => {
      expect(mockApiClient.startNegotiation).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith('Negotiation started!');
      expect(screen.getByText('Negotiation in Progress')).toBeInTheDocument();
      expect(screen.getByText('Round 1')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Continue Negotiation' })).toBeInTheDocument();
    });
    // Check that polling is started
    expect(mockApiClient.getNegotiationState).toHaveBeenCalledWith('neg-123');
  });

  it('polls for negotiation status and updates rounds', async () => {
    mockApiClient.startNegotiation.mockResolvedValueOnce({ success: true, data: { negotiation_id: 'neg-123' } });
    mockApiClient.getNegotiationState
      .mockResolvedValueOnce({ success: true, data: { round: 1, message: 'Offer 1', finished: false } })
      .mockResolvedValueOnce({ success: true, data: { round: 2, message: 'Offer 2', finished: false } });

    render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '80' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Negotiation' }));

    await act(async () => {
      vitest.advanceTimersByTime(0); // Initial poll
    });
    expect(screen.getByText('Round 1')).toBeInTheDocument();

    await act(async () => {
      vitest.advanceTimersByTime(2000); // Trigger next poll
    });
    expect(screen.getByText('Round 2')).toBeInTheDocument();
    expect(mockApiClient.getNegotiationState).toHaveBeenCalledTimes(2);
  });

  it('advances negotiation to next round', async () => {
    mockApiClient.startNegotiation.mockResolvedValueOnce({ success: true, data: { negotiation_id: 'neg-123' } });
    mockApiClient.getNegotiationState.mockResolvedValueOnce({ success: true, data: { round: 1, message: 'Offer 1', finished: false } });
    mockApiClient.stepNegotiation.mockResolvedValueOnce({ success: true });

    render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '80' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Negotiation' }));

    await act(async () => {
      vitest.advanceTimersByTime(0); // Poll for first round
    });

    fireEvent.click(screen.getByRole('button', { name: 'Continue Negotiation' }));
    await waitFor(() => {
      expect(mockApiClient.stepNegotiation).toHaveBeenCalledWith('neg-123');
      expect(toast.info).toHaveBeenCalledWith('Negotiation round initiated...');
    });
  });

  it('transitions to completed step when negotiation finishes', async () => {
    mockApiClient.startNegotiation.mockResolvedValueOnce({ success: true, data: { negotiation_id: 'neg-123' } });
    mockApiClient.getNegotiationState
      .mockResolvedValueOnce({ success: true, data: { round: 1, message: 'Offer 1', finished: false } })
      .mockResolvedValueOnce({ success: true, data: { round: 2, message: 'Deal!', finished: true, final_price: 75.00 } });

    render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '80' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Negotiation' }));

    await act(async () => {
      vitest.advanceTimersByTime(0); // Poll 1
    });
    await act(async () => {
      vitest.advanceTimersByTime(2000); // Poll 2
    });

    await waitFor(() => {
      expect(screen.getByText('Deal Reached!')).toBeInTheDocument();
      expect(screen.getByText('Final price: $75.00')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Accept Deal' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reject Deal' })).toBeInTheDocument();
    });
  });

  it('calls onDealAccepted and closes modal when "Accept Deal" is clicked', async () => {
    mockApiClient.startNegotiation.mockResolvedValueOnce({ success: true, data: { negotiation_id: 'neg-123' } });
    mockApiClient.getNegotiationState.mockResolvedValueOnce({ success: true, data: { round: 1, message: 'Deal!', finished: true, final_price: 75.00 } });

    render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} onDealAccepted={mockOnDealAccepted} />);
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '80' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Negotiation' }));

    await act(async () => {
      vitest.advanceTimersByTime(0); // Poll to complete
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Accept Deal' }));
    await waitFor(() => {
      expect(mockOnDealAccepted).toHaveBeenCalledWith(75.00);
      expect(toast.success).toHaveBeenCalledWith('Deal accepted at $75.00!');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('closes modal and shows info toast when "Reject Deal" is clicked', async () => {
    mockApiClient.startNegotiation.mockResolvedValueOnce({ success: true, data: { negotiation_id: 'neg-123' } });
    mockApiClient.getNegotiationState.mockResolvedValueOnce({ success: true, data: { round: 1, message: 'Deal!', finished: true, final_price: 75.00 } });

    render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '80' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Negotiation' }));

    await act(async () => {
      vitest.advanceTimersByTime(0); // Poll to complete
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Reject Deal' }));
    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith('Deal rejected. You can start a new negotiation anytime.');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('stops polling when modal closes', async () => {
    mockApiClient.startNegotiation.mockResolvedValueOnce({ success: true, data: { negotiation_id: 'neg-123' } });
    mockApiClient.getNegotiationState.mockResolvedValueOnce({ success: true, data: { round: 1, message: 'Offer 1', finished: false } });

    const { unmount } = render(<NegotiationModal isOpen={true} product={mockProduct} onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText('Target Price').closest('div')!.querySelector('input')!, { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText('Maximum Price').closest('div')!.querySelector('input')!, { target: { value: '80' } });
    fireEvent.click(screen.getByRole('button', { name: 'Start Negotiation' }));

    await act(async () => {
      vitest.advanceTimersByTime(0); // Start polling
    });

    unmount(); // Unmount the component, should stop polling
    await act(async () => {
      vitest.advanceTimersByTime(2000); // Advance timer past interval
    });
    // getNegotiationState should not be called again after unmount
    expect(mockApiClient.getNegotiationState).toHaveBeenCalledTimes(1);
  });
});
