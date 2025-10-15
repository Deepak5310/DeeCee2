# API Services Documentation

## Overview

This directory contains the API service layer for DeeCee Hair frontend. All backend API calls should go through these services.

## Why Use Services?

✅ **Automatic Token Management** - Auth tokens added automatically
✅ **Type Safety** - Full TypeScript support
✅ **Consistent Error Handling** - Standardized error format
✅ **DRY Code** - Reusable API functions
✅ **Easy Testing** - Mock services in tests
✅ **Environment Aware** - Auto-switches dev/prod URLs

## Quick Start

### 1. Set API URL

Add to `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2. Import Services

```typescript
import { getProducts, createOrder, getUserProfile } from '@/app/services';
```

### 3. Use in Components

```typescript
const MyComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();

      if (result.success) {
        setProducts(result.data);
      } else {
        console.error(result.message);
      }
    };

    fetchData();
  }, []);

  return <div>{/* Render products */}</div>;
};
```

## Service Files

### `api.service.ts` - Base Utilities

Core API functionality used by all services.

**Functions:**
- `getAuthToken()` - Get Firebase auth token
- `apiRequest()` - Make authenticated API call
- `publicApiRequest()` - Make public API call

**Usage:**
```typescript
import { apiRequest, publicApiRequest } from '@/app/services';

// Authenticated request
const result = await apiRequest('/api/orders', { method: 'GET' });

// Public request
const result = await publicApiRequest('/api/products', { method: 'GET' });
```

---

### `auth.service.ts` - Authentication

User authentication and profile management.

**Functions:**

#### `registerUser(data)`
Register user in database after Firebase signup.

```typescript
const result = await registerUser({
  firebaseUid: user.uid,
  email: user.email,
  name: 'John Doe'
});
```

#### `getUserProfile()`
Get current user profile.

```typescript
const result = await getUserProfile();
if (result.success) {
  console.log(result.data); // User object
}
```

#### `updateUserProfile(data)`
Update user profile.

```typescript
const result = await updateUserProfile({
  name: 'Jane Doe'
});
```

#### `verifyToken()`
Verify Firebase token is valid.

```typescript
const result = await verifyToken();
if (result.success) {
  console.log('Token is valid');
}
```

---

### `product.service.ts` - Products

Product catalog and search.

**Functions:**

#### `getProducts(filters?)`
Get all products with optional filters.

```typescript
const result = await getProducts({
  category: 'Clip-In Extensions',
  color: 'Natural Black',
  minPrice: 1000,
  maxPrice: 5000,
  sort: 'price_asc',
  search: 'curly'
});
```

**Filters:**
- `category` - Filter by category
- `color` - Filter by color
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `sort` - Sort order (price_asc, price_desc, newest)
- `search` - Search query

#### `getProductById(productId)`
Get single product details.

```typescript
const result = await getProductById('product-123');
```

#### `getCategories()`
Get all product categories.

```typescript
const result = await getCategories();
// Returns: ['Clip-In Extensions', 'Tape-In Extensions', ...]
```

#### `getBestsellers()`
Get bestselling products.

```typescript
const result = await getBestsellers();
```

#### `getNewArrivals()`
Get new arrival products.

```typescript
const result = await getNewArrivals();
```

#### `addProductReview(productId, review)`
Add product review (future feature).

```typescript
const result = await addProductReview('product-123', {
  rating: 5,
  comment: 'Excellent quality!'
});
```

---

### `order.service.ts` - Orders

Order creation and management.

**Functions:**

#### `getUserOrders()`
Get all orders for authenticated user.

```typescript
const result = await getUserOrders();
if (result.success) {
  console.log(result.data); // Array of orders
}
```

#### `getOrderById(orderId)`
Get specific order details.

```typescript
const result = await getOrderById('order-123');
```

#### `createOrder(data)`
Create new order.

```typescript
const result = await createOrder({
  items: [
    {
      productId: 'product-123',
      name: 'Silky Straight Clip-In',
      price: 2999,
      quantity: 1,
      color: 'Natural Black',
      size: '18 inches'
    }
  ],
  shippingAddress: {
    name: 'John Doe',
    phone: '+919876543210',
    addressLine1: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    country: 'India'
  },
  paymentInfo: {
    method: 'card',
    transactionId: 'txn_123456'
  }
});

