# Backend API Documentation

## Overview

This is the Express.js backend API for DeeCee Hair e-commerce platform. It provides RESTful endpoints for authentication, products, orders, appointments, and payments.

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose 8.0.3
- **Authentication**: Firebase Admin SDK
- **Payment Gateways**: Stripe, Razorpay
- **Email**: Nodemailer
- **Security**: Helmet, CORS, express-rate-limit

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── firebase.config.js     # Firebase Admin SDK initialization
│   │   └── db.config.js            # MongoDB connection
│   ├── middleware/
│   │   ├── auth.middleware.js      # JWT/Firebase token verification
│   │   ├── error.middleware.js     # Global error handling
│   │   └── validation.middleware.js # Input validation helpers
│   ├── models/
│   │   ├── User.model.js           # User schema
│   │   ├── Order.model.js          # Order schema
│   │   └── Appointment.model.js    # Appointment schema
│   ├── routes/
│   │   ├── auth.routes.js          # Auth endpoints
│   │   ├── product.routes.js       # Product endpoints
│   │   ├── order.routes.js         # Order endpoints
│   │   ├── user.routes.js          # User profile endpoints
│   │   ├── appointment.routes.js   # Appointment endpoints
│   │   └── payment.routes.js       # Payment endpoints
│   └── server.js                   # Main Express app
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
└── package.json                    # Dependencies and scripts
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

**Required Environment Variables:**

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

# MongoDB
MONGODB_URI=mongodb://localhost:27017/deecee-hair

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Payment Gateways (Optional)
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@deeceehair.com
```

### 3. Get Firebase Admin Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the ⚙️ icon → **Project settings**
4. Navigate to **Service accounts** tab
5. Click **Generate new private key**
6. Download the JSON file
7. Extract the values:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep `\n` as is, wrap in quotes)
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

### 4. Start MongoDB

**Option 1: Local MongoDB**
```bash
# Install MongoDB
sudo apt-get install mongodb  # Ubuntu/Debian
brew install mongodb-community # macOS

# Start MongoDB
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string → Update `MONGODB_URI`

### 5. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## API Endpoints

### Base URL
- Development: `http://localhost:5000`
- Production: Your deployed backend URL

### Health Check
```
GET /health
```
Returns server status and uptime.

---

## Authentication Endpoints

### Register User
```
POST /api/auth/register
```
**Body:**
```json
{
  "firebaseUid": "string",
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Get Profile
```
GET /api/auth/profile
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Update Profile
```
PUT /api/auth/profile
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```
**Body:**
```json
{
  "name": "Updated Name"
}
```

