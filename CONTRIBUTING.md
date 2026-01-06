# Contributing to MySaaS

Thank you for your interest in contributing to MySaaS! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/mysaas.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

### Prerequisites
- Node.js v20 or higher
- PostgreSQL v16 or higher
- Docker (optional)

### Installation
```bash
# Install dependencies for both frontend and backend
npm run install:all

# Or install individually
cd backend && npm install
cd frontend && npm install
```

### Running the Application
```bash
# Run both frontend and backend
npm run dev

# Or run individually
npm run dev:backend
npm run dev:frontend
```

## Code Style

### Backend (TypeScript/Node.js)
- Use TypeScript strict mode
- Follow ESLint rules
- Use async/await for asynchronous operations
- Add JSDoc comments for public APIs
- Use meaningful variable and function names

### Frontend (React/TypeScript)
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Keep components small and focused
- Use meaningful component and variable names

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run backend tests
npm run test:backend

# Run frontend tests
npm run test:frontend
```

### Writing Tests
- Write unit tests for new features
- Ensure tests are meaningful and test actual behavior
- Maintain or improve code coverage

## Commit Guidelines

### Commit Message Format
```
<type>: <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Example
```
feat: Add user profile editing functionality

- Add profile edit form component
- Implement API endpoint for profile updates
- Add validation for profile fields

Closes #123
```

## Pull Request Guidelines

1. **Keep PRs focused**: One feature or fix per PR
2. **Update documentation**: If you change APIs or functionality
3. **Add tests**: For new features or bug fixes
4. **Follow code style**: Run linting before submitting
5. **Write clear descriptions**: Explain what and why, not just how

## Code Review Process

1. All PRs require at least one approval
2. All CI checks must pass
3. Code must follow project style guidelines
4. Tests must pass
5. Security checks must pass

## Reporting Issues

When reporting issues, please include:
- A clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots (if applicable)

## Security

If you discover a security vulnerability, please email the maintainers directly instead of opening a public issue.

## Questions?

Feel free to open an issue for questions or discussions about the project.

Thank you for contributing! 🎉
