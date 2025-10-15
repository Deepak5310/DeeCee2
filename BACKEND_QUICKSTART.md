# Backend Quick Start Guide

## 🚀 Get Your Backend Running in 5 Minutes

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages (Express, Firebase Admin, MongoDB, etc.).

---

### Step 2: Set Up Environment Variables

The `.env` file has been created for you. You need to fill in these **required** values:

#### 2.1 Firebase Admin Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **deecee-hair-ecommerce** (or your project name)
3. Click the ⚙️ icon → **Project settings**
4. Navigate to **Service accounts** tab
5. Click **Generate new private key** button
6. Download the JSON file
7. Open the JSON file and copy these values to your `.env`:

```env
FIREBASE_PROJECT_ID=deecee-hair-ecommerce
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@deecee-hair-ecommerce.iam.gserviceaccount.com
```

⚠️ **Important**: Keep the `\n` characters in the private key and wrap it in double quotes.

#### 2.2 MongoDB Connection (Optional for now)

You can skip this initially. The backend will run without MongoDB.

If you want to use MongoDB:

**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/deecee-hair
```

**Option B: MongoDB Atlas (Free Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Add to `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/deecee-hair
```

#### 2.3 Frontend URL

Already set correctly:
```env
FRONTEND_URL=http://localhost:3000
```

---

### Step 3: Start the Server

```bash
npm run dev
```

You should see:
```
✅ Firebase Admin SDK initialized successfully
✅ MongoDB Connected: cluster0-shard-00-00.mongodb.net  # (if MongoDB configured)
🚀 Server running on port 5000
📝 Environment: development
🌐 Frontend URL: http://localhost:3000
```

If you see "MongoDB URI not found" - that's okay! MongoDB is optional for testing.

---

### Step 4: Test the API

Open your browser or Postman and try:

**Health Check:**
```
http://localhost:5000/health
```

**API Welcome:**
```
http://localhost:5000/
```

You should get JSON responses!

---

## 🧪 Testing Protected Endpoints

To test endpoints that require authentication:

### 1. Get Firebase Token from Frontend

1. Start your frontend (`npm run dev` in main directory)
2. Sign up or log in
3. Open browser console (F12)
4. Run this command:
```javascript
auth.currentUser.getIdToken().then(token => console.log(token));
```
5. Copy the token

### 2. Use Token in API Requests

**Using Postman:**
1. Create a new request
2. Set URL: `http://localhost:5000/api/auth/profile`
3. Go to **Headers** tab
4. Add header:
   - Key: `Authorization`
   - Value: `Bearer <paste-your-token-here>`
5. Send request

**Using curl:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <your-token-here>"
```

**Using Thunder Client (VS Code Extension):**
1. Install Thunder Client extension
2. Create new request
3. Set URL and add Authorization header
4. Send request

---

## 📋 Available Endpoints

### Public Endpoints (No Auth Required)
- `GET /health` - Server health check
- `GET /` - API welcome message
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories` - Get categories
- `GET /api/products/bestsellers` - Get bestsellers

### Protected Endpoints (Auth Required)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Book appointment
- `GET /api/users/addresses` - Get saved addresses
- `POST /api/users/addresses` - Add new address

See `BACKEND_README.md` for complete API documentation.

---

## 🔧 Troubleshooting

### Error: "Firebase Admin SDK initialization failed"

**Cause**: Missing or incorrect Firebase credentials in `.env`

**Fix**:
1. Double-check your `.env` file
2. Ensure `FIREBASE_PRIVATE_KEY` has `\n` characters intact
3. Wrap private key in double quotes
4. Verify project ID and client email match your Firebase project

### Error: "EADDRINUSE: address already in use :::5000"

**Cause**: Port 5000 is already in use

**Fix**:
```bash
# Option 1: Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Option 2: Change port in .env
PORT=5001
```

### Warning: "MongoDB URI not found"

**Cause**: No MongoDB connection string in `.env`

**Fix**: This is okay for testing! Add MongoDB later when needed.

To add MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/deecee-hair
```

### Error: "Unauthorized - No token provided"

**Cause**: Trying to access protected endpoint without token

**Fix**:
1. Get token from frontend (see "Testing Protected Endpoints")
2. Add `Authorization: Bearer <token>` header to request

### Error: "Token expired - Please login again"

**Cause**: Firebase token expired (tokens expire after 1 hour)

**Fix**: Get a fresh token from frontend

---

## 🎯 Next Steps

Now that your backend is running:

1. **Test API Endpoints**: Use Postman/Thunder Client to test all routes
2. **Connect Frontend to Backend**: Create API service layer in frontend
3. **Implement Controllers**: Add business logic to route handlers
4. **Add Product Data**: Populate MongoDB with products
5. **Set Up Payment Gateway**: Integrate Stripe or Razorpay
6. **Add Email Notifications**: Configure SMTP for order confirmations

---

## 📚 Documentation Files

- `BACKEND_README.md` - Complete API documentation
- `.env.example` - Environment variables template
- `.env` - Your actual environment variables (DO NOT commit!)

---

## 🆘 Need Help?

**Common Issues:**
- Check `.env` file is in `backend/` directory
- Verify all required env vars are set
- Check server logs for detailed error messages
- Ensure frontend is running on port 3000
- Verify Firebase credentials are correct

**Still stuck?**
- Review `BACKEND_README.md` for detailed explanations
- Check Firebase Console for service account status
- Verify Node.js version (should be 18+)

---

## ✅ Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Firebase Admin credentials in `.env`
- [ ] Server starts without errors (`npm run dev`)
- [ ] Health check endpoint works (`http://localhost:5000/health`)
- [ ] Can get products (`http://localhost:5000/api/products`)
- [ ] Can access profile with token (`http://localhost:5000/api/auth/profile`)

---

**Happy Coding! 🚀**

If everything above works, your backend is ready for development!