### Verify Token
```
POST /api/auth/verify-token
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

---

## Product Endpoints

### Get All Products
```
GET /api/products
```
**Query Parameters:**
- `category`: Filter by category
- `color`: Filter by color
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `sort`: Sort order (price_asc, price_desc, newest)
- `search`: Search query

### Get Product by ID
```
GET /api/products/:productId
```

### Get Categories
```
GET /api/products/categories
```

### Get Bestsellers
```
GET /api/products/bestsellers
```

### Get New Arrivals
```
GET /api/products/new-arrivals
```

---

## Order Endpoints

### Get User Orders
```
GET /api/orders
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Get Order by ID
```
GET /api/orders/:orderId
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Create Order
```
POST /api/orders
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```
**Body:**
```json
{
  "items": [
    {
      "productId": "string",
      "quantity": 1,
      "price": 2999,
      "color": "Natural Black",
      "size": "18 inches"
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "phone": "+919876543210",
    "addressLine1": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postalCode": "400001",
    "country": "India"
  },
  "paymentInfo": {
    "method": "card",
    "transactionId": "txn_123456"
  }
}
```

### Cancel Order
```
PUT /api/orders/:orderId/cancel
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Track Order
```
GET /api/orders/:orderId/track
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

---

## Appointment Endpoints

### Get User Appointments
```
GET /api/appointments
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Get Appointment by ID
```
GET /api/appointments/:appointmentId
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Create Appointment
```
POST /api/appointments
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```
**Body:**
```json
{
  "serviceType": "Hair Extension Consultation",
  "scheduledDate": "2025-02-15",
  "scheduledTime": "10:00 AM",
  "location": "in-store",
  "notes": "First-time consultation"
}
```

### Update Appointment
```
PUT /api/appointments/:appointmentId
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Cancel Appointment
```
DELETE /api/appointments/:appointmentId
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Get Available Slots
```
GET /api/appointments/slots/available?date=2025-02-15&serviceType=Hair%20Extension%20Consultation
```

---

## User Endpoints

### Get Addresses
```
GET /api/users/addresses
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Add Address
```
POST /api/users/addresses
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```
**Body:**
```json
{
  "name": "Home",
  "phone": "+919876543210",
  "addressLine1": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "postalCode": "400001",
  "country": "India",
  "isDefault": true
}
```

### Update Address
```
PUT /api/users/addresses/:addressId
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Delete Address
```
DELETE /api/users/addresses/:addressId
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Update Preferences
```
PUT /api/users/preferences
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```
**Body:**
```json
{
  "currency": "USD",
  "notifications": {
    "email": true,
    "sms": false
  }
}
```

---

## Payment Endpoints

### Create Payment Intent
```
POST /api/payments/create-intent
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```
**Body:**
```json
{
  "amount": 5998,
  "currency": "INR",
  "paymentMethod": "card"
}
```

### Verify Payment
```
POST /api/payments/verify
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```
**Body:**
```json
{
  "paymentId": "pay_123456",
  "orderId": "order_123456"
}
```

### Get Payment Details
```
GET /api/payments/:paymentId
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```

### Process Refund
```
POST /api/payments/refund
```
**Headers:**
```
Authorization: Bearer <firebase-token>
```
**Body:**
```json
{
  "paymentId": "pay_123456",
  "amount": 2999,
  "reason": "Product defective"
}
```

---

## Authentication Flow

### Client-Side (Frontend)

1. User signs up/logs in using Firebase Authentication
2. Firebase returns an ID token
3. Store token in memory or secure storage
4. Include token in all API requests:
   ```javascript
   const token = await user.getIdToken();
   fetch('http://localhost:5000/api/orders', {
     headers: {
       'Authorization': `Bearer ${token}`
     }
   });
   ```

### Server-Side (Backend)

1. Extract token from `Authorization` header
2. Verify token using Firebase Admin SDK
3. Extract user info (uid, email, emailVerified)
4. Attach user info to `req.user`
5. Proceed with request or return 401 Unauthorized

## Middleware

### Authentication Middleware

**verifyToken** - Requires valid Firebase token
```javascript
import { verifyToken } from '../middleware/auth.middleware.js';
router.get('/protected', verifyToken, handler);
```

**optionalAuth** - Works with or without token
```javascript
import { optionalAuth } from '../middleware/auth.middleware.js';
router.get('/public', optionalAuth, handler);
```

**requireEmailVerification** - Requires verified email
```javascript
import { requireEmailVerification } from '../middleware/auth.middleware.js';
router.post('/sensitive', verifyToken, requireEmailVerification, handler);
```

### Error Handling

All errors are caught by global error handler:
```javascript
app.use(errorHandler);
```

Returns consistent error format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## Database Models

### User Model
- firebaseUid (unique, indexed)
- email (unique, indexed)
- name
- emailVerified
- addresses (embedded array)
- orders (references)
- appointments (references)
- preferences

### Order Model
- orderId (unique, indexed)
- userId (reference to User)
- firebaseUid (indexed)
- items (embedded array)
- shippingAddress (embedded)
- paymentInfo (embedded)
- pricing (embedded)
- status (pending, confirmed, processing, shipped, delivered, cancelled)
- statusHistory (tracking)

### Appointment Model
- appointmentId (unique, indexed)
- userId (reference to User)
- firebaseUid (indexed)
- customerInfo (embedded)
- serviceType (enum)
- scheduledDate, scheduledTime
- status (pending, confirmed, completed, cancelled, rescheduled)
- location (in-store, home-service, virtual)
- statusHistory (tracking)

## Security Features

### Rate Limiting
- 100 requests per 15 minutes per IP
- Configurable via environment variables

### CORS
- Configured to allow frontend URL only
- Credentials enabled for cookies/auth
- Specific HTTP methods allowed

### Helmet
- Security headers automatically set
- XSS protection, clickjacking prevention

### Input Validation
- Email and phone regex validation
- XSS sanitization helpers
- Request body validation

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation failed) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (email not verified) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

## Development Tips

### Testing Endpoints

Use tools like:
- **Postman** - API testing GUI
- **Thunder Client** - VS Code extension
- **curl** - Command line

Example curl request:
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer <your-firebase-token>"
```

### Getting Firebase Token

In your frontend console:
```javascript
const user = auth.currentUser;
const token = await user.getIdToken();
console.log(token);
```

### Checking Logs

Server logs include:
- Request method, URL, status code (Morgan)
- Firebase Admin initialization status
- MongoDB connection status
- Error stack traces (in development)

## Deployment

### Environment Setup
1. Set all required environment variables on your hosting platform
2. Ensure MongoDB is accessible (Atlas recommended for production)
3. Configure CORS to allow your production frontend URL
4. Enable rate limiting with appropriate limits

### Recommended Platforms
- **Render** - Easy Node.js deployment
- **Railway** - Good for Node + MongoDB
- **Heroku** - Classic PaaS option
- **AWS EC2** - Full control

### Production Checklist
- ✅ Set `NODE_ENV=production`
- ✅ Use strong rate limit values
- ✅ Enable MongoDB authentication
- ✅ Use environment variables (never hardcode secrets)
- ✅ Set up SSL/HTTPS
- ✅ Configure proper CORS origins
- ✅ Set up error monitoring (Sentry)
- ✅ Configure logging (Winston)

## Next Steps

1. **Implement Controllers**: Create controller files to handle business logic
2. **Add Product Data**: Populate MongoDB with products from `app/constants/products.ts`
3. **Payment Integration**: Implement Stripe/Razorpay payment processing
4. **Email Notifications**: Set up order confirmation, appointment reminders
5. **Testing**: Write unit and integration tests
6. **Documentation**: Generate Swagger/OpenAPI docs

## Support

For issues or questions:
- Check environment variables are correctly set
- Verify Firebase Admin credentials
- Ensure MongoDB is running
- Check server logs for error details
- Verify frontend is sending correct token format

---

**Last Updated**: January 2025
**Version**: 1.0.0
