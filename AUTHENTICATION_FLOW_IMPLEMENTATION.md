# Authentication Flow Implementation for Cart and Wishlist Actions

## Overview

This implementation adds a comprehensive authentication flow that redirects unauthenticated users to the login page when they try to add items to cart or wishlist, and then redirects them to the appropriate page after successful authentication.

## Key Features

1. **Seamless Authentication Flow**: Users are redirected to login when attempting cart/wishlist actions while unauthenticated
2. **Smart Redirect Logic**: After login/signup, users are redirected to:
   - Cart page if they were trying to add to cart
   - Wishlist page if they were trying to add to wishlist
   - Original page for other actions
3. **Consistent Implementation**: All cart/wishlist actions across the app use the same authentication flow

## Implementation Details

### 1. New Authentication Hook (`useAuthenticatedAction.ts`)

Created a reusable hook that:
- Checks if user is authenticated before executing actions
- Stores intended destination and action type
- Redirects to login if not authenticated
- Handles authentication errors during action execution

```typescript
const { executeWithAuth } = useAuthenticatedAction();

// Usage
await executeWithAuth(async () => {
  await addToCart({ variant_id: '123', quantity: 1 });
  return true;
}, 'cart');
```

### 2. Enhanced AuthContext

Updated the authentication context to:
- Store intended destination with action type
- Handle redirect logic based on action type in login/register flows

### 3. Updated Login Component

Enhanced login page to:
- Check for intended destination with action type
- Redirect to cart page if action was 'cart'
- Redirect to wishlist page if action was 'wishlist'
- Clear intended destination after successful navigation

### 4. Updated Register Component

Enhanced register page with similar redirect logic as login page.

### 5. Updated Components

Updated all components that handle cart/wishlist actions:

#### ProductDetails Page
- Uses `useAuthenticatedAction` hook for add to cart/wishlist buttons
- Maintains existing functionality while adding authentication flow

#### ProductCard Component
- Updated both cart and wishlist action handlers
- Consistent authentication flow across product grid/list views

#### Wishlist Pages
- Both main wishlist page and account wishlist component updated
- Add to cart actions now require authentication

#### Components ProductDetails
- Updated the alternative ProductDetails component in components folder
- Consistent authentication flow

## User Experience Flow

### Scenario 1: Add to Cart (Unauthenticated User)
1. User clicks "Add to Cart" on any product
2. System detects user is not authenticated
3. User is redirected to `/login` with intended destination stored
4. After successful login/signup, user is redirected to `/cart`
5. User can see their cart and proceed with checkout

### Scenario 2: Add to Wishlist (Unauthenticated User)
1. User clicks "Add to Wishlist" on any product
2. System detects user is not authenticated
3. User is redirected to `/login` with intended destination stored
4. After successful login/signup, user is redirected to `/account/wishlist`
5. User can see their wishlist items

### Scenario 3: Already Authenticated User
1. User clicks cart/wishlist actions
2. Actions execute normally without any redirects
3. Success/error messages shown as before

## Error Handling

- **Network Errors**: Displayed to user with appropriate error messages
- **Authentication Errors**: Trigger redirect to login page
- **Validation Errors**: Handled at component level with user feedback

## Testing

Created comprehensive tests for the `useAuthenticatedAction` hook covering:
- Authenticated user scenarios
- Unauthenticated user scenarios
- Authentication error handling
- Non-authentication error handling

## Files Modified

### New Files
- `frontend/src/hooks/useAuthenticatedAction.ts` - Main authentication hook
- `frontend/src/hooks/__tests__/useAuthenticatedAction.test.tsx` - Tests

### Modified Files
- `frontend/src/contexts/AuthContext.tsx` - Enhanced with action-based redirects
- `frontend/src/pages/Login.tsx` - Updated redirect logic
- `frontend/src/pages/Register.tsx` - Updated redirect logic
- `frontend/src/pages/ProductDetails.tsx` - Updated cart/wishlist actions
- `frontend/src/components/product/ProductCard.tsx` - Updated cart/wishlist actions
- `frontend/src/pages/Wishlist.tsx` - Updated add to cart action
- `frontend/src/components/account/Wishlist.tsx` - Updated add to cart action
- `frontend/src/components/product/ProductDetails.tsx` - Updated cart/wishlist actions

## Benefits

1. **Improved User Experience**: Seamless flow from product discovery to authentication to cart
2. **Consistent Behavior**: All cart/wishlist actions behave the same way across the app
3. **Reduced Friction**: Users don't lose their intended action after authentication
4. **Better Conversion**: Users are more likely to complete purchases when redirected to cart
5. **Maintainable Code**: Centralized authentication logic in reusable hook

## Future Enhancements

1. **Guest Cart Persistence**: Store cart items in localStorage for unauthenticated users
2. **Social Login Integration**: Extend the flow to work with social authentication
3. **Progressive Enhancement**: Add loading states during authentication redirects
4. **Analytics**: Track conversion rates from authentication redirects

## Usage Examples

```typescript
// In any component that needs authenticated actions
const { executeWithAuth } = useAuthenticatedAction();

// Add to cart with authentication
const handleAddToCart = async () => {
  await executeWithAuth(async () => {
    await addToCart({ variant_id: productId, quantity: 1 });
    toast.success('Added to cart!');
    return true;
  }, 'cart');
};

// Add to wishlist with authentication
const handleAddToWishlist = async () => {
  await executeWithAuth(async () => {
    await addToWishlist(productId);
    toast.success('Added to wishlist!');
    return true;
  }, 'wishlist');
};
```

This implementation provides a robust, user-friendly authentication flow that enhances the shopping experience while maintaining clean, maintainable code.