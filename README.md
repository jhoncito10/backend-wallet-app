# Backend Wallet App

Backend application built with Node.js 22, Express, TypeScript, and MongoDB following clean architecture principles.

## 🏗️ Architecture

This project implements **Clean Architecture** with the following layers:

- **Domain Layer**: Business entities and repository interfaces (ports)
- **Application Layer**: Use cases (business logic)
- **Infrastructure Layer**: External implementations (databases, HTTP, etc.)

### Design Patterns Applied

- **Repository Pattern**: Abstraction over data access
- **Dependency Injection**: Loose coupling between components
- **Singleton Pattern**: Database and container instances
- **Factory Pattern**: Route creation
- **MVC Pattern**: Controllers for HTTP handling

## 📋 Features

### Authentication
- User registration with password hashing
- User login with JWT token generation
- Fixed token authentication for API security

### Dashboard
- Get user balance
- List user documents
- List user transactions
- Consolidated dashboard data

### Documents
- Generate new documents
- List user documents with status
- Document status tracking (pending, processing, completed, failed)

### Transactions
- List user transactions (recharges and expenses)
- Transaction history with timestamps

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- MongoDB running locally or a connection string
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Configure your `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wallet-app
NODE_ENV=development
FIXED_TOKEN=mi-token-super-secreto-12345
JWT_SECRET=jwt-secret-key-for-internal-use
```

### Running the Application

#### Development mode:
```bash
npm run dev
```

#### Production mode:
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Public Routes

#### Health Check
```http
GET /health
```

### Authentication Routes
All routes require `Authorization: Bearer <FIXED_TOKEN>` header.

#### Register User
```http
POST /api/auth/register
Content-Type: application/json
Authorization: Bearer mi-token-super-secreto-12345

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json
Authorization: Bearer mi-token-super-secreto-12345

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes JWT token to use in protected routes.

### Protected Routes
All protected routes require both headers:
- `Authorization: Bearer <FIXED_TOKEN>`
- `x-user-token: <JWT_TOKEN>` (received from login)

#### Get Dashboard Data
```http
GET /api/dashboard
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: <JWT_TOKEN>
```

#### Get Documents
```http
GET /api/documents
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: <JWT_TOKEN>
```

#### Generate Document
```http
POST /api/documents/generate
Content-Type: application/json
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: <JWT_TOKEN>

{
  "name": "Invoice-2025-001"
}
```

#### Get Transactions
```http
GET /api/transactions
Authorization: Bearer mi-token-super-secreto-12345
x-user-token: <JWT_TOKEN>
```

## 🔒 Security

- **Fixed Token**: All API routes require a fixed token sent from the frontend
- **JWT Authentication**: User sessions managed with JWT tokens
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Enabled**: Configured for cross-origin requests

## 📁 Project Structure

```
backend-wallet-app/
├── src/
│   ├── domain/
│   │   ├── entities/          # Business entities
│   │   └── repositories/      # Repository interfaces (ports)
│   ├── application/
│   │   └── use-cases/         # Business logic
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── mongodb/       # MongoDB implementation
│   │   ├── http/
│   │   │   ├── controllers/   # HTTP controllers
│   │   │   └── routes/        # Route definitions
│   │   ├── middleware/        # Authentication middleware
│   │   └── di/                # Dependency injection
│   └── server.ts              # Application entry point
├── package.json
├── tsconfig.json
└── .env.example
```

## 🧪 Testing with cURL

### Register a user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mi-token-super-secreto-12345" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mi-token-super-secreto-12345" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Get Dashboard (use token from login response):
```bash
curl -X GET http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer mi-token-super-secreto-12345" \
  -H "x-user-token: YOUR_JWT_TOKEN_HERE"
```

## 🛠️ Technologies

- **Node.js 22**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB + Mongoose**: Database and ODM
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT token generation
- **dotenv**: Environment variables
- **CORS**: Cross-origin resource sharing

## 📝 License

ISC
