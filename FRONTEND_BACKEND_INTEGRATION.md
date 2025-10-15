# Frontend-Backend Integration Guide

## Overview

This guide explains how the frontend (Next.js SPA) connects to the backend (Express.js API) for DeeCee Hair e-commerce platform.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  (Next.js 15 + React 19 + TypeScript + Firebase Auth)      │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Pages &    │───▶│   Services   │───▶│   Firebase   │ │
│  │  Components  │    │   (API)      │    │   Auth SDK   │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                              │                               │
└──────────────────────────────┼───────────────────────────────┘
                               │ HTTP + JWT Token
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│    (Express.js + MongoDB + Firebase Admin SDK)              │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Routes     │───▶│  Middleware  │───▶│  Controllers │ │
│  │              │    │ (Auth, Validate) │ │  & Models    │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                              │                               │
│                              ▼                               │
│                      ┌──────────────┐                       │
│                      │   MongoDB    │                       │
│                      └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

## Setup

### 1. Environment Variables

**Frontend (`.env.local` in project root):**
```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Backend (`backend/.env`):**
```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Firebase Admin SDK
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY="..."
FIREBASE_CLIENT_EMAIL=...

# MongoDB
MONGODB_URI=mongodb://localhost:27017/deecee-hair
```

### 2. Start Both Servers

**Terminal 1 - Frontend:**
```bash
npm run dev  # Runs on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev  # Runs on http://localhost:5000
```

## Authentication Flow

### Complete Flow Diagram

```
┌─────────┐                          ┌──────────┐                    ┌──────────┐
│ Browser │                          │ Frontend │                    │ Firebase │
└────┬────┘                          └────┬─────┘                    └────┬─────┘
     │                                    │                               │
     │ 1. Click "Sign Up"                 │                               │
     ├───────────────────────────────────▶│                               │
     │                                    │                               │
     │                                    │ 2. Create user (email/pass)   │
     │                                    ├──────────────────────────────▶│
     │                                    │                               │
     │                                    │ 3. Send verification email    │
     │                                    │◀──────────────────────────────┤
     │                                    │                               │
     │ 4. Check email & click link        │                               │
     ├───────────────────────────────────▶│                               │
     │                                    │                               │
     │                                    │ 5. User logs in               │
     │                                    ├──────────────────────────────▶│
     │                                    │                               │
     │                                    │ 6. Returns ID token           │
     │                                    │◀──────────────────────────────┤
     │                                    │                               │
     │                                    │                               │
     │                                    ▼                               │
     │                          ┌──────────────────┐                     │
     │                          │  Backend API     │                     │
     │                          └────────┬─────────┘                     │
     │                                   │                               │
     │                                   │ 7. Register user in DB        │
     │                                   │    (POST /api/auth/register)  │
     │                                   │                               │
     │                                   │ 8. Verify token with          │
     │                                   │    Firebase Admin SDK         │
     │                                   ├──────────────────────────────▶│
     │                                   │                               │
     │                                   │ 9. Token valid                │
     │                                   │◀──────────────────────────────┤
     │                                   │                               │
     │                                   │ 10. Save user to MongoDB      │
     │                                   ├──────────────────────────────▶│
     │                                   │                         MongoDB
     │                                   │                               │
     │ 11. User registered!              │                               │
     │◀──────────────────────────────────┤                               │
