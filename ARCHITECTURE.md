# Architecture Overview

## Clean Architecture Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                         HTTP Clients                             │
│                  (Frontend, Postman, cURL)                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Express HTTP Server                          │  │
│  │                                                            │  │
│  │  Middleware:                                              │  │
│  │  • Fixed Token Authentication                            │  │
│  │  • JWT Authentication                                     │  │
│  │  • CORS                                                   │  │
│  │  • Body Parser                                            │  │
│  └───────────────────────────┬──────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼──────────────────────────────┐  │
│  │              Controllers                                  │  │
│  │                                                            │  │
│  │  • AuthController                                        │  │
│  │  • DashboardController                                   │  │
│  │  • DocumentController                                    │  │
│  │  • TransactionController                                 │  │
│  └───────────────────────────┬──────────────────────────────┘  │
│                              │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Use Cases (Business Logic)                   │  │
│  │                                                            │  │
│  │  • RegisterUserUseCase                                   │  │
│  │  • LoginUserUseCase                                      │  │
│  │  • GetUserBalanceUseCase                                 │  │
│  │  • GetDashboardDataUseCase                               │  │
│  │  • GenerateDocumentUseCase                               │  │
│  │  • GetUserDocumentsUseCase                               │  │
│  │  • GetUserTransactionsUseCase                            │  │
│  └───────────────────────────┬──────────────────────────────┘  │
│                              │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DOMAIN LAYER                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Repository Interfaces (Ports)                │  │
│  │                                                            │  │
│  │  • IUserRepository                                       │  │
│  │  • IDocumentRepository                                   │  │
│  │  • ITransactionRepository                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Entities (Business Models)                   │  │
│  │                                                            │  │
│  │  • User                                                   │  │
│  │  • Document                                               │  │
│  │  • Transaction                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                            │
│                  (Repository Implementations)                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           MongoDB Repositories (Adapters)                 │  │
│  │                                                            │  │
│  │  • MongoUserRepository                                   │  │
│  │  • MongoDocumentRepository                               │  │
│  │  • MongoTransactionRepository                            │  │
│  └───────────────────────────┬──────────────────────────────┘  │
│                              │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MongoDB Database                         │
│                                                                  │
│  Collections:                                                   │
│  • users                                                        │
│  • documents                                                    │
│  • transactions                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### Example: User Login

```
1. Frontend Request
   ↓
2. Express Server receives POST /api/auth/login
   ↓
3. Fixed Token Middleware validates fixed token
   ↓
4. AuthController.login() is called
   ↓
5. LoginUserUseCase.execute() performs business logic
   ↓
6. MongoUserRepository.findByEmail() queries database
   ↓
7. Password verification with bcrypt
   ↓
8. JWT token generation
   ↓
9. Response sent back to Frontend with token and user data
```

### Example: Get Dashboard Data (Protected Route)

```
1. Frontend Request with JWT token
   ↓
2. Express Server receives GET /api/dashboard
   ↓
3. Fixed Token Middleware validates fixed token
   ↓
4. JWT Auth Middleware validates user token
   ↓
5. DashboardController.getDashboard() is called
   ↓
6. GetDashboardDataUseCase.execute() coordinates multiple repositories
   ↓
7. Parallel queries:
   • MongoUserRepository.findById()
   • MongoDocumentRepository.findByUserId()
   • MongoTransactionRepository.findByUserId()
   ↓
8. Aggregate data and send response
```

## Design Patterns Applied

### 1. Repository Pattern
- **Purpose**: Abstracts data access logic
- **Implementation**: 
  - Domain layer defines interfaces (IUserRepository, etc.)
  - Infrastructure layer provides implementations (MongoUserRepository, etc.)
  - Use cases depend on interfaces, not concrete implementations

### 2. Dependency Injection
- **Purpose**: Loose coupling between components
- **Implementation**: 
  - Container class manages all dependencies
  - Singleton pattern for container instance
  - Dependencies injected through constructors

### 3. Use Case Pattern
- **Purpose**: Encapsulate business logic
- **Implementation**: 
  - Each use case represents a single action
  - Use cases orchestrate repositories
  - Controllers delegate to use cases

### 4. Singleton Pattern
- **Purpose**: Single instance of database connection
- **Implementation**: 
  - Database class with getInstance()
  - Container class for dependency management

### 5. Factory Pattern
- **Purpose**: Create route instances
- **Implementation**: 
  - Route factory functions (createAuthRoutes, etc.)
  - Encapsulate route creation logic

### 6. Middleware Pattern
- **Purpose**: Process requests before reaching controllers
- **Implementation**: 
  - Fixed token authentication
  - JWT token authentication
  - Error handling

### 7. MVC Pattern (Modified)
- **Purpose**: Separate concerns
- **Implementation**: 
  - Models: Domain entities + MongoDB models
  - Views: JSON responses
  - Controllers: HTTP request handlers

## Security Layers

```
Request → Fixed Token Check → JWT Token Check → Controller → Use Case
            (All API)         (Protected Routes)
```

### Layer 1: Fixed Token Authentication
- Required for all `/api/*` routes
- Validates static token from frontend
- Header: `Authorization: Bearer <FIXED_TOKEN>`

### Layer 2: JWT Authentication
- Required for protected routes after login
- Validates user session token
- Header: `x-user-token: <JWT_TOKEN>`

### Layer 3: Password Security
- Bcrypt hashing with salt rounds
- Passwords never stored in plain text
- One-way encryption

## Data Flow

```
┌─────────────┐
│   User      │
│  (Entity)   │
└──────┬──────┘
       │
       │ implements
       │
┌──────▼──────────┐     ┌──────────────┐
│ IUserRepository │◄────│  Use Case    │
│   (Interface)   │     │ (Business    │
└──────▲──────────┘     │  Logic)      │
       │                └──────▲───────┘
       │                       │
       │ implements             │ uses
       │                       │
┌──────┴──────────┐     ┌──────┴───────┐
│MongoUserRepo    │     │ Controller   │
│ (Adapter)       │     │ (HTTP)       │
└──────┬──────────┘     └──────────────┘
       │
       │ persists
       │
┌──────▼──────────┐
│   UserModel     │
│  (Mongoose)     │
└──────┬──────────┘
       │
┌──────▼──────────┐
│   MongoDB       │
└─────────────────┘
```

## Benefits of This Architecture

### 1. **Separation of Concerns**
- Each layer has a single responsibility
- Easy to understand and maintain

### 2. **Testability**
- Business logic isolated from infrastructure
- Easy to mock dependencies
- Unit tests don't require database

### 3. **Flexibility**
- Easy to swap implementations (e.g., MongoDB → PostgreSQL)
- Add new features without affecting existing code

### 4. **Scalability**
- Clear boundaries for horizontal scaling
- Can split into microservices later

### 5. **Maintainability**
- Code organized by domain concepts
- Easy to find and modify features
- Clear dependency flow

## Technology Stack

```
┌─────────────────────────────────────┐
│         Node.js v22                  │
├─────────────────────────────────────┤
│         TypeScript                   │
├─────────────────────────────────────┤
│         Express.js                   │
├─────────────────────────────────────┤
│    Middleware Stack                  │
│    • CORS                            │
│    • Body Parser                     │
│    • Custom Auth                     │
├─────────────────────────────────────┤
│    Security                          │
│    • JWT (jsonwebtoken)              │
│    • Bcrypt                          │
├─────────────────────────────────────┤
│    Database                          │
│    • MongoDB                         │
│    • Mongoose ODM                    │
└─────────────────────────────────────┘
```
