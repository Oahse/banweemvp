// frontend/src/components/product/ProductDetails.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { BrowserRouter, useParams, Link } from 'react-router-dom';
import { ProductDetails } from './ProductDetails';

// --- Mock external dependencies ---
vitest.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vitest.fn(),
    Link: vitest.fn(({ to, children, ...props }) => <a href={to} {...props}>{children}</a>),
  };
});

vitest.mock('../../contexts/CartContext', () => ({
  useCart: vitest.fn(),
}));
vitest.mock('../../contexts/WishlistContext', () => ({
  useWishlist: vitest.fn(),
}));
vitest.mock('../../hooks/useApi', () => ({
  useApi: vitest.fn(),
}));
vitest.mock('../../apis', () => ({
  ProductsAPI: {
    getProduct: vitest.fn(),
    getRecommendedProducts: vitest.fn(),
    getProductReviews: vitest.fn(),
  },
}));

vitest.mock('../ui/Breadcrumbs', () => ({
  __esModule: true,
  default: vitest.fn(() => <div data-testid="mock-breadcrumbs">Mock Breadcrumbs</div>),
}));
vitest.mock('../common/ErrorMessage', () => ({
  __esModule: true,
  default: vitest.fn(() => <div data-testid="mock-error-message">Mock Error Message</div>),
}));
vitest.mock('./ReviewForm', () => ({
  __esModule: true,
  default: vitest.fn(() => <div data-testid="mock-review-form">Mock Review Form</div>),
}));
vitest.mock('./NegotiationModal', () => ({
  NegotiationModal: vitest.fn((props) => (
    props.isOpen ? <div data-testid="mock-negotiation-modal"><button onClick={() => props.onDealAccepted(90)}>Accept Deal</button><button onClick={props.onClose}>Close</button></div> : null
  )),
}));

vitest.mock('framer-motion', () => ({
  motion: {
    button: vitest.fn((props) => <button {...props}>{props.children}</button>),
    div: vitest.fn((props) => <div {...props}>{props.children}</div>),
  },
}));

vitest.mock('react-hot-toast', () => ({
  toast: {
    success: vitest.fn(),
    error: vitest.fn(),
    info: vitest.fn(),
  },
}));

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  ShoppingCartIcon: vitest.fn(() => <svg data-testid="icon-shopping-cart" />),
  HeartIcon: vitest.fn(() => <svg data-testid="icon-heart" />),
  ShareIcon: vitest.fn(() => <svg data-testid="icon-share" />),
  MinusIcon: vitest.fn(() => <svg data-testid="icon-minus" />),
  PlusIcon: vitest.fn(() => <svg data-testid="icon-plus" />),
  CheckIcon: vitest.fn(() => <svg data-testid="icon-check" />),
  TruckIcon: vitest.fn(() => <svg data-testid="icon-truck" />),
  RefreshCwIcon: vitest.fn(() => <svg data-testid="icon-refresh-cw" />),
  ChevronLeftIcon: vitest.fn(() => <svg data-testid="icon-chevron-left" />),
  ChevronRightIcon: vitest.fn(() => <svg data-testid="icon-chevron-right" />),
  MessageCircle: vitest.fn(() => <svg data-testid="icon-message-circle" />),
  Facebook: vitest.fn(() => <svg data-testid="icon-facebook" />),
  Twitter: vitest.fn(() => <svg data-testid="icon-twitter" />),
  Linkedin: vitest.fn(() => <svg data-testid="icon-linkedin" />),
}));


// Mock the lazy loaded ProductCard component
vitest.mock('../product/ProductCard', () => ({
  ProductCard: vitest.fn(() => <div data-testid="mock-product-card"></div>),
}));


describe('ProductDetails Component', () => {
  const mockUseParams = useParams as vitest.Mock;
  const mockUseCart = useCart as vitest.Mock;
  const mockUseWishlist = useWishlist as vitest.Mock;
  const mockUseApi = useApi as vitest.Mock;
  const mockProductsAPI = ProductsAPI;

  const mockProduct = {
    id: '1',
    name: 'Organic Green Tea',
    description: 'A refreshing organic green tea.',
    price: 15.99,
    rating: 4.5,
    review_count: 10,
    category: { id: 'cat-1', name: 'Beverages', slug: 'beverages' },
    supplier: { id: 'sup-1', firstname: 'Tea', lastname: 'Master' },
    variants: [
      {
        id: 'var-1',
        name: 'Small',
        base_price: 15.99,
        sale_price: null,
        stock: 100,
        sku: 'GT-SML-001',
        images: [{ id: 'img-1', url: 'http://example.com/small.jpg', alt_text: 'Small Tea' }],
        attributes: { weight: '100g' },
      },
      {
        id: 'var-2',
        name: 'Large',
        base_price: 25.99,
        sale_price: 22.99,
        stock: 50,
        sku: 'GT-LRG-001',
        images: [{ id: 'img-2', url: 'http://example.com/large.jpg', alt_text: 'Large Tea' }],
        attributes: { weight: '200g' },
      },
    ],
  };

  const mockReviews = { data: [{ id: 'rev-1', rating: 5, user: { firstname: 'Jane' }, created_at: new Date().toISOString(), title: 'Great!', comment: 'Loved it' }] };
  const mockRelatedProducts = [{ id: '2', name: 'Organic Coffee' }];

  const mockAddItemToCart = vitest.fn();
  const mockAddItemToWishlist = vitest.fn();
  const mockIsInWishlist = vitest.fn();

  // Mock window.open for share functionality
  const mockWindowOpen = vitest.spyOn(window, 'open').mockImplementation(() => null);

  beforeEach(() => {
    vitest.clearAllMocks();
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseCart.mockReturnValue({ addItem: mockAddItemToCart });
    mockUseWishlist.mockReturnValue({ addItem: mockAddItemToWishlist, isInWishlist: mockIsInWishlist });
    mockIsInWishlist.mockReturnValue(false); // Default not wishlisted

    // Mock useApi hooks
    mockUseApi
      .mockReturnValueOnce({ data: undefined, loading: true, error: null, execute: vitest.fn() }) // Product loading
      .mockReturnValueOnce({ data: undefined, loading: true, error: null, execute: vitest.fn() }) // Related loading
      .mockReturnValueOnce({ data: undefined, loading: true, error: null, execute: vitest.fn() }); // Reviews loading

    // Reset for subsequent calls or specific test cases
    const mockExecuteProduct = vitest.fn();
    const mockExecuteRelated = vitest.fn();
    const mockExecuteReviews = vitest.fn();
    mockUseApi.mockImplementation((initialState) => {
      // Simulate multiple useApi calls
      if (initialState === undefined || initialState.data === undefined) {
        // This is a simplified way to handle multiple useApi calls in the same component.
        // In a real scenario, you'd have distinct API calls.
        const [state, setState] = React.useState({ data: null, loading: true, error: null });
        return { ...state, execute: vitest.fn(() => Promise.resolve()) };
      }
      return { data: initialState.data, loading: initialState.loading, error: initialState.error, execute: initialState.execute };
    });

    // Manually control the return values for each useApi call
    const useApiCalls = [
      { data: mockProduct, loading: false, error: null, execute: mockExecuteProduct },
      { data: mockRelatedProducts, loading: false, error: null, execute: mockExecuteRelated },
      { data: mockReviews, loading: false, error: null, execute: mockExecuteReviews },
    ];
    let callIndex = 0;
    mockUseApi.mockImplementation(() => {
      const currentCall = useApiCalls[callIndex];
      callIndex++;
      return currentCall;
    });
    
  });

  afterEach(() => {
    mockWindowOpen.mockRestore();
  });

  // Helper to render with BrowserRouter context
  const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);


  it('shows loading skeleton when product data is loading', () => {
    mockUseApi
      .mockReturnValueOnce({ data: undefined, loading: true, error: null, execute: vitest.fn() }) // Product
      .mockReturnValueOnce({ data: undefined, loading: true, error: null, execute: vitest.fn() }) // Related
      .mockReturnValueOnce({ data: undefined, loading: true, error: null, execute: vitest.fn() }); // Reviews

    renderWithRouter(<ProductDetails />);
    // Check for elements that are part of the loading skeleton
    expect(screen.getByTestId('product-image-skeleton')).toBeInTheDocument(); // Assuming a data-testid or class
  });
  
  it('shows error message when product data fails to load', () => {
    mockUseApi
      .mockReturnValueOnce({ data: undefined, loading: false, error: new Error('Failed to fetch'), execute: vitest.fn() }) // Product
      .mockReturnValueOnce({ data: mockRelatedProducts, loading: false, error: null, execute: vitest.fn() }) // Related
      .mockReturnValueOnce({ data: mockReviews, loading: false, error: null, execute: vitest.fn() }); // Reviews
    
    renderWithRouter(<ProductDetails />);
    expect(screen.getByTestId('mock-error-message')).toBeInTheDocument();
    expect(screen.getByTestId('mock-error-message')).toHaveTextContent('Failed to fetch');
  });

  it('shows "Product not found" when product data is null', () => {
    mockUseApi
      .mockReturnValueOnce({ data: null, loading: false, error: null, execute: vitest.fn() }) // Product
      .mockReturnValueOnce({ data: mockRelatedProducts, loading: false, error: null, execute: vitest.fn() }) // Related
      .mockReturnValueOnce({ data: mockReviews, loading: false, error: null, execute: vitest.fn() }); // Reviews

    renderWithRouter(<ProductDetails />);
    expect(screen.getByText('Product not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse all products' })).toBeInTheDocument();
  });

  it('renders product details correctly with mock data', async () => {
    renderWithRouter(<ProductDetails />);
    
    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByText('$15.99')).toBeInTheDocument(); // Price of first variant
      expect(screen.getByText('(10 reviews)')).toBeInTheDocument();
      expect(screen.getByAltText('Small Tea')).toBeInTheDocument(); // Default image
    });
  });

  it('switches variant and updates displayed price/image', async () => {
    renderWithRouter(<ProductDetails />);
    await waitFor(() => expect(screen.getByText('Small')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: 'Large' }));
    
    await waitFor(() => {
      expect(screen.getByText('$22.99')).toBeInTheDocument(); // Sale price for large variant
      expect(screen.getByText('Save $3.00')).toBeInTheDocument();
      expect(screen.getByAltText('Large Tea')).toBeInTheDocument(); // Large variant image
    });
  });

  it('increases and decreases quantity', () => {
    renderWithRouter(<ProductDetails />);
    fireEvent.click(screen.getByTestId('icon-plus').closest('button')!); // Increase
    expect(screen.getByRole('spinbutton')).toHaveValue(2);
    fireEvent.click(screen.getByTestId('icon-minus').closest('button')!); // Decrease
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  it('adds item to cart and shows toast', async () => {
    renderWithRouter(<ProductDetails />);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    
    await waitFor(() => {
      expect(mockAddItemToCart).toHaveBeenCalledWith({ variant_id: 'var-1', quantity: 1 });
      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Added to cart!'));
    });
  });

  it('adds item to wishlist and shows toast', () => {
    renderWithRouter(<ProductDetails />);
    fireEvent.click(screen.getByRole('button', { name: /wishlist/i }));
    expect(mockAddItemToWishlist).toHaveBeenCalledWith(
      expect.objectContaining({ id: mockProduct.id, name: mockProduct.name })
    );
    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Added to wishlist!'));
  });

  it('opens negotiation modal', () => {
    renderWithRouter(<ProductDetails />);
    fireEvent.click(screen.getByRole('button', { name: /negotiate price/i }));
    expect(screen.getByTestId('mock-negotiation-modal')).toBeInTheDocument();
  });

  it('handles deal accepted from negotiation modal', async () => {
    renderWithRouter(<ProductDetails />);
    fireEvent.click(screen.getByRole('button', { name: /negotiate price/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Accept Deal' })); // From mock negotiation modal
    
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Deal accepted at $90.00! Adding to cart...');
      expect(mockAddItemToCart).toHaveBeenCalledTimes(1);
    });
  });

  it('navigates product images and thumbnails', () => {
    renderWithRouter(<ProductDetails />);
    expect(screen.getByAltText('Small Tea')).toHaveAttribute('src', 'http://example.com/small.jpg');
    fireEvent.click(screen.getByTestId('icon-chevron-right').closest('button')!); // Next image
    expect(screen.getByAltText('Large Tea')).toHaveAttribute('src', 'http://example.com/large.jpg');
    fireEvent.click(screen.getByTestId('icon-chevron-left').closest('button')!); // Previous image
    expect(screen.getByAltText('Small Tea')).toHaveAttribute('src', 'http://example.com/small.jpg');

    // Click thumbnail
    fireEvent.click(screen.getByRole('button', { name: /large tea/i }));
    expect(screen.getByAltText('Large Tea')).toHaveAttribute('src', 'http://example.com/large.jpg');
  });

  it('switches tabs between Description, Features, Reviews', async () => {
    renderWithRouter(<ProductDetails />);
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument(); // Description tab default

    fireEvent.click(screen.getByRole('button', { name: 'Features' }));
    await waitFor(() => {
      expect(screen.getByText('Product Details')).toBeInTheDocument();
      expect(screen.getByText('weight: 100g')).toBeInTheDocument(); // From variant attributes
    });

    fireEvent.click(screen.getByRole('button', { name: /reviews/i }));
    await waitFor(() => {
      expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
      expect(screen.getByTestId('mock-review-form')).toBeInTheDocument();
      expect(screen.getByText('Loved it')).toBeInTheDocument(); // From mock reviews
    });
  });

  it('handles sharing product to Facebook', () => {
    renderWithRouter(<ProductDetails />);
    fireEvent.click(screen.getByTestId('icon-share').closest('button')!); // Open share menu
    fireEvent.click(screen.getByText('Facebook'));
    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://www.facebook.com/sharer/sharer.php?u='),
      '_blank',
      'width=600,height=400'
    );
  });
});
