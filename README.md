# MySaaS - Modern SaaS Application

A full-stack SaaS application built with Node.js, React, TypeScript, and PostgreSQL.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Modern Stack**: Built with Node.js, Express, React, TypeScript, and PostgreSQL
- **Payment Integration**: Stripe integration ready for subscription management
- **Docker Support**: Full Docker and docker-compose configuration
- **CI/CD**: GitHub Actions workflow for automated testing and deployment
- **API-First Design**: RESTful API with proper error handling
- **Responsive UI**: Modern React frontend with routing and state management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or higher)
- PostgreSQL (v16 or higher)
- Docker and Docker Compose (optional, for containerized deployment)
- npm or yarn

## 🛠️ Installation

### Option 1: Local Development

#### 1. Clone the repository
```bash
git clone https://github.com/meet1785/mysaas.git
cd mysaas
```

#### 2. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# Update database credentials and JWT secret

# Initialize database
psql -U postgres -d mysaas -f database/init.sql

# Start development server
npm run dev
```

#### 3. Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Option 2: Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:3000

## 📁 Project Structure

```
mysaas/
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── index.ts        # Entry point
│   ├── database/           # Database scripts
│   ├── Dockerfile
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main app component
│   ├── Dockerfile
│   └── package.json
├── .github/
│   └── workflows/          # CI/CD workflows
└── docker-compose.yml      # Docker compose configuration
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mysaas

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Stripe (optional)
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 API Documentation

### Authentication Endpoints

#### Register
- **POST** `/api/auth/register`
- Body: `{ "email": "user@example.com", "password": "password123", "name": "John Doe" }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ "email": "user@example.com", "password": "password123" }`

#### Get Profile
- **GET** `/api/auth/profile`
- Headers: `Authorization: Bearer <token>`

## 🚀 Deployment

The application includes a GitHub Actions CI/CD workflow that:
1. Runs linting and tests
2. Builds Docker images
3. Can be extended to deploy to cloud platforms

### Deployment Options

- **Docker**: Use the included Docker configuration
- **Cloud Platforms**: Deploy to AWS, Google Cloud, Azure, or DigitalOcean
- **Heroku**: Use Heroku buildpacks for Node.js
- **Vercel/Netlify**: Deploy frontend separately

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Helmet.js for security headers
- CORS configured
- Input validation using express-validator
- SQL injection protection with parameterized queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Initial development with GitHub Copilot

## 🙏 Acknowledgments

- Built with guidance from GitHub Copilot
- Modern web development best practices
- Open source community
