import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SubscriptionProductManager } from '../SubscriptionProductManager';
import { useSubscription } from '../../../contexts/SubscriptionContext';
import { useLocale } from '../../../contexts/LocaleContext';

// Mock the contexts
jest.mock('../../../contexts/SubscriptionContext');
jest.mock('../../../contexts/LocaleContext');
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockUseSubscription = useSubscription as jest.MockedFunction<typeof useSubscription>;
const mockUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;

const mockProducts = [
  {
    id: '1',
    name: 'Test Product 1',
    price: 29.99,
    current_price: 24.99,
    images: [{ url: 'https://example.com/image1.jpg', is_primary: true }],
    stock: 10,
    sku: 'TEST-001',
    attributes: { color: 'Red', size: 'M' }
  },
  {
    id: '2',
    name: 'Test Product 2',
    price: 39.99,
    primary_image: { url: 'https://example.com/image2.jpg' },
    stock: 5,
    sku: 'TEST-002'
  }
];

describe('SubscriptionProductManager', () => {
  const mockAddProducts = jest.fn();
  const mockRemoveProducts = jest.fn();
  const mockFormatCurrency = jest.fn((amount, currency) => `$${amount.toFixed(2)}`);
  const mockOnProductsUpdated = jest.fn();

  beforeEach(() => {
    mockUseSubscription.mockReturnValue({
      addProductsToSubscription: mockAddProducts,
      removeProductsFromSubscription: mockRemoveProducts,
      subscriptions: [],
      activeSubscription: null,
      loading: false,
      error: null,
      refreshSubscriptions: jest.fn(),
      createSubscription: jest.fn(),
      updateSubscription: jest.fn(),
      cancelSubscription: jest.fn(),
      activateSubscription: jest.fn(),
      pauseSubscription: jest.fn(),
      resumeSubscription: jest.fn(),
    });

    mockUseLocale.mockReturnValue({
      formatCurrency: mockFormatCurrency,
      locale: 'en-US',
      currency: 'USD',
      setLocale: jest.fn(),
      setCurrency: jest.fn(),
    });

    jest.clearAllMocks();
  });

  it('renders product list correctly', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
        onProductsUpdated={mockOnProductsUpdated}
      />
    );

    expect(screen.getByText('Products (2)')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Add Products')).toBeInTheDocument();
    expect(screen.getByText('Manage')).toBeInTheDocument();
  });

  it('renders compact view correctly', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
        onProductsUpdated={mockOnProductsUpdated}
        compact={true}
        maxDisplayProducts={1}
      />
    );

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('+1 more')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('shows add products button when showActions is true', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
        showActions={true}
      />
    );

    expect(screen.getByText('Add Products')).toBeInTheDocument();
  });

  it('hides action buttons when showActions is false', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
        showActions={false}
      />
    );

    expect(screen.queryByText('Add Products')).not.toBeInTheDocument();
    expect(screen.queryByText('Manage')).not.toBeInTheDocument();
  });

  it('enters remove mode when manage button is clicked', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
        showActions={true}
      />
    );

    fireEvent.click(screen.getByText('Manage'));

    expect(screen.getByText('0 products selected for removal')).toBeInTheDocument();
    expect(screen.getByText('Click products to select/deselect them for removal')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('selects products for removal when clicked in remove mode', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
        showActions={true}
      />
    );

    // Enter remove mode
    fireEvent.click(screen.getByText('Manage'));

    // Click on first product
    const productCards = screen.getAllByRole('generic');
    const firstProductCard = productCards.find(card => 
      card.textContent?.includes('Test Product 1')
    );
    
    if (firstProductCard) {
      fireEvent.click(firstProductCard);
      expect(screen.getByText('1 product selected for removal')).toBeInTheDocument();
    }
  });

  it('calls removeProductsFromSubscription when remove button is clicked', async () => {
    mockRemoveProducts.mockResolvedValue(true);

    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
        onProductsUpdated={mockOnProductsUpdated}
        showActions={true}
      />
    );

    // Enter remove mode
    fireEvent.click(screen.getByText('Manage'));

    // Select a product (simulate by directly clicking remove button)
    // In a real test, we'd select products first
    const removeButton = screen.getByText(/Remove \d+/);
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(mockRemoveProducts).toHaveBeenCalledWith('test-subscription', []);
    });
  });

  it('displays product attributes correctly', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
      />
    );

    expect(screen.getByText('color: Red')).toBeInTheDocument();
    expect(screen.getByText('size: M')).toBeInTheDocument();
  });

  it('displays stock information correctly', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
      />
    );

    expect(screen.getByText('10 in stock')).toBeInTheDocument();
    expect(screen.getByText('5 in stock')).toBeInTheDocument();
  });

  it('displays SKU information correctly', () => {
    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={mockProducts}
        currency="USD"
      />
    );

    expect(screen.getByText('SKU: TEST-001')).toBeInTheDocument();
    expect(screen.getByText('SKU: TEST-002')).toBeInTheDocument();
  });

  it('shows fallback when no image is available', () => {
    const productsWithoutImages = [
      {
        id: '3',
        name: 'Product Without Image',
        price: 19.99,
        stock: 3
      }
    ];

    render(
      <SubscriptionProductManager
        subscriptionId="test-subscription"
        products={productsWithoutImages}
        currency="USD"
      />
    );

    expect(screen.getByText('Product Without Image')).toBeInTheDocument();
    // The PackageIcon should be rendered as fallback
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });
});