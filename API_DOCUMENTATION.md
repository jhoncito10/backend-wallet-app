# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication

All `/api/*` routes require two levels of authentication:

1. **Fixed Token** (Required for all API routes)
   - Header: `Authorization: Bearer <FIXED_TOKEN>`
   - Default: `mi-token-super-secreto-12345`

2. **JWT Token** (Required for protected routes after login)
   - Header: `x-user-token: <JWT_TOKEN>`
   - Obtained from login response

---

## Endpoints

### 1. Health Check

#### `GET /health`

Check if the server is running.

**Headers:**
- None required

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

### 2. Register User

#### `POST /api/auth/register`

Create a new user account.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "6756e7f8a9b1c2d3e4f5g6h7",
    "name": "John Doe",
    "email": "john@example.com",
    "balance": 1000
  }
}
```

**Error Response (400):**
```json
{
  "error": "User with this email already exists"
}
```

---

### 3. Login User

#### `POST /api/auth/login`

Authenticate a user and receive JWT token.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
Content-Type: application/json
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6756e7f8a9b1c2d3e4f5g6h7",
    "name": "John Doe",
    "email": "john@example.com",
    "balance": 5000
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### 4. Get Dashboard Data

#### `GET /api/dashboard`

Get consolidated dashboard data including balance, documents, and transactions.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "balance": 5000,
    "documents": [
      {
        "id": "6756e7f8a9b1c2d3e4f5g6h7",
        "userId": "6756e7f8a9b1c2d3e4f5g6h7",
        "name": "Invoice-2025-001",
        "status": "completed",
        "createdAt": "2025-12-01T00:00:00.000Z",
        "updatedAt": "2025-12-01T00:05:00.000Z"
      }
    ],
    "transactions": [
      {
        "id": "6756e7f8a9b1c2d3e4f5g6h7",
        "userId": "6756e7f8a9b1c2d3e4f5g6h7",
        "type": "recharge",
        "amount": 1000,
        "description": "Initial balance",
        "createdAt": "2025-11-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 5. Get Documents

#### `GET /api/documents`

Get all documents for the authenticated user.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "documents": [
    {
      "id": "6756e7f8a9b1c2d3e4f5g6h7",
      "userId": "6756e7f8a9b1c2d3e4f5g6h7",
      "name": "Invoice-2025-001",
      "status": "completed",
      "createdAt": "2025-12-01T00:00:00.000Z",
      "updatedAt": "2025-12-01T00:05:00.000Z"
    },
    {
      "id": "6756e7f8a9b1c2d3e4f5g6h8",
      "userId": "6756e7f8a9b1c2d3e4f5g6h7",
      "name": "Receipt-2025-042",
      "status": "processing",
      "createdAt": "2025-12-05T00:00:00.000Z",
      "updatedAt": "2025-12-05T00:00:00.000Z"
    }
  ]
}
```

---

### 6. Generate Document

#### `POST /api/documents/generate`

Generate a new document.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Invoice-2025-050"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Document generation started",
  "document": {
    "id": "6756e7f8a9b1c2d3e4f5g6h9",
    "userId": "6756e7f8a9b1c2d3e4f5g6h7",
    "name": "Invoice-2025-050",
    "status": "pending",
    "createdAt": "2025-12-10T00:00:00.000Z",
    "updatedAt": "2025-12-10T00:00:00.000Z"
  }
}
```

**Note:** The document status will automatically change to "completed" after 3 seconds (simulated processing).

---

### 7. Get Transactions

#### `GET /api/transactions`

Get all transactions for the authenticated user.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "6756e7f8a9b1c2d3e4f5g6h7",
      "userId": "6756e7f8a9b1c2d3e4f5g6h7",
      "type": "recharge",
      "amount": 1000,
      "description": "Initial balance",
      "createdAt": "2025-11-01T00:00:00.000Z"
    },
    {
      "id": "6756e7f8a9b1c2d3e4f5g6h8",
      "userId": "6756e7f8a9b1c2d3e4f5g6h7",
      "type": "expense",
      "amount": 150,
      "description": "Document generation fee",
      "createdAt": "2025-12-01T00:00:00.000Z"
    }
  ]
}
```

---

### 8. Get Balance

#### `GET /api/transactions/balance`

Get the balance for the authenticated user from the balance collection.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "balance": {
    "id": "6756e7f8a9b1c2d3e4f5g6h7",
    "userId": "6756e7f8a9b1c2d3e4f5g6h7",
    "amount": 5000,
    "currency": "USD",
    "createdAt": "2025-11-01T00:00:00.000Z",
    "updatedAt": "2025-12-10T00:00:00.000Z"
  }
}
```

**Note:** If the user doesn't have a balance record, it will be created automatically with amount 0.

---

### 9. Add Balance (Recharge)

#### `POST /api/transactions/add-balance`

Add balance to the authenticated user's account and create a recharge transaction.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**
```json
{
  "amount": 1000,
  "description": "Monthly recharge"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Balance added successfully",
  "transaction": {
    "id": "6756e7f8a9b1c2d3e4f5g6h9",
    "userId": "6756e7f8a9b1c2d3e4f5g6h7",
    "type": "recharge",
    "amount": 1000,
    "description": "Monthly recharge",
    "createdAt": "2025-12-10T00:00:00.000Z"
  },
  "newBalance": 6000
}
```

**Error Response (400):**
```json
{
  "error": "Amount must be greater than 0"
}
```

---

### 10. Deduct Balance (Expense)

#### `POST /api/transactions/deduct-balance`

Deduct balance from the authenticated user's account and create an expense transaction.

**Headers:**
```
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**
```json
{
  "amount": 150,
  "description": "Service payment"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Balance deducted successfully",
  "transaction": {
    "id": "6756e7f8a9b1c2d3e4f5g6h9",
    "userId": "6756e7f8a9b1c2d3e4f5g6h7",
    "type": "expense",
    "amount": 150,
    "description": "Service payment",
    "createdAt": "2025-12-10T00:00:00.000Z"
  },
  "newBalance": 5850
}
```

**Error Responses:**
```json
{
  "error": "Amount must be greater than 0"
}
```

```json
{
  "error": "Insufficient balance"
}
```

```json
{
  "error": "Balance not found"
}
```

---

## Data Models

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Document
```typescript
{
  id: string;
  userId: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction
```typescript
{
  id: string;
  userId: string;
  type: 'recharge' | 'expense';
  amount: number;
  description: string;
  createdAt: Date;
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```
or
```json
{
  "error": "Invalid token"
}
```

### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

### 404 Not Found
```json
{
  "error": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Detailed error message (in development mode)"
}
```

---

## Frontend Integration Example

```javascript
// 1. Register a new user
const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer mi-token-super-secreto-12345'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});

// 2. Login
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer mi-token-super-secreto-12345'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});

const { token, user } = await loginResponse.json();
// Store token in localStorage or state management
localStorage.setItem('userToken', token);

// 3. Get Dashboard Data
const dashboardResponse = await fetch('http://localhost:3000/api/dashboard', {
  headers: {
    'Authorization': 'Bearer mi-token-super-secreto-12345',
    'x-user-token': token
  }
});

const dashboardData = await dashboardResponse.json();

// 4. Generate Document
const documentResponse = await fetch('http://localhost:3000/api/documents/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer mi-token-super-secreto-12345',
    'x-user-token': token
  },
  body: JSON.stringify({
    name: 'My New Document'
  })
});
```
