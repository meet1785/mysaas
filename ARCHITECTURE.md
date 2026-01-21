# MySaaS Architecture

## Overview

MySaaS is a full-stack Software as a Service (SaaS) application built with modern web technologies. This document provides an overview of the system architecture, components, and design decisions.

## Technology Stack

### Backend
- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL v16+
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **Payment Processing**: Stripe (configured, ready to implement)
- **Security**: Helmet.js, CORS, express-rate-limit
- **Validation**: express-validator
- **Logging**: Morgan

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Payment UI**: Stripe React Components (configured)

### DevOps
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx (for frontend)
- **CI/CD**: GitHub Actions
- **Testing**: Jest (backend), Vitest (frontend)
- **Linting**: ESLint

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  React Frontend (TypeScript + Vite)                       │  │
│  │  - Pages: Home, Login, Register, Dashboard               │  │
│  │  - Context: Authentication                               │  │
│  │  - Services: API Client (Axios)                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Nginx (Reverse Proxy)                                    │  │
│  │  - Static file serving                                   │  │
│  │  - API proxying                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Express.js Backend (TypeScript + Node.js)               │  │
│  │                                                           │  │
│  │  Middleware Stack:                                       │  │
│  │  ├─ Helmet (Security headers)                            │  │
│  │  ├─ CORS (Cross-origin)                                  │  │
│  │  ├─ Rate Limiting (General + Auth specific)              │  │
│  │  ├─ Morgan (Logging)                                     │  │
│  │  └─ Error Handler                                        │  │
│  │                                                           │  │
│  │  Routes:                                                 │  │
│  │  ├─ /health (Health check)                               │  │
│  │  └─ /api/auth                                            │  │
│  │      ├─ POST /register                                   │  │
│  │      ├─ POST /login                                      │  │
│  │      └─ GET /profile (Protected)                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        Data Layer                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                      │  │
│  │                                                           │  │
│  │  Tables:                                                 │  │
│  │  ├─ users (id, email, password, name, timestamps)        │  │
│  │  └─ subscriptions (user_id, stripe_ids, plan, status)    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Details

### Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── index.ts           # Configuration management
│   │   └── database.ts        # PostgreSQL connection pool
│   ├── controllers/
│   │   └── auth.controller.ts # Authentication logic
│   ├── middleware/
│   │   ├── auth.middleware.ts      # JWT verification
│   │   ├── error.middleware.ts     # Error handling
│   │   └── rateLimit.middleware.ts # Rate limiting
│   ├── routes/
│   │   └── auth.routes.ts     # Authentication routes
│   └── index.ts               # Application entry point
├── database/
│   └── init.sql               # Database schema
└── Dockerfile                 # Container configuration
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── PrivateRoute.tsx   # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.tsx    # Authentication state
│   ├── pages/
│   │   ├── Home.tsx           # Landing page
│   │   ├── Login.tsx          # Login page
│   │   ├── Register.tsx       # Registration page
│   │   └── Dashboard.tsx      # User dashboard
│   ├── services/
│   │   └── api.ts             # API client
│   ├── types/
│   │   ├── auth.ts            # Auth types
│   │   └── error.ts           # Error types
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point
└── Dockerfile                 # Container configuration
```

## Security Features

### Authentication & Authorization
- **Password Security**: bcrypt with salt rounds
- **Token-based Auth**: JWT with configurable expiration
- **Protected Routes**: Middleware-based route protection
- **Token Storage**: localStorage with automatic cleanup

### API Security
- **Rate Limiting**: 
  - General: 100 requests/15min per IP
  - Auth: 5 attempts/15min per IP
- **Security Headers**: Helmet.js configuration
- **CORS**: Configurable cross-origin settings
- **Input Validation**: express-validator for all inputs
- **SQL Injection Protection**: Parameterized queries

### CI/CD Security
- **Least Privilege**: Minimal GitHub Actions permissions
- **Security Scanning**: CodeQL analysis in CI/CD
- **Container Security**: Non-root user in containers

## Data Flow

### User Registration Flow
```
1. User submits registration form (Frontend)
2. Form validation (Frontend)
3. POST /api/auth/register (Rate limited)
4. Input validation (Backend)
5. Check existing user (Database query)
6. Hash password with bcrypt
7. Insert user record (Database)
8. Generate JWT token
9. Return user data + token
10. Store token in localStorage (Frontend)
11. Redirect to dashboard
```

### User Login Flow
```
1. User submits login form (Frontend)
2. Form validation (Frontend)
3. POST /api/auth/login (Rate limited)
4. Input validation (Backend)
5. Fetch user by email (Database)
6. Compare password hash
7. Generate JWT token
8. Return user data + token
9. Store token in localStorage (Frontend)
10. Redirect to dashboard
```

### Protected Route Access
```
1. User navigates to protected route
2. Check token in localStorage (Frontend)
3. If no token → Redirect to login
4. Request with Authorization header
5. Verify JWT signature (Backend)
6. Check token expiration
7. Allow/deny access
```

## Deployment

### Docker Deployment
- **Containers**: Frontend, Backend, PostgreSQL
- **Networks**: Internal network for backend-database
- **Volumes**: Persistent database storage
- **Health Checks**: Database readiness checks
- **Dependencies**: Proper startup order

### Environment Configuration
- Development: `.env.example` templates
- Production: Environment variables
- Secrets: Never committed to repository

## Scalability Considerations

### Current Architecture
- **Stateless Backend**: Horizontal scaling possible
- **Connection Pooling**: PostgreSQL connection pool
- **Rate Limiting**: Memory-based (single instance)
- **Sessions**: JWT (no server-side sessions)

### Future Enhancements
- **Caching**: Redis for session/data caching
- **Load Balancing**: Multiple backend instances
- **Database**: Read replicas for scaling
- **Rate Limiting**: Redis-based distributed rate limiting
- **File Storage**: Cloud storage (S3, etc.)
- **CDN**: Static asset distribution
- **Monitoring**: Application performance monitoring
- **Logging**: Centralized logging system

## Testing Strategy

### Backend Tests
- **Unit Tests**: Controllers, middleware, utilities
- **Integration Tests**: API endpoints with test database
- **Security Tests**: Authentication, authorization, input validation

### Frontend Tests
- **Unit Tests**: Components, utilities
- **Integration Tests**: User flows
- **E2E Tests**: Critical user journeys

### CI/CD Testing
- **Automated**: Run on every push/PR
- **Linting**: Code style enforcement
- **Security**: CodeQL scanning
- **Build**: Verify compilation
- **Docker**: Container build verification

## Monitoring & Observability

### Current Implementation
- **Health Endpoint**: `/health` for uptime monitoring
- **Request Logging**: Morgan middleware
- **Error Logging**: Console error output

### Recommended Additions
- **APM**: Application Performance Monitoring (e.g., Sentry)
- **Metrics**: System and application metrics
- **Alerts**: Automated alerting for errors
- **Dashboards**: Visualization of key metrics

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /api/auth/login
Authenticate a user and receive a token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET /api/auth/profile
Get the current user's profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## Design Decisions

### Why Monorepo?
- Simplified development workflow
- Shared configurations
- Easier dependency management
- Single repository to maintain

### Why TypeScript?
- Type safety reduces bugs
- Better IDE support
- Self-documenting code
- Industry standard for modern web apps

### Why JWT over Sessions?
- Stateless authentication
- Easier horizontal scaling
- Mobile-friendly
- No server-side session storage

### Why React Context over Redux?
- Simpler for current complexity
- Less boilerplate
- Built-in to React
- Can migrate to Redux if needed

### Why PostgreSQL?
- ACID compliance
- Proven reliability
- Rich feature set
- Excellent JSON support

## Conclusion

This architecture provides a solid foundation for a modern SaaS application with:
- ✅ Security best practices
- ✅ Scalability considerations
- ✅ Developer experience
- ✅ Production readiness
- ✅ Comprehensive testing
- ✅ Clear documentation

The codebase is ready for further feature development and can scale as the application grows.
