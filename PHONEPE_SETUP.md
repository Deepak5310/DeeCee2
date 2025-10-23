# PhonePe Payment Gateway Integration Guide (OAuth 2.0)

## Overview
This guide explains how to set up and test PhonePe UPI payment integration using the latest **OAuth 2.0 API** in your DeeCee Hair e-commerce application.

> **⚠️ API Version:** This integration uses PhonePe's new OAuth 2.0 API (v2). The old Salt Key based API is deprecated.

---

## 📋 Prerequisites

1. **PhonePe Merchant Account**
   - Sign up at: https://business.phonepe.com/
   - Complete KYC verification
   - Get your Client ID, Client Secret, and Client Version from Dashboard → Developer Settings

2. **Official Documentation**
   - API Docs: https://developer.phonepe.com/payment-gateway
   - Business Dashboard: https://business.phonepe.com/dashboard

---

## 🔧 Setup Instructions

### Step 1: Get Your API Credentials

1. Login to [PhonePe Business Dashboard](https://business.phonepe.com/dashboard)
2. Navigate to **Developer Settings** → **API Credentials**
3. Copy the following:
   - **Client ID** (e.g., `SU2510141550286609332406`)
   - **Client Secret** (e.g., `46d5c450-da73-496d-887d-ef34991804a2`)
   - **Client Version** (usually `v1`)
   - **Merchant ID** (e.g., `M23RI5GTEKXVN`)

### Step 2: Add PhonePe Credentials to `.env.local`

Create or update your `.env.local` file with PhonePe credentials:

```bash
# ========================================
# PHONEPE PAYMENT GATEWAY (OAuth 2.0 API)
# ========================================
# Get your credentials from: https://business.phonepe.com/dashboard

# Merchant ID (Your business merchant ID)
NEXT_PUBLIC_PHONEPE_MERCHANT_ID=M23RI5GTEKXVN

# Client ID (from PhonePe dashboard)
NEXT_PUBLIC_PHONEPE_CLIENT_ID=your_client_id_here

# Client Secret - KEEP SECRET (Server-side only, never expose to client)
PHONEPE_CLIENT_SECRET=your_client_secret_here

# Client Version (usually provided by PhonePe, default is v1)
PHONEPE_CLIENT_VERSION=v1

# Environment: 'sandbox' for testing, 'production' for live
NEXT_PUBLIC_PHONEPE_ENV=production
```

### Step 3: Understanding the Environment Variables

| Variable | Description | Example | Visibility |
|----------|-------------|---------|------------|
| `NEXT_PUBLIC_PHONEPE_MERCHANT_ID` | Your merchant ID from PhonePe | `M23RI5GTEKXVN` | Public |
| `NEXT_PUBLIC_PHONEPE_CLIENT_ID` | Client ID for OAuth | `SU2510141550...` | Public |
| `PHONEPE_CLIENT_SECRET` | Secret for OAuth token generation | `46d5c450-da73...` | **Server-only** |
| `PHONEPE_CLIENT_VERSION` | API version (usually `v1`) | `v1` | Server-only |
| `NEXT_PUBLIC_PHONEPE_ENV` | Environment: `sandbox` or `production` | `production` | Public |


---

## 🧪 Testing with PhonePe Sandbox

### Sandbox Environment

PhonePe provides a sandbox environment for testing:

**Sandbox URLs:**
- Auth: `https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token`
- Payment: `https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay`
- Status: `https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/status`

**To use sandbox:**
```bash
NEXT_PUBLIC_PHONEPE_ENV=sandbox
```

### Test UPI IDs for Sandbox

Use these test UPI IDs to simulate different payment scenarios:

| UPI ID | Scenario | Result |
|--------|----------|--------|
| `success@ybl` | Success | Payment succeeds |
| `failure@ybl` | Failure | Payment fails |
| `pending@ybl` | Pending | Payment stays pending |

---

## 📱 Payment Flow (OAuth 2.0)

### User Journey:

1. **User adds products to cart**
2. **User goes to checkout**
3. **User selects shipping address**
4. **User selects "UPI Payment (PhonePe)"**
5. **User clicks "Place Order"**
6. **System creates order in Firestore** (status: Pending)
7. **Server gets OAuth access token from PhonePe** (valid for ~7 days)
8. **Server initiates payment with OAuth token**
9. **User is redirected to PhonePe payment page**
10. **User completes payment** (UPI/Cards/Net Banking)
11. **PhonePe redirects back to your app** (Callback URL)
12. **User sees order in profile**
13. **Check payment status via API if needed**

### Technical Flow (OAuth 2.0):

```
Checkout Page
    ↓
Create Order (POST /api/orders)
    ↓
Get OAuth Token (POST /oauth/token) ← New Step
    ↓
Initiate Payment (POST /api/payment/phonepe)
    with Authorization: O-Bearer <token>
    ↓
Redirect to PhonePe
    ↓
User Completes Payment
    ↓
PhonePe Redirects to Your App
    ↓
Check Status (GET /api/payment/phonepe?orderId=xxx)
    ↓
Update Order Payment Status
    ↓
User Sees Updated Order
```

---

## 🔌 API Endpoints (OAuth 2.0)

### 1. Initiate Payment
**Endpoint:** `POST /api/payment/phonepe`

**Request Body:**
```json
{
  "orderId": "ORD1234567890",
  "amount": 7078.82,
  "userPhone": "9876543210",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "callbackUrl": "https://yourdomain.com/profile"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "data": {
    "orderId": "OMO123456789",
    "merchantOrderId": "ORD_ORD1234567890_1234567890123",
    "state": "PENDING",
    "redirectUrl": "https://mercury-uat.phonepe.com/transact/...",
    "expiryAt": 1703756259307
  }
}
```

### 2. Check Payment Status
**Endpoint:** `GET /api/payment/phonepe?orderId=OMO123456789`

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "OMO123456789",
    "merchantOrderId": "ORD_ORD1234567890_1234567890123",
    "state": "SUCCESS",
    "amount": 707882,
    "paymentInstrument": {
      "type": "UPI",
      "utr": "123456789012"
    },
    "createdAt": 1703756259307,
    "updatedAt": 1703756320000
  }
}
```

**Payment States:**
- `PENDING` - Payment initiated, waiting for user action
- `SUCCESS` - Payment completed successfully
- `FAILED` - Payment failed
- `EXPIRED` - Payment link expired

---

## 🔒 Security Features (OAuth 2.0)

### 1. OAuth 2.0 Token-Based Authentication
- Uses industry-standard OAuth 2.0 flow
- Access token valid for ~7 days (check `expires_at` in response)
- Token automatically refreshed when expired
- No need to manage checksums manually

### 2. Server-Side Secret Management
- `PHONEPE_CLIENT_SECRET` is server-side only
- Never exposed to client-side code
- Used only for OAuth token generation

### 3. Token Security
- Authorization header: `O-Bearer <access_token>`
- Token type: `O-Bearer` (PhonePe specific)
- Secure HTTPS communication only

---

## 🚀 Going to Production

### 1. Verify Credentials
- Ensure you have **production** Client ID and Client Secret
- Merchant ID should be your verified business ID
- Test all flows in sandbox first

### 2. Update Environment Variables
```bash
NEXT_PUBLIC_PHONEPE_MERCHANT_ID=your_production_merchant_id
NEXT_PUBLIC_PHONEPE_CLIENT_ID=your_production_client_id
PHONEPE_CLIENT_SECRET=your_production_client_secret
PHONEPE_CLIENT_VERSION=v1
NEXT_PUBLIC_PHONEPE_ENV=production
```

### 3. Update Redirect URL
- Set your production redirect URL
- Format: `https://yourdomain.com/profile` (or your success page)
- Update in checkout payment initiation