```

### Implementation

**Frontend (`app/contexts/AuthContext.tsx`):**
```typescript
const signup = async (name: string, email: string, password: string) => {
  try {
    // 1. Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 2. Send email verification
    await sendEmailVerification(userCredential.user);

    // 3. Register user in backend database
    const token = await userCredential.user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        firebaseUid: userCredential.user.uid,
        email: userCredential.user.email,
        name,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    // 4. Set pending verification state
    setPendingVerification({ email, password });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
```

**Backend (`backend/src/routes/auth.routes.js`):**
```javascript
router.post('/register', verifyToken, async (req, res) => {
  try {
    const { firebaseUid, email, name } = req.body;

    // Check if user already exists
    let user = await User.findOne({ firebaseUid });

    if (user) {
      return res.json({
        success: true,
        message: 'User already registered',
        user,
      });
    }

    // Create new user
    user = await User.create({
      firebaseUid,
      email,
      name,
      emailVerified: req.user.emailVerified,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
```

## Making API Requests

### Using Service Layer

All API calls should use the service layer in `app/services/`:

**Example: Get Products**
```typescript
import { getProducts } from '@/app/services';

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts({
        category: 'Clip-In Extensions',
        minPrice: 1000,
        maxPrice: 5000,
      });

      if (result.success) {
        setProducts(result.data);
      } else {
        console.error(result.message);
      }
    };

    fetchProducts();
  }, []);

  return <div>{/* Render products */}</div>;
};
```

**Example: Create Order**
```typescript
import { createOrder } from '@/app/services';

const handleCheckout = async () => {
  const orderData = {
    items: cart,
    shippingAddress: selectedAddress,
    paymentInfo: {
      method: 'card',
      transactionId: paymentResult.transactionId,
    },
  };

  const result = await createOrder(orderData);

  if (result.success) {
    console.log('Order created:', result.data);
    // Navigate to success page
  } else {
    console.error('Order failed:', result.message);
  }
};
```

**Example: Book Appointment**
```typescript
import { createAppointment } from '@/app/services';

const handleBooking = async () => {
  const appointmentData = {
    serviceType: 'Hair Extension Consultation',
    scheduledDate: '2025-02-15',
    scheduledTime: '10:00 AM',
    location: 'in-store',
    notes: 'First-time consultation',
  };

  const result = await createAppointment(appointmentData);

  if (result.success) {
    console.log('Appointment booked:', result.data);
  } else {
    console.error('Booking failed:', result.message);
  }
};
```

## Available Services

### Auth Service (`auth.service.ts`)
```typescript
import {
  registerUser,
  getUserProfile,
  updateUserProfile,
  verifyToken
} from '@/app/services';
```

### Product Service (`product.service.ts`)
```typescript
import {
  getProducts,
  getProductById,
  getCategories,
  getBestsellers,
  getNewArrivals,
  addProductReview
} from '@/app/services';
```

### Order Service (`order.service.ts`)
```typescript
import {
  getUserOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  trackOrder
} from '@/app/services';
```

### Appointment Service (`appointment.service.ts`)
```typescript
import {
  getUserAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAvailableSlots
} from '@/app/services';
```

### User Service (`user.service.ts`)
```typescript
import {
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  updateUserPreferences
} from '@/app/services';
```

### Payment Service (`payment.service.ts`)
```typescript
import {
  createPaymentIntent,
  verifyPayment,
  getPaymentDetails,
  processRefund
} from '@/app/services';
```

## Error Handling

### Service Layer Error Format

All services return a consistent format:
```typescript
{
  success: boolean;
  data?: T;            // Response data (if success)
  message?: string;    // Error/success message
  errors?: string[];   // Validation errors (if any)
}
```

### Handling Errors in Components

```typescript
const handleAction = async () => {
  try {
    const result = await someApiCall();

    if (!result.success) {
      // Show error to user
      setError(result.message || 'Something went wrong');
      return;
    }

    // Success - use result.data
    console.log(result.data);
  } catch (error) {
    // Network error or unexpected error
    setError('Network error. Please try again.');
  }
};
```

## Authentication Token Management

### How Tokens Work

1. User logs in → Firebase returns ID token
2. Token stored in memory (Firebase handles this)
3. For API calls, get fresh token:
   ```typescript
   const token = await auth.currentUser.getIdToken();
   ```
4. Include in request header:
   ```
   Authorization: Bearer <token>
   ```

### Token Expiration

Firebase tokens expire after **1 hour**. The service layer automatically gets fresh tokens:

```typescript
// app/services/api.service.ts
export const getAuthToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  // Firebase automatically refreshes expired tokens
  const token = await user.getIdToken();
  return token;
};
```

### Handling Token Errors

Backend returns specific error for expired tokens:
```json
{
  "success": false,
  "message": "Token expired - Please login again"
}
```

Frontend should catch this and redirect to login:
```typescript
if (result.message === 'Token expired - Please login again') {
  // Clear auth state
  await logout();
  // Redirect to login
  setShowLogin(true);
}
```

## CORS Configuration

Backend allows requests from frontend:

```javascript
// backend/src/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Important**: Update `FRONTEND_URL` in production to your deployed frontend URL.

## Rate Limiting

Backend has rate limiting enabled:
- **100 requests per 15 minutes** per IP address
- Applies to all `/api/*` routes

If you hit the limit:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

## Testing the Integration

### 1. Test Health Check
```bash
curl http://localhost:5000/health
```

### 2. Test Public Endpoint
```bash
curl http://localhost:5000/api/products
```

### 3. Test Protected Endpoint

First, get token from frontend console:
```javascript
auth.currentUser.getIdToken().then(console.log);
```

Then use in request:
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <your-token>"
```

### 4. Test from Frontend

Add this to any component:
```typescript
useEffect(() => {
  const testAPI = async () => {
    const result = await getProducts();
    console.log('API Test:', result);
  };
  testAPI();
}, []);
```

## Migration Path

### Current State: Client-Only
Products, cart, appointments stored in component state.

### Phase 1: Add Backend API (Now)
- Backend API running
- Service layer created
- Ready to integrate

### Phase 2: Connect Components
- Replace local state with API calls
- Use services in existing components
- Keep UI the same

### Phase 3: Add Features
- Payment processing
- Email notifications
- Order tracking
- User dashboard

## Common Issues

### CORS Error
**Error**: "Access to fetch at 'http://localhost:5000/api/products' from origin 'http://localhost:3000' has been blocked by CORS policy"

**Fix**: Ensure backend `FRONTEND_URL` matches frontend URL.

### 401 Unauthorized
**Error**: "Unauthorized - No token provided"

**Fix**:
1. Check if user is logged in
2. Verify token is being sent in header
3. Check token format: `Bearer <token>`

### Network Error
**Error**: "Failed to fetch"

**Fix**:
1. Ensure backend is running (`npm run dev` in backend/)
2. Check backend URL in `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:5000`
3. Verify port 5000 is not blocked

### Token Expired
**Error**: "Token expired - Please login again"

**Fix**: User needs to log in again. Token expires after 1 hour.

## Deployment

### Frontend Deployment (Vercel)

1. Add environment variables:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_FIREBASE_API_KEY=...
# ... other Firebase configs
```

2. Deploy:
```bash
vercel deploy --prod
```

### Backend Deployment (Render/Railway)

1. Add environment variables:
```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
MONGODB_URI=...
```

2. Deploy and get backend URL

3. Update frontend `.env.local` with backend URL

## Next Steps

1. **Implement Controllers**: Add business logic to backend routes
2. **Populate Database**: Add products from `app/constants/products.ts`
3. **Connect Components**: Replace local state with API calls
4. **Add Payment**: Integrate Stripe/Razorpay
5. **Email Notifications**: Set up order confirmations
6. **Error Monitoring**: Add Sentry for error tracking

---

**Documentation Files:**
- `BACKEND_README.md` - Complete backend API docs
- `BACKEND_QUICKSTART.md` - Backend setup guide
- `FRONTEND_BACKEND_INTEGRATION.md` - This file

**Need Help?**
- Check if both servers are running
- Verify environment variables
- Check browser console for errors
- Review backend logs for error details