if (result.success) {
  console.log('Order created:', result.data.orderId);
}
```

#### `cancelOrder(orderId)`
Cancel an order.

```typescript
const result = await cancelOrder('order-123');
```

#### `trackOrder(orderId)`
Get order tracking information.

```typescript
const result = await trackOrder('order-123');
if (result.success) {
  console.log(result.data); // Tracking details
}
```

---

### `appointment.service.ts` - Appointments

Appointment booking and management.

**Functions:**

#### `getUserAppointments()`
Get all appointments for authenticated user.

```typescript
const result = await getUserAppointments();
```

#### `getAppointmentById(appointmentId)`
Get specific appointment details.

```typescript
const result = await getAppointmentById('apt-123');
```

#### `createAppointment(data)`
Create new appointment.

```typescript
const result = await createAppointment({
  serviceType: 'Hair Extension Consultation',
  scheduledDate: '2025-02-15',
  scheduledTime: '10:00 AM',
  location: 'in-store',
  notes: 'First-time consultation'
});

if (result.success) {
  console.log('Appointment booked:', result.data);
}
```

**Service Types:**
- Hair Extension Consultation
- Color Matching Session
- Installation Service
- Maintenance Service
- Removal Service
- Styling Consultation
- Custom Order Consultation

**Locations:**
- `in-store` - Visit our store
- `home-service` - At your location
- `virtual` - Video consultation

#### `updateAppointment(appointmentId, data)`
Update/reschedule appointment.

```typescript
const result = await updateAppointment('apt-123', {
  scheduledDate: '2025-02-20',
  scheduledTime: '2:00 PM'
});
```

#### `cancelAppointment(appointmentId)`
Cancel appointment.

```typescript
const result = await cancelAppointment('apt-123');
```

#### `getAvailableSlots(date, serviceType)`
Get available appointment slots.

```typescript
const result = await getAvailableSlots(
  '2025-02-15',
  'Hair Extension Consultation'
);

if (result.success) {
  console.log(result.data); // Array of time slots
}
```

---

### `user.service.ts` - User Profile

User profile and address management.

**Functions:**

#### `getUserAddresses()`
Get saved addresses.

```typescript
const result = await getUserAddresses();
if (result.success) {
  console.log(result.data); // Array of addresses
}
```

#### `addAddress(address)`
Add new address.

```typescript
const result = await addAddress({
  name: 'Home',
  phone: '+919876543210',
  addressLine1: '123 Main St',
  addressLine2: 'Apt 4B',
  city: 'Mumbai',
  state: 'Maharashtra',
  postalCode: '400001',
  country: 'India',
  isDefault: true
});
```

#### `updateAddress(addressId, address)`
Update existing address.

```typescript
const result = await updateAddress('addr-123', {
  addressLine1: '456 New St'
});
```

#### `deleteAddress(addressId)`
Delete address.

```typescript
const result = await deleteAddress('addr-123');
```

#### `updateUserPreferences(preferences)`
Update user preferences.

```typescript
const result = await updateUserPreferences({
  currency: 'USD',
  notifications: {
    email: true,
    sms: false
  }
});
```

---

### `payment.service.ts` - Payments

Payment processing and verification.

**Functions:**

#### `createPaymentIntent(data)`
Create payment intent.

```typescript
const result = await createPaymentIntent({
  amount: 2999,
  currency: 'INR',
  paymentMethod: 'stripe' // or 'razorpay'
});

if (result.success) {
  console.log(result.data.clientSecret);
}
```

#### `verifyPayment(data)`
Verify payment status.

```typescript
const result = await verifyPayment({
  paymentId: 'pay_123456',
  orderId: 'order_123456'
});

