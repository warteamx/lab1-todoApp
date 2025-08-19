# 📚 Server Documentation

Welcome to the comprehensive documentation for the Express.js backend server. This documentation covers architecture, implementation patterns, testing strategies, and deployment guidelines following Domain-Driven Design (DDD) principles.

## 🎯 Documentation Overview

This documentation suite provides complete guidance for understanding, developing, testing, and deploying the server application.

### 📖 Available Documents

| Document                                                   | Purpose                                                                 | Audience               |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------- |
| **[🏗️ ARCHITECTURE.md](./ARCHITECTURE.md)**                 | Complete architecture overview, DDD implementation, and design patterns | Developers, Architects |
| **[📁 DDD_FOLDER_STRUCTURE.md](./DDD_FOLDER_STRUCTURE.md)** | Detailed folder structure, domain organization, and naming conventions  | All Developers         |
| **[🧪 TESTING.md](./TESTING.md)**                           | Comprehensive testing strategy, examples, and best practices            | Developers, QA         |
| **[🚨 ERROR_HANDLING.md](./ERROR_HANDLING.md)**             | Error handling strategy, exception hierarchy, and implementation        | Developers             |
| **[🔐 SECURITY.md](./SECURITY.md)**                         | Security implementation, headers, authentication, and best practices    | Developers, DevOps     |
| **[🚀 SERVER_START.md](./SERVER_START.md)**                 | Deployment guide, Docker setup, and production considerations           | DevOps, Developers     |

## 🏗️ Architecture Quick Overview

Our server follows **Domain-Driven Design (DDD)** and **Clean Architecture** principles:

```
┌─────────────────────────────────────────┐
│               API Layer                 │ ← HTTP, Routes, Controllers
├─────────────────────────────────────────┤
│             Domain Layer                │ ← Business Logic, Entities
├─────────────────────────────────────────┤
│          Infrastructure Layer           │ ← Database, External Services
├─────────────────────────────────────────┤
│              Common Layer               │ ← Shared Utilities, Types
└─────────────────────────────────────────┘
```

### Key Characteristics
- **Domain-centric**: Business logic is the core focus
- **Layered architecture**: Clear separation of concerns
- **TypeScript**: Full type safety across all layers
- **Test-driven**: Comprehensive testing strategy
- **Docker-ready**: Containerized deployment
- **Security-first**: Multiple security layers implemented

## 🚀 Quick Start Guide

### 1. Development Setup

```bash
# Clone and navigate to server
cd expo-lab/server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

### 2. Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### 3. Production Deployment

```bash
# Build and start with Docker
docker-compose up --build server

# Or build and run directly
npm run build
npm start
```

### 4. API Documentation

Once running, access:
- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/api/health`

## 📂 Project Structure Overview

```
server/
├── src/
│   ├── api/                    # 🌐 HTTP layer (routes, controllers)
│   ├── domain/                 # 🏢 Business logic (services, entities)
│   ├── infrastructure/         # 🔧 External concerns (database, storage)
│   ├── common/                 # 🛠️ Shared utilities (exceptions, middleware)
│   ├── __tests__/              # 🧪 Comprehensive test suite
│   ├── app.ts                  # Express app configuration
│   └── server.ts               # Application entry point
├── docs/                       # 📖 This documentation
├── logs/                       # 📄 Application logs
├── coverage/                   # 📊 Test coverage reports
├── docker-compose.yml          # 🐳 Container orchestration
├── Dockerfile                  # 🐳 Container definition
└── package.json               # 📦 Dependencies and scripts
```

## 🎯 Domain Overview

Our application is organized around these business domains:

### 📝 Todo Domain
**Purpose**: Task management and todo operations

**Key Features**:
- Create, read, update, delete todos
- User-scoped todo lists
- Task completion tracking
- Input validation and business rules

**API Endpoints**:
- `GET /api/todo` - Get user's todos
- `POST /api/todo` - Create new todo
- `PUT /api/todo/:id` - Update todo
- `DELETE /api/todo/:id` - Delete todo

### 👤 Profile Domain
**Purpose**: User profile management

**Key Features**:
- Profile creation and updates
- Avatar upload and management
- User data validation
- Profile image storage (Supabase Storage)

**API Endpoints**:
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Create/update profile
- `POST /api/profile/avatar` - Upload avatar

### 🏥 Health Domain
**Purpose**: System health monitoring

**Key Features**:
- API health status
- System uptime monitoring
- Database connectivity checks
- Container health verification

**API Endpoints**:
- `GET /api/health` - System health status

## 🛠️ Technology Stack

