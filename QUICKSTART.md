# Quick Start Guide

This guide will help you get MySaaS up and running in less than 5 minutes.

## Prerequisites Check

Before you start, make sure you have:
- [ ] Node.js v20+ installed (`node --version`)
- [ ] PostgreSQL v16+ installed (or Docker)
- [ ] npm installed (`npm --version`)

## Option 1: Quick Start with Docker (Recommended)

This is the fastest way to get started:

```bash
# 1. Clone the repository
git clone https://github.com/meet1785/mysaas.git
cd mysaas

# 2. Start everything with Docker
docker-compose up -d

# 3. Check that services are running
docker-compose ps

# 4. View logs (optional)
docker-compose logs -f
```

**That's it!** The application is now running:
- Frontend: http://localhost
- Backend API: http://localhost:3000

### Stopping the Application
```bash
docker-compose down
```

## Option 2: Local Development Setup

If you prefer to run services locally:

### 1. Setup PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE mysaas;

# Exit
\q

# Initialize database schema
psql -U postgres -d mysaas -f backend/database/init.sql
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# Update: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, JWT_SECRET

# Start development server
npm run dev
```

Backend will be running at http://localhost:3000

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will be running at http://localhost:5173

## Verify Installation

1. **Check Backend Health**
   ```bash
   curl http://localhost:3000/health
   ```
   Should return: `{"status":"ok","message":"Server is running"}`

2. **Access Frontend**
   - Open http://localhost:5173 (local) or http://localhost (Docker)
   - You should see the MySaaS home page

3. **Test Registration**
   - Click "Register"
   - Fill in the form
   - You should be redirected to the dashboard

## Common Issues

### Database Connection Failed
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `psql -U postgres -l | grep mysaas`

### Port Already in Use
- Backend (3000): Change `PORT` in `backend/.env`
- Frontend (5173): Change `server.port` in `frontend/vite.config.ts`

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Now that you're up and running:

1. **Explore the API**: Check `README.md` for API documentation
2. **Read the Code**: Start with `backend/src/index.ts` and `frontend/src/App.tsx`
3. **Make Changes**: Edit files and see hot-reload in action
4. **Run Tests**: `npm test` in backend or frontend directories
5. **Check Contributing**: See `CONTRIBUTING.md` for development guidelines

## Development Commands

### Root Directory
```bash
npm run dev              # Run both frontend and backend
npm run build           # Build both projects
npm test                # Run all tests
npm run lint            # Lint all code
```

### Backend
```bash
npm run dev             # Start development server
npm run build           # Build TypeScript
npm start              # Start production server
npm test               # Run tests
npm run lint           # Lint code
```

### Frontend
```bash
npm run dev             # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm test               # Run tests
npm run lint           # Lint code
```

## Need Help?

- Check the main `README.md` for detailed documentation
- Open an issue on GitHub
- Review `CONTRIBUTING.md` for contribution guidelines

Happy coding! 🚀
