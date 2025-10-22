# PhonePe Payment Gateway Integration Guide

## Overview
This guide explains how to set up and test PhonePe UPI payment integration in your DeeCee Hair e-commerce application.

---

## 📋 Prerequisites

1. **PhonePe Merchant Account**
   - Sign up at: https://business.phonepe.com/
   - Complete KYC verification
   - Get your Merchant ID, Salt Key, and Salt Index

2. **Node.js Crypto Module** (Built-in)
   - Used for SHA256 checksum generation

---

## 🔧 Setup Instructions

### Step 1: Add PhonePe Credentials to `.env.local`

Create or update your `.env.local` file with PhonePe credentials:

```bash
# ========================================
# PHONEPE PAYMENT GATEWAY
# ========================================
# Get these from PhonePe Merchant Dashboard

# For Testing (UAT/Sandbox)
NEXT_PUBLIC_PHONEPE_MERCHANT_ID=PGTESTPAYUAT
PHONEPE_SALT_KEY=099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
PHONEPE_SALT_INDEX=1
NEXT_PUBLIC_PHONEPE_ENV=sandbox

# For Production (Replace with your actual credentials)
# NEXT_PUBLIC_PHONEPE_MERCHANT_ID=your_production_merchant_id
# PHONEPE_SALT_KEY=your_production_salt_key
# PHONEPE_SALT_INDEX=1
# NEXT_PUBLIC_PHONEPE_ENV=production
```

### Step 2: Understanding the Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_PHONEPE_MERCHANT_ID` | Your merchant ID from PhonePe | `PGTESTPAYUAT` (sandbox) |
| `PHONEPE_SALT_KEY` | Salt key for checksum generation | `099eb0cd-02cf-4e2a-8aca-3e6c6aff0399` |
| `PHONEPE_SALT_INDEX` | Salt index (usually `1`) | `1` |
| `NEXT_PUBLIC_PHONEPE_ENV` | Environment: `sandbox` or `production` | `sandbox` |

---

## 🧪 Testing with PhonePe Sandbox

### Test Credentials (UAT Environment)

PhonePe provides these test credentials for sandbox testing:

```
Merchant ID: PGTESTPAYUAT
Salt Key: 099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
Salt Index: 1
```

### Test UPI IDs for Sandbox

Use these test UPI IDs to simulate different payment scenarios:

| UPI ID | Scenario | Result |
|--------|----------|--------|
| `success@ybl` | Success | Payment succeeds |
| `failure@ybl` | Failure | Payment fails |
| `pending@ybl` | Pending | Payment stays pending |

### Test Cards (If using card payment)

| Card Type | Card Number | CVV | Expiry | Result |
|-----------|-------------|-----|--------|--------|
| Success | 4111 1111 1111 1111 | 123 | Any future date | Success |
| Failure | 4000 0000 0000 0002 | 123 | Any future date | Failure |

---

## 📱 Payment Flow

### User Journey:

1. **User adds products to cart**
2. **User goes to checkout**
3. **User selects shipping address**
4. **User selects "UPI Payment (PhonePe)"**
5. **User clicks "Place Order"**
6. **System creates order in Firestore** (status: Pending)
7. **System initiates PhonePe payment**
8. **User is redirected to PhonePe payment page**
9. **User completes payment** (UPI/Cards/Net Banking)
10. **PhonePe redirects back to your app** (Profile page)
11. **PhonePe sends callback to your server**
12. **System updates order payment status** (Paid/Failed)
13. **User sees order in profile with updated status**

### Technical Flow:

```
Checkout Page
    ↓
Create Order (POST /api/orders)
    ↓
Initiate Payment (POST /api/payment/phonepe)
    ↓
Redirect to PhonePe
    ↓
User Completes Payment
    ↓
PhonePe Callback (POST /api/payment/phonepe/callback)
    ↓
Update Order Payment Status
    ↓
Redirect User to Profile
```

---

