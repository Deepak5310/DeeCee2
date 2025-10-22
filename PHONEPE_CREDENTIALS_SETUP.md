# 🚀 Quick Setup: Add Your PhonePe Credentials

## Step 1: Open `.env.local` file

Create or open the `.env.local` file in the root of your project.

## Step 2: Add PhonePe Credentials

Add these lines at the end of your `.env.local` file:

```bash
# ========================================
# PHONEPE PAYMENT GATEWAY
# ========================================
# Replace with your actual PhonePe credentials

# Your PhonePe Merchant ID (from PhonePe dashboard)
NEXT_PUBLIC_PHONEPE_MERCHANT_ID=your_merchant_id_here

# Your Salt Key (KEEP THIS SECRET - Server side only)
PHONEPE_SALT_KEY=your_salt_key_here

# Salt Index (usually 1)
PHONEPE_SALT_INDEX=1

# Environment: 'sandbox' for testing, 'production' for live
NEXT_PUBLIC_PHONEPE_ENV=sandbox
```

## Step 3: Replace Placeholder Values

Replace these values with your actual PhonePe credentials:
- `your_merchant_id_here` → Your actual Merchant ID
- `your_salt_key_here` → Your actual Salt Key

## Step 4: For Testing (Optional)

If you want to test first with PhonePe's sandbox, use these test credentials:

```bash
NEXT_PUBLIC_PHONEPE_MERCHANT_ID=PGTESTPAYUAT
PHONEPE_SALT_KEY=099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
PHONEPE_SALT_INDEX=1
NEXT_PUBLIC_PHONEPE_ENV=sandbox
```

## Step 5: Restart Development Server

After adding credentials, restart your dev server:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 6: Test Payment

1. Go to checkout page
2. Add products to cart
3. Select "UPI Payment (PhonePe)"
4. Click "Place Order"
5. You'll be redirected to PhonePe payment page

## 🔒 Security Notes

- **NEVER commit `.env.local` to Git** - It's already in `.gitignore`
- `PHONEPE_SALT_KEY` is secret - only server can access it
- `NEXT_PUBLIC_*` variables are safe to expose to browser

## 📚 Need More Help?

See complete documentation in `PHONEPE_SETUP.md`

---

**That's it! Your PhonePe UPI payment is ready! 🎉**