if (result.success && result.data.verified) {
  console.log('Payment verified!');
}
```

#### `getPaymentDetails(paymentId)`
Get payment details.

```typescript
const result = await getPaymentDetails('pay_123456');
```

#### `processRefund(data)`
Process refund.

```typescript
const result = await processRefund({
  paymentId: 'pay_123456',
  amount: 2999,
  reason: 'Product defective'
});
```

---

## Response Format

All services return a consistent format:

```typescript
{
  success: boolean;      // true if request succeeded
  data?: T;              // Response data (if success)
  message?: string;      // Error/success message
  errors?: string[];     // Validation errors (if any)
}
```

**Success Example:**
```typescript
{
  success: true,
  data: { id: '123', name: 'Product' },
  message: 'Product fetched successfully'
}
```

**Error Example:**
```typescript
{
  success: false,
  message: 'Product not found',
  errors: ['Invalid product ID']
}
```

## Error Handling

### Recommended Pattern

```typescript
const handleAction = async () => {
  try {
    const result = await someService();

    if (!result.success) {
      // Show error to user
      setError(result.message || 'Something went wrong');
      return;
    }

    // Success - use result.data
    setData(result.data);
  } catch (error) {
    // Network error
    setError('Network error. Please try again.');
  }
};
```

### Common Errors

| Error | Meaning | Action |
|-------|---------|--------|
| 401 Unauthorized | Not logged in or token expired | Redirect to login |
| 403 Forbidden | Email not verified | Show verification prompt |
| 404 Not Found | Resource doesn't exist | Show not found message |
| 429 Too Many Requests | Rate limit exceeded | Wait and retry |
| 500 Server Error | Backend issue | Show error message |

## Authentication

### How Tokens Work

1. User logs in → Firebase returns token
2. Service layer automatically adds token to requests
3. Backend verifies token
4. Request processed

**You don't need to handle tokens manually!**

### Token Expiration

Tokens expire after 1 hour. Firebase automatically refreshes them.

If you get "Token expired" error:
```typescript
if (result.message === 'Token expired - Please login again') {
  await logout();
  setShowLogin(true);
}
```

## Testing Services

### In Browser Console

```javascript
// Import service in component
import { getProducts } from '@/app/services';

// Add to useEffect
useEffect(() => {
  getProducts().then(console.log);
}, []);
```

### With React DevTools

Add temporary button to test:
```typescript
<button onClick={async () => {
  const result = await getProducts();
  console.log(result);
}}>
  Test API
</button>
```

## Migration Example

### Before (Local State)

```typescript
import { PRODUCTS } from '@/app/constants/products';

const ShopPage = () => {
  const [products, setProducts] = useState(PRODUCTS);

  return <div>{/* Render products */}</div>;
};
```

### After (API Integration)

```typescript
import { getProducts } from '@/app/services';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      const result = await getProducts();

      if (result.success) {
        setProducts(result.data);
      } else {
        setError(result.message || 'Failed to load products');
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Render products */}</div>;
};
```

## Best Practices

### ✅ Do

- Use services for all backend API calls
- Handle both success and error cases
- Show loading states
- Use TypeScript types
- Import from barrel export: `@/app/services`

### ❌ Don't

- Call `fetch()` directly in components
- Store tokens in localStorage
- Ignore error responses
- Make API calls without error handling
- Hardcode API URLs

## Environment Variables

Required in `.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Change to production URL when deploying
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## TypeScript Support

All services have full TypeScript support:

```typescript
import type { Product, Order, User } from '@/app/types';
import { getProducts, createOrder, getUserProfile } from '@/app/services';

// Type inference works automatically
const result = await getProducts();
// result.data is typed as Product[]

const orderResult = await createOrder(data);
// orderResult.data is typed as Order
```

## Debugging

### Check API Connection

```typescript
// Test health endpoint
fetch('http://localhost:5000/health')
  .then(res => res.json())
  .then(console.log);
```

### Check Auth Token

```typescript
import { getAuthToken } from '@/app/services';

const token = await getAuthToken();
console.log('Token:', token);
```

### Enable Detailed Logs

Services log errors to console automatically. Check browser console for:
- API request errors
- Token issues
- Network problems

## Need Help?

**Documentation:**
- `BACKEND_README.md` - Backend API reference
- `FRONTEND_BACKEND_INTEGRATION.md` - Integration guide
- `BACKEND_INTEGRATION_STATUS.md` - Setup status

**Common Issues:**
1. Ensure backend is running (`npm run dev` in `backend/`)
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify user is logged in for protected endpoints
4. Check browser console for error messages

---

**Happy Coding! 🚀**