## 🔌 API Endpoints

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
    "merchantTransactionId": "TXN_ORD1234567890_1234567890123",
    "redirectUrl": "https://api-preprod.phonepe.com/..."
  }
}
```

### 2. Check Payment Status
**Endpoint:** `GET /api/payment/phonepe?merchantTransactionId=TXN_xxx`

**Response:**
```json
{
  "success": true,
  "data": {
    "merchantId": "PGTESTPAYUAT",
    "merchantTransactionId": "TXN_ORD1234567890_1234567890123",
    "transactionId": "T2312131234567890",
    "amount": 707882,
    "state": "COMPLETED",
    "responseCode": "SUCCESS"
  }
}
```

### 3. Payment Callback (PhonePe → Server)
**Endpoint:** `POST /api/payment/phonepe/callback`

**Handled automatically by PhonePe**

---

## 🔒 Security Features

### 1. Checksum Verification
- Every request to PhonePe includes SHA256 checksum
- Format: `base64_payload + endpoint + salt_key`
- Prevents tampering and ensures authenticity

### 2. Callback Verification
- PhonePe callbacks include `X-VERIFY` header
- Server verifies checksum before updating order
- Prevents fake payment confirmations

### 3. Server-Side Salt Key
- `PHONEPE_SALT_KEY` is server-side only
- Never exposed to client
- Used for checksum generation

---

## 🚀 Going to Production

### 1. Get Production Credentials
- Login to PhonePe Merchant Dashboard
- Complete KYC and business verification
- Get production Merchant ID and Salt Key

### 2. Update Environment Variables
```bash
NEXT_PUBLIC_PHONEPE_MERCHANT_ID=your_production_merchant_id
PHONEPE_SALT_KEY=your_production_salt_key
PHONEPE_SALT_INDEX=1
NEXT_PUBLIC_PHONEPE_ENV=production
```

### 3. Update Callback URL
- Register your production callback URL in PhonePe dashboard
- Format: `https://yourdomain.com/api/payment/phonepe/callback`

### 4. Enable Webhook
- Configure webhook in PhonePe dashboard
- Receive real-time payment notifications

---

## 🧪 Testing Checklist

### Sandbox Testing:
- [ ] Order creation works
- [ ] Payment initiation redirects to PhonePe
- [ ] Test with `success@ybl` - payment succeeds
- [ ] Test with `failure@ybl` - payment fails
- [ ] Order status updates correctly after payment
- [ ] User redirects to profile after payment
- [ ] Payment ID saved in order

### Production Testing:
- [ ] Test with real UPI ID
- [ ] Test with real debit/credit card
- [ ] Verify payment appears in PhonePe dashboard
- [ ] Check order status updates
- [ ] Verify callback URL is working
- [ ] Test refund process

---

## 🐛 Troubleshooting

### Issue: "PhonePe payment gateway not configured"
**Solution:** Add `NEXT_PUBLIC_PHONEPE_MERCHANT_ID` and `PHONEPE_SALT_KEY` to `.env.local`

### Issue: Payment redirects but order not updating
**Solution:**
- Check if callback URL is accessible
- Verify checksum in callback handler
- Check Firestore rules allow order updates

### Issue: "Invalid checksum" error
**Solution:**
- Verify `PHONEPE_SALT_KEY` is correct
- Check `PHONEPE_SALT_INDEX` matches dashboard
- Ensure no extra spaces in environment variables

### Issue: Payment stuck in "Pending"
**Solution:**
- Check PhonePe dashboard for transaction status
- Use status check API: `GET /api/payment/phonepe?merchantTransactionId=xxx`
- Manually update order if needed

---

## 📞 Support

### PhonePe Support:
- Merchant Support: https://business.phonepe.com/support
- API Documentation: https://developer.phonepe.com/v1/docs
- Email: merchant.support@phonepe.com

### DeeCee Hair Support:
- Check logs in browser console
- Check server logs: `npm run dev`
- Review Firestore order documents
- Check PhonePe merchant dashboard

---

## 📚 Additional Resources

1. **PhonePe API Documentation:**
   - https://developer.phonepe.com/v1/docs/pg-setup

2. **PhonePe Merchant Dashboard:**
   - UAT: https://mercury-uat.phonepe.com/
   - Production: https://www.phonepe.com/business/

3. **Payment Gateway Integration:**
   - Standard checkout flow
   - Custom checkout (advanced)
   - Subscription payments

---

## ✅ Quick Start Summary

1. Add PhonePe credentials to `.env.local`
2. Restart dev server: `npm run dev`
3. Go to checkout page
4. Select "UPI Payment (PhonePe)"
5. Click "Place Order"
6. Complete payment on PhonePe page
7. Check order status in profile

**That's it! Your PhonePe UPI payment is ready to use! 🎉**