### Core Technologies
- **[Express.js](https://expressjs.com/)**: Web framework
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Node.js 18](https://nodejs.org/)**: JavaScript runtime
- **[PostgreSQL](https://www.postgresql.org/)**: Primary database
- **[Supabase](https://supabase.com/)**: Backend-as-a-Service

### Development Tools
- **[Vitest](https://vitest.dev/)**: Testing framework
- **[ESLint](https://eslint.org/)**: Code linting
- **[Prettier](https://prettier.io/)**: Code formatting
- **[Docker](https://www.docker.com/)**: Containerization

### Security & Middleware
- **[Helmet.js](https://helmetjs.github.io/)**: Security headers
- **[CORS](https://github.com/expressjs/cors)**: Cross-origin requests
- **[Winston](https://github.com/winstonjs/winston)**: Logging
- **[Morgan](https://github.com/expressjs/morgan)**: HTTP request logging

## 🎯 Development Principles

### 1. Domain-Driven Design (DDD)
- **Ubiquitous Language**: Consistent terminology across code and documentation
- **Bounded Contexts**: Clear domain boundaries
- **Rich Domain Models**: Business logic encapsulated in domain layer
- **Repository Pattern**: Clean data access abstraction

### 2. Clean Architecture
- **Dependency Inversion**: Inner layers don't depend on outer layers
- **Interface Segregation**: Dependencies defined by interfaces
- **Single Responsibility**: Each component has one clear purpose
- **Framework Independence**: Business logic isolated from frameworks

### 3. SOLID Principles
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### 4. Testing Strategy
- **Test Pyramid**: Unit tests → Integration tests → E2E tests
- **Behavior-Driven**: Test behavior, not implementation
- **High Coverage**: 80%+ overall, 95%+ for critical business logic
- **Fast Feedback**: Unit tests complete in milliseconds

## 📊 Quality Metrics

### Test Coverage Targets
| Layer               | Line Coverage | Branch Coverage | Function Coverage |
| ------------------- | ------------- | --------------- | ----------------- |
| **Domain Services** | 95%           | 90%             | 100%              |
| **API Controllers** | 85%           | 80%             | 90%               |
| **Repositories**    | 80%           | 75%             | 85%               |
| **Overall Target**  | 80%           | 75%             | 85%               |

### Performance Targets
- **API Response Time**: < 200ms (95th percentile)
- **Database Queries**: < 50ms average
- **Memory Usage**: < 512MB under normal load
- **Test Suite**: < 30 seconds for full run

## 🔄 Development Workflow

### 1. Feature Development
```bash
# 1. Create feature branch
git checkout -b feature/new-todo-categories

# 2. Implement following DDD structure:
# - Define domain entities
# - Create repository interfaces
# - Implement business services
# - Add API controllers
# - Create database repositories

# 3. Write comprehensive tests
npm run test:watch

# 4. Verify code quality
npm run lint
npm run format

# 5. Check coverage
npm run test:coverage
```

### 2. Code Review Checklist
- [ ] Follows DDD folder structure
- [ ] Business logic in domain layer
- [ ] Proper error handling with custom exceptions
- [ ] Comprehensive test coverage
- [ ] Security considerations addressed
- [ ] API documentation updated
- [ ] Performance impact assessed

### 3. Deployment Process
```bash
# 1. Build and test
npm run build
npm test

# 2. Security check
npm audit

# 3. Container build
docker build -t expo-server:latest .

# 4. Integration testing
docker-compose -f docker-compose.test.yml up

# 5. Deploy
docker-compose up -d server
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Development Server Won't Start
```bash
# Check port availability
lsof -i :3000

# Verify environment variables
cat .env

# Check dependencies
npm install

# Clear cache and restart
npm run dev
```

#### 2. Tests Failing
```bash
# Run specific test file
npm test -- todo.service.test.ts

# Check test setup
npm test -- --reporter=verbose

# Clear test cache
rm -rf coverage/ && npm test
```

#### 3. Database Connection Issues
```bash
# Verify Supabase credentials
echo $SUPABASE_DB_URL

# Test database connection
npm run test -- database.test.ts

# Check network connectivity
ping your-supabase-instance.supabase.co
```

#### 4. Docker Build Problems
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t expo-server:latest .

# Check logs
docker logs expo-server
```

## 📈 Monitoring & Observability

### Health Monitoring
- **Health Endpoint**: `/api/health` provides system status
- **Docker Health Checks**: Automated container monitoring
- **Database Connectivity**: Connection status verification
- **Memory Usage**: Runtime memory monitoring

### Logging Strategy
- **Structured Logging**: JSON format with Winston
- **Log Levels**: Debug, Info, Warn, Error
- **Request Logging**: All HTTP requests with Morgan
- **Error Tracking**: Centralized error logging
- **Log Rotation**: Automated log file management

### Performance Monitoring
```bash
# Monitor in real-time
npm run logs:view

# Check error logs
npm run logs:errors

# Container stats
docker stats expo-server

# Health check
curl http://localhost:3000/api/health
```

## 🎓 Learning Resources

### Domain-Driven Design
- [DDD Reference](https://domainlanguage.com/ddd/reference/) by Eric Evans
- [Implementing DDD](https://vaughnvernon.co/?page_id=168) by Vaughn Vernon
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Robert Martin

### TypeScript & Node.js
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

### Testing
- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Kent C. Dodds Testing Articles](https://kentcdodds.com/blog?q=testing)

### Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Helmet.js Documentation](https://helmetjs.github.io/)

## 🤝 Contributing

### Getting Started
1. Read the [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview
2. Review [DDD_FOLDER_STRUCTURE.md](./DDD_FOLDER_STRUCTURE.md) for conventions
3. Check [TESTING.md](./TESTING.md) for testing guidelines
4. Follow the development workflow above

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured linting rules
- **Prettier**: Use for consistent code formatting
- **Testing**: Maintain 80%+ coverage
- **Documentation**: Update docs with changes

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes following DDD structure
3. Add/update tests for new functionality
4. Ensure all tests pass and coverage targets met
5. Update relevant documentation
6. Submit PR with clear description

## 📞 Support

### Documentation Issues
If you find issues or gaps in this documentation:
1. Check existing documentation first
2. Create an issue describing the problem
3. Suggest improvements or corrections
4. Submit a PR with documentation updates

### Development Help
For development questions:
1. Review relevant documentation sections
2. Check troubleshooting guide above
3. Search existing issues and discussions
4. Create detailed issue with context

---

**Last Updated**: August 2025  
**Documentation Version**: 2.0  
**Maintained by**: Development Team

This documentation provides a comprehensive foundation for understanding and working with our Domain-Driven Design Express.js server. Start with the [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview, then dive into specific topics as needed.

**Happy coding!** 🚀
