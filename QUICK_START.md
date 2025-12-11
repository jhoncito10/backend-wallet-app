# Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher, v22 recommended)
- MongoDB (running locally or cloud instance)
- npm or yarn

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
The `.env` file has already been created. Verify/modify if needed:

```bash
cat .env
```

Default configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wallet-app
NODE_ENV=development
FIXED_TOKEN=mi-token-super-secreto-12345
JWT_SECRET=jwt-secret-key-for-internal-use
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

**For macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**For Linux:**
```bash
sudo systemctl start mongod
```

**For Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Seed the Database (Optional but Recommended)
Populate the database with demo data:
```bash
npm run seed
```

This creates:
- Demo user: `demo@example.com` / `demo123`
- Initial balance: 5000
- 4 sample documents
- 7 sample transactions

### 5. Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Testing the API

### Option 1: Using cURL

**1. Login with demo account:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mi-token-super-secreto-12345" \
  -d '{"email":"demo@example.com","password":"demo123"}'
```

**2. Copy the token from the response and use it:**
```bash
# Replace YOUR_JWT_TOKEN with the actual token
curl -X GET http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer mi-token-super-secreto-12345" \
  -H "x-user-token: YOUR_JWT_TOKEN"
```

### Option 2: Using Postman

1. Import the Postman collection:
   - File: `postman_collection.json`
   - Collection includes all endpoints pre-configured

2. Use the "Login User" request to get a JWT token
3. The token will automatically be saved for subsequent requests

### Option 3: Frontend Integration

Your frontend should:

1. **For registration/login:**
```javascript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer mi-token-super-secreto-12345'
  },
  body: JSON.stringify({
    email: 'demo@example.com',
    password: 'demo123'
  })
});

const { token, user } = await response.json();
localStorage.setItem('userToken', token);
```

2. **For protected endpoints:**
```javascript
const response = await fetch('http://localhost:3000/api/dashboard', {
  headers: {
    'Authorization': 'Bearer mi-token-super-secreto-12345',
    'x-user-token': localStorage.getItem('userToken')
  }
});

const data = await response.json();
```

## Available Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/health` | No | Health check |
| POST | `/api/auth/register` | Fixed Token | Register new user |
| POST | `/api/auth/login` | Fixed Token | Login user |
| GET | `/api/dashboard` | Both | Get dashboard data |
| GET | `/api/documents` | Both | Get user documents |
| POST | `/api/documents/generate` | Both | Generate new document |
| GET | `/api/transactions` | Both | Get user transactions |

**Auth Types:**
- **Fixed Token**: `Authorization: Bearer mi-token-super-secreto-12345`
- **Both**: Fixed Token + JWT Token (`x-user-token` header)

## Demo Accounts

After running `npm run seed`, you can use:

**Account 1:**
- Email: `demo@example.com`
- Password: `demo123`
- Balance: 5000
- Documents: 4
- Transactions: 7

**Account 2:**
- Email: `jane@example.com`
- Password: `demo123`
- Balance: 3500

## Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error
```
**Solution:** Make sure MongoDB is running on `mongodb://localhost:27017`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change the PORT in `.env` file or stop the process using port 3000

### Unauthorized Error
```
{"error": "Invalid token"}
```
**Solution:** Verify you're sending the correct fixed token in the Authorization header

### JWT Token Expired
```
{"error": "Invalid user token"}
```
**Solution:** Login again to get a new JWT token (tokens expire after 7 days)

## Project Structure

```
backend-wallet-app/
├── src/
│   ├── domain/               # Business entities and interfaces
│   ├── application/          # Use cases (business logic)
│   ├── infrastructure/       # External implementations
│   │   ├── database/        # MongoDB models and repositories
│   │   ├── http/            # Express app, controllers, routes
│   │   ├── middleware/      # Authentication middleware
│   │   └── di/              # Dependency injection container
│   ├── scripts/             # Utility scripts (seed, etc.)
│   └── server.ts            # Application entry point
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Full documentation
├── API_DOCUMENTATION.md      # API reference
└── postman_collection.json   # Postman collection
```

## Next Steps

1. ✅ Start the server: `npm run dev`
2. ✅ Test with the demo account
3. ✅ Review the API documentation in `API_DOCUMENTATION.md`
4. ✅ Integrate with your frontend
5. ✅ Customize the fixed token in production

## Support

For more information, see:
- [README.md](README.md) - Full project documentation
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete API reference

## Production Deployment

Before deploying to production:

1. Update `.env` with production values
2. Set `NODE_ENV=production`
3. Use a strong JWT secret
4. Change the fixed token
5. Use a MongoDB cloud instance (MongoDB Atlas)
6. Build the project: `npm run build`
7. Start with: `npm start`

Enjoy coding! 🚀
