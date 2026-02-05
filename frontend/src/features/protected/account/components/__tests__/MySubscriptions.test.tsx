import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MySubscriptions } from '../MySubscriptions';
import { SubscriptionProvider } from '../../../contexts/SubscriptionContext';
import { AuthProvider } from '../../../contexts/AuthContext';

// Mock the APIs
jest.mock('../../../apis/subscription', () => ({
  createSubscription: jest.fn(),
  addProductsToSubscription: jest.fn(),
  removeProductsFromSubscription: jest.fn(),
  updateSubscription: jest.fn(),
  deleteSubscription: jest.fn(),
}));

jest.mock('../../../apis/products', () => ({
  ProductsAPI: {
    getProducts: jest.fn().mockResolvedValue({
      data: {
        products: [
          {
            id: 1,
            name: 'Test Product',
            price: 29.99,
            currency: 'USD',
            image: 'test-image.jpg'
          }
        ]
      }
    })
  }
}));

const mockSubscriptions = [
  {
    id: 1,
    name: 'Monthly Wellness Box',
    status: 'active',
    billing_cycle: 'monthly',
    price: 39.99,
    currency: 'USD',
    next_billing_date: '2024-02-01',
    products: [
      {
        id: 1,
        name: 'Organic Shea Butter',
        image: 'shea-butter.jpg'
      }
    ]
  }
];

const MockProviders = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <SubscriptionProvider>
        {children}
      </SubscriptionProvider>
    </AuthProvider>
  </BrowserRouter>
);

// Mock the subscription context
const mockSubscriptionContext = {
  subscriptions: mockSubscriptions,
  loading: false,
  error: null,
  refreshSubscriptions: jest.fn(),
};

jest.mock('../../../contexts/SubscriptionContext', () => ({
  useSubscription: () => mockSubscriptionContext,
  SubscriptionProvider: ({ children }) => children,
}));

describe('MySubscriptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders subscription list correctly', () => {
    render(
      <MockProviders>
        <MySubscriptions />
      </MockProviders>
    );

    expect(screen.getByText('My Subscriptions')).toBeInTheDocument();
    expect(screen.getByText('Monthly Wellness Box')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('$39.99 / monthly')).toBeInTheDocument();
  });

  it('shows create subscription button', () => {
    render(
      <MockProviders>
        <MySubscriptions />
      </MockProviders>
    );

    expect(screen.getByText('New Subscription')).toBeInTheDocument();
  });

  it('opens create subscription modal when button is clicked', () => {
    render(
      <MockProviders>
        <MySubscriptions />
      </MockProviders>
    );

    fireEvent.click(screen.getByText('New Subscription'));
    expect(screen.getByText('Create New Subscription')).toBeInTheDocument();
  });

  it('shows empty state when no subscriptions exist', () => {
    const emptyContext = {
      ...mockSubscriptionContext,
      subscriptions: [],
    };

    jest.mocked(require('../../../contexts/SubscriptionContext').useSubscription).mockReturnValue(emptyContext);

    render(
      <MockProviders>
        <MySubscriptions />
      </MockProviders>
    );

    expect(screen.getByText("You don't have any subscriptions yet.")).toBeInTheDocument();
    expect(screen.getByText('Create Your First Subscription')).toBeInTheDocument();
  });

  it('filters subscriptions by status', () => {
    render(
      <MockProviders>
        <MySubscriptions />
      </MockProviders>
    );

    // Check that tabs are present
    expect(screen.getByText('All (1)')).toBeInTheDocument();
    expect(screen.getByText('Active (1)')).toBeInTheDocument();
    expect(screen.getByText('Paused (0)')).toBeInTheDocument();
    expect(screen.getByText('Cancelled (0)')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    const loadingContext = {
      ...mockSubscriptionContext,
      loading: true,
    };

    jest.mocked(require('../../../contexts/SubscriptionContext').useSubscription).mockReturnValue(loadingContext);

    render(
      <MockProviders>
        <MySubscriptions />
      </MockProviders>
    );

    expect(screen.getByText('Loading your subscriptions...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorContext = {
      ...mockSubscriptionContext,
      error: 'Failed to load subscriptions',
    };

    jest.mocked(require('../../../contexts/SubscriptionContext').useSubscription).mockReturnValue(errorContext);

    render(
      <MockProviders>
        <MySubscriptions />
      </MockProviders>
    );

    expect(screen.getByText('Error loading subscriptions: Failed to load subscriptions')).toBeInTheDocument();
  });
});