### 4. Production Testing
- Test with real UPI ID
- Test with real debit/credit card
- Verify payment appears in PhonePe merchant dashboard
- Check order status updates correctly

---

## 🧪 Testing Checklist

### Sandbox Testing:
- [ ] Credentials configured in `.env.local`
- [ ] OAuth token generation successful
- [ ] Payment initiation returns `redirectUrl`
- [ ] Redirects to PhonePe payment page
- [ ] Test with `success@ybl` UPI - payment succeeds
- [ ] Test with `failure@ybl` UPI - payment fails
- [ ] Payment status check API works
- [ ] Order status updates correctly
- [ ] User redirected to correct URL after payment

### Production Testing:
- [ ] Production credentials verified
- [ ] Test with real UPI ID
- [ ] Test with real debit/credit card
- [ ] Verify payment appears in PhonePe merchant dashboard
- [ ] Check order status updates
- [ ] Test refund process (if implemented)

---

## 🐛 Troubleshooting

### Issue: "PhonePe payment gateway not configured"
**Solution:** Ensure these environment variables are set in `.env.local`:
- `NEXT_PUBLIC_PHONEPE_CLIENT_ID`
- `PHONEPE_CLIENT_SECRET`

### Issue: "Failed to authenticate with PhonePe"
**Solution:**
- Verify `CLIENT_ID` and `CLIENT_SECRET` are correct
- Check credentials from PhonePe Dashboard → Developer Settings
- Ensure `PHONEPE_CLIENT_VERSION` is set (usually `v1`)
- No extra spaces in environment variables
- Restart dev server after changing env vars

