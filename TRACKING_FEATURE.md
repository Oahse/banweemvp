# Order Tracking Feature

## Overview
The order tracking feature allows customers to view the real-time status of their orders without needing to send emails or contact support. Customers can see a visual timeline of their order progress, tracking events with timestamps and locations, and estimated delivery dates.

## Key Benefits
- **No email required** - Customers can check status anytime
- **Visual timeline** - Easy-to-understand progress indicator
- **Detailed history** - Complete tracking event log with timestamps
- **Real-time updates** - Status reflects actual order progress
- **Mobile-friendly** - Responsive design works on all devices

## Features

### 1. Track Order Page (`/track-order/:orderId`)
- Visual timeline showing order progress through different stages
- Current status display with color-coded indicators
- Tracking number and carrier information (when available)
- Estimated delivery date
- Detailed tracking history with timestamps and locations

### 2. Order Status Steps
The tracking page displays a visual timeline with these stages:
1. **Order Placed** - Initial order creation
2. **Confirmed** - Payment processed and order confirmed
3. **Shipped** - Order dispatched from warehouse
4. **Delivered** - Order successfully delivered

### 3. Tracking Events
Each order maintains a history of tracking events including:
- Status changes
- Descriptions of what happened
- Location information
- Timestamps for each event

## User Access Points

### From Orders List
- Click the "Track" button next to any order in `/account/orders`

### From Order Details
- Click the "Track Order" button in `/account/orders/:orderId`

### Direct Link
- Navigate directly to `/track-order/:orderId` if you have the order ID

## Backend Implementation

### Database Models
- **Order**: Contains status, tracking_number, carrier_name
- **TrackingEvent**: Stores individual tracking events with status, description, location, and timestamp

### API Endpoint
```
GET /api/v1/orders/{order_id}/tracking
```

Returns:
```json
{
  "order_id": "uuid",
  "status": "shipped",
  "tracking_number": "1234567890",
  "carrier_name": "FedEx",
  "estimated_delivery": "2025-12-01T00:00:00",
  "tracking_events": [
    {
      "id": "uuid",
      "status": "shipped",
      "description": "Package shipped from warehouse",
      "location": "Distribution Center",
      "timestamp": "2025-11-28T10:00:00"
    }
  ]
}
```

## Status Colors
- **Delivered/Confirmed**: Green
- **Shipped/Out for Delivery**: Blue
- **Pending**: Yellow/Gray
- **Cancelled**: Red

## Admin Usage

### Updating Order Status via API

Admins can update order status with tracking information:

```bash
PUT /api/v1/admin/orders/{order_id}/status
```

Request body:
```json
{
  "status": "shipped",
  "tracking_number": "TRK123456789",
  "carrier_name": "FedEx",
  "location": "Distribution Center",
  "description": "Package shipped and in transit"
}
```

### Available Status Values
- `pending` - Order placed, awaiting confirmation
- `confirmed` - Payment processed, order confirmed
- `processing` - Order being prepared for shipment
- `shipped` - Package shipped and in transit
- `out_for_delivery` - Package out for delivery
- `delivered` - Package delivered successfully
- `cancelled` - Order cancelled

### Adding Sample Tracking Events (Testing)

For testing purposes, you can add sample tracking events to an order:

```bash
cd backend
python -m scripts.add_tracking_events <order_id>
```

This will:
- Add multiple tracking events showing order progression
- Update the order status to "shipped"
- Add a sample tracking number and carrier

## Frontend Implementation

### Components
- **TrackOrder.tsx** (`/pages/TrackOrder.tsx`) - Main tracking page with visual timeline
- **OrderDetail.tsx** - Updated with "Track Order" button
- **Orders.tsx** - Updated with "Track" button in orders list

### Visual Timeline
The tracking page displays a 4-step progress indicator:
1. Order Placed (pending)
2. Confirmed (confirmed/processing)
3. Shipped (shipped/in_transit/out_for_delivery)
4. Delivered (delivered)

The timeline automatically highlights completed steps based on the current order status.

## Testing the Feature

1. **Place an order** through the checkout process
2. **Get the order ID** from the orders list
3. **Add tracking events** (as admin):
   ```bash
   python -m scripts.add_tracking_events <order_id>
   ```
4. **View tracking** by clicking "Track" button or navigating to `/track-order/<order_id>`

## Future Enhancements
- Real-time tracking updates via WebSocket
- Integration with carrier APIs for live tracking
- Email/SMS notifications for status changes
- Map view showing package location
- Delivery photo proof
- Estimated delivery time calculations
- Push notifications for mobile apps
