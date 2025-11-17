# App Completion Design

## Overview

This design document outlines the technical approach to complete the Banwee e-commerce platform. The focus is on fixing existing bugs, completing unfinished features, and ensuring all components work together seamlessly.

## Architecture

### Frontend Architecture
- **React** with TypeScript for type safety
- **Context API** for state management (Cart, Wishlist, Auth, Notifications)
- **React Router** for navigation
- **Axios** for API communication
- **Tailwind CSS** for styling

### Backend Architecture
- **FastAPI** for REST API
- **SQLAlchemy** with async support for database operations
- **PostgreSQL/SQLite** for data persistence
- **Pydantic** for data validation
- **JWT** for authentication

### API Structure
All API responses follow this structure:
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

Paginated responses:
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "per_page": 10,
  "total_pages": 10
}
```

## Components and Interfaces

### 1. Product Details Page Fixes

**Components:**
- `ProductDetails.tsx` - Main product detail page
- `ProductImageGallery.tsx` - Image display component
- `VariantSelector.tsx` - Variant selection component
- `ReviewList.tsx` - Reviews display

**Backend Services:**
- `ProductService.get_product_by_id()` - Returns product with variants and images
- `ReviewService.get_product_reviews()` - Returns paginated reviews

**Data Flow:**
1. Frontend fetches product by ID
2. Backend loads product with relationships (variants, images, reviews)
3. Frontend displays product with proper null checks
4. User selects variant → Frontend updates displayed information

### 2. Cart Management

**Components:**
- `Cart.tsx` - Cart page
- `CartContext.tsx` - Cart state management
- `CartItem` - Individual cart item display

**Backend Services:**
- `CartService.get_cart()` - Returns cart with items
- `CartService.add_to_cart()` - Adds item with variant_id
- `CartService.update_cart_item_quantity()` - Updates quantity
- `CartService.remove_from_cart()` - Removes item

**Data Models:**
```typescript
interface CartItem {
  id: string;
  variant: ProductVariant;
  quantity: number;
  price_per_unit: number;
  total_price: number;
}

interface Cart {
  items: CartItem[];
  total_amount: number;
}
```

**Key Fixes:**
- Ensure variant includes product information (product_name, product_description)
- Calculate subtotal, tax, shipping correctly
- Handle empty cart state
- Convert IDs to strings for API calls

### 3. Wishlist Management

**Components:**
- `Wishlist.tsx` - Wishlist page
- `WishlistContext.tsx` - Wishlist state management

**Backend Services:**
- `WishlistService.get_wishlists()` - Returns wishlists with items
- `WishlistService.add_item()` - Adds product to wishlist
- `WishlistService.remove_item()` - Removes item

**Data Models:**
```typescript
interface WishlistItem {
  id: string;
  product: Product;
  variant_id?: string;
  quantity: number;
}
```

**Key Fixes:**
- Load product with variants in wishlist items
- Enable add to cart from wishlist using variant_id
- Display product images and prices correctly

### 4. Payment Integration

**Components:**
- `Checkout.tsx` - Checkout page
- `PaymentForm.tsx` - Payment details form
- `OrderSummary.tsx` - Order summary display

**Backend Services:**
- `PaymentService.process_payment()` - Processes payment
- `OrderService.create_order()` - Creates order from cart
- `PaymentService.create_payment_intent()` - Stripe integration

**Payment Flow:**
1. User proceeds to checkout
2. Frontend displays order summary and payment form
3. User enters payment details
4. Frontend calls payment API
5. Backend processes payment with Stripe
6. On success: Create order, clear cart, send confirmation
7. On failure: Return error, retain cart

### 5. User Profile

**Components:**
- `Profile.tsx` - Profile page
- `AddressManager.tsx` - Address management
- `PaymentMethodManager.tsx` - Payment methods

**Backend Services:**
- `UserService.get_profile()` - Returns user profile
- `UserService.update_profile()` - Updates user information
- `AddressService.manage_addresses()` - CRUD for addresses
- `PaymentService.manage_payment_methods()` - CRUD for payment methods

### 6. Admin Dashboard

**Components:**
- `AdminDashboard.tsx` - Main dashboard
- `AdminLayout.tsx` - Admin layout wrapper
- `StatsCard.tsx` - Statistics display
- `RecentOrders.tsx` - Recent orders list

**Backend Services:**
- `AdminService.get_dashboard_stats()` - Returns statistics
- `AdminService.get_all_orders()` - Returns paginated orders
- `AdminService.get_all_users()` - Returns paginated users

**Statistics:**
- Total revenue
- Total orders
- Total users
- Total products
- Recent orders (last 5)
- Sales trends

### 7. Product List Search and Filters

**Components:**
- `ProductList.tsx` - Product listing page
- `FilterSidebar.tsx` - Filter controls
- `ProductCard.tsx` - Individual product card

**Backend Services:**
- `ProductService.get_products()` - Returns filtered, paginated products

**Filters:**
- Search query (name, description)
- Category selection
- Price range
- Rating range
- Sort options (price, name, date, rating)

**Key Fixes:**
- Fix duplicate JOIN in SQL query
- Return correct pagination structure
- Handle empty results
- Update URL params with filters

### 8. Notifications System

**Components:**
- `NotificationContext.tsx` - Notification state
- `NotificationBell.tsx` - Notification icon with count
- `NotificationList.tsx` - Notification dropdown

**Backend Services:**
- `NotificationService.send_notification()` - Sends notification
- `NotificationService.get_notifications()` - Returns user notifications
- `NotificationService.mark_as_read()` - Marks notification read

**Notification Types:**
- Order status updates
- Payment confirmations
- Shipping updates
- Admin messages

## Data Models

### Product Variant with Product Info
```python
class ProductVariantResponse(BaseModel):
    id: UUID
    product_id: UUID
    sku: str
    name: str
    base_price: float
    sale_price: Optional[float]
    stock: int
    images: List[ProductImageResponse]
    product_name: Optional[str]  # Added
    product_description: Optional[str]  # Added
```

### Cart Response
```python
class CartResponse(BaseModel):
    items: List[CartItemResponse]
    total_amount: float
```

### Paginated Response
```python
{
    "data": List[T],
    "total": int,
    "page": int,
    "per_page": int,
    "total_pages": int
}
```

## Error Handling

### Frontend
- Use try-catch blocks for all API calls
- Display user-friendly error messages with toast notifications
- Handle loading states
- Handle empty states

### Backend
- Use APIException with message parameter
- Return consistent error structure
- Log errors for debugging
- Handle database errors gracefully

## Testing Strategy

### Frontend Testing
- Test cart operations (add, update, remove)
- Test wishlist operations
- Test product search and filters
- Test checkout flow
- Test admin dashboard

### Backend Testing
- Test all API endpoints
- Test database operations
- Test error handling
- Test authentication and authorization

### Integration Testing
- Test complete user flows
- Test payment processing
- Test order creation
- Test notifications

## Performance Considerations

- Use pagination for large lists
- Lazy load images
- Cache frequently accessed data
- Optimize database queries with proper indexes
- Use selectinload for relationships

## Security Considerations

- Validate all user inputs
- Use JWT for authentication
- Secure payment information
- Implement CORS properly
- Use HTTPS in production
- Sanitize database queries