### Issue: OAuth token not generating
**Solution:**
- Check API response in terminal logs
- Verify you're using correct environment (sandbox vs production)
- Ensure Client Secret is valid and not expired
- Check PhonePe dashboard for API access status

### Issue: Payment redirects but order not updating
**Solution:**
- Check payment status using GET endpoint
- PhonePe redirects user but doesn't send automatic callbacks in OAuth flow
- Manually check status or poll after redirect
- Update order based on status check response

### Issue: "BAD_REQUEST" or "Invalid order ID"
**Solution:**
- Verify `merchantOrderId` format (alphanumeric, _, -)
- Max length: 63 characters
- Ensure order ID is unique
- Check amount is in paise (multiply by 100)

---

## 📞 Support

### PhonePe Support:
- Business Dashboard: https://business.phonepe.com/dashboard
- API Documentation: https://developer.phonepe.com/payment-gateway
- Developer Support: Check dashboard for support options
- Email: Support available through merchant dashboard

### DeeCee Hair Support:
- Check logs in browser console (Network tab)
- Check server logs in terminal: `npm run dev`
- Review Firestore order documents
- Check PhonePe merchant dashboard for transaction status

---

## 📚 Additional Resources

1. **PhonePe Official Documentation:**
   - Main Docs: https://developer.phonepe.com/payment-gateway
   - Authorization (OAuth): https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/api-reference/authorization
   - Create Payment: https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/api-reference/create-payment
   - Order Status: https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/api-reference/order-status

2. **PhonePe Merchant Dashboard:**
   - Production: https://business.phonepe.com/dashboard
   - Access API credentials, transaction reports, settlements

3. **Integration Guides:**
   - Website Integration (Standard Checkout)
   - Backend SDKs (Java, Python, Node.js, PHP, .NET)
   - Mobile SDKs (Android, iOS, Flutter, React Native)

---

## 🔄 Migration from Old API

If you previously used the Salt Key based API, here are the key changes:

### Old API (Deprecated):
- Used `PHONEPE_SALT_KEY` and `PHONEPE_SALT_INDEX`
- Manual SHA256 checksum generation
- Base64 encoded payload with `X-VERIFY` header
- Endpoint: `/apis/hermes/pg/v1/pay`

### New OAuth 2.0 API (Current):
- Uses `CLIENT_ID` and `CLIENT_SECRET`
- OAuth 2.0 token-based authentication
- `Authorization: O-Bearer <token>` header
- Endpoint: `/apis/pg/checkout/v2/pay`

**Migration Steps:**
1. Get new credentials from PhonePe Dashboard → Developer Settings
2. Update `.env.local` with Client ID and Client Secret
3. Remove old Salt Key variables (optional, for backward compatibility)
4. Test with sandbox environment first
5. Deploy to production

---

## ✅ Quick Start Summary

1. **Get Credentials**
   - Login to https://business.phonepe.com/dashboard
   - Go to Developer Settings → API Credentials
   - Copy Client ID, Client Secret, Client Version

2. **Configure Environment**
   ```bash
   NEXT_PUBLIC_PHONEPE_CLIENT_ID=your_client_id
   PHONEPE_CLIENT_SECRET=your_client_secret
   PHONEPE_CLIENT_VERSION=v1
   NEXT_PUBLIC_PHONEPE_ENV=production
   ```

3. **Test Payment Flow**
   - Restart dev server: `npm run dev`
   - Go to checkout page
   - Select "UPI Payment (PhonePe)"
   - Click "Place Order"
   - Complete payment on PhonePe page
   - Check order status in profile

**That's it! Your PhonePe OAuth 2.0 payment is ready to use! 🎉**

---

## 💡 Pro Tips

1. **Token Caching:** OAuth tokens are valid for ~7 days. Consider caching tokens to reduce API calls.

2. **Error Handling:** Always handle OAuth errors gracefully and show user-friendly messages.

3. **Logging:** Keep detailed logs of payment initiation and status checks for debugging.

4. **Testing:** Use sandbox thoroughly before going live. Test all payment scenarios (success, failure, timeout).

5. **Security:** Never expose `PHONEPE_CLIENT_SECRET` to client-side code. Always use server-side API routes.

6. **Monitoring:** Regularly check PhonePe merchant dashboard for failed transactions and reconciliation.

7. **Customer Support:** Keep transaction IDs accessible for customer support queries.

---

**Last Updated:** October 23, 2025 | **API Version:** OAuth 2.0 (v2)
````
