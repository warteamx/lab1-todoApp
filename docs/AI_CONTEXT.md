# 🤖 AI Context Prompt - Lab1-TodoApp

> **Use this comprehensive context when working with AI assistants on the Lab1-TodoApp project.**

## 📋 Project Overview

**Lab1-TodoApp** is a production-ready full-stack boilerplate and template repository for modern web and mobile applications.

### 🏗️ Tech Stack

**Frontend (Client)**

- **Expo SDK 53** - React Native framework for iOS, Android, Web, Desktop
- **React Native 0.74** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **Themed UI Components** - Custom design system
- **Jest + React Native Testing Library** - Testing framework

**Backend (Server)**

- **Express 5.1** - Node.js web framework
- **TypeScript** - Type-safe server development
- **Supabase** - PostgreSQL database and authentication
- **Swagger/OpenAPI** - API documentation
- **Vitest** - Fast unit testing framework
- **Docker** - Containerization

**DevOps & Tools**

- **Monorepo Structure** - npm workspaces
- **Semantic Versioning** - Automated version management
- **GitHub Actions** - CI/CD pipeline
- **Husky** - Git hooks for code quality
- **ESLint + Prettier** - Code formatting and linting
- **Codecov** - Test coverage reporting

## 🏛️ Architecture Patterns

### Clean Architecture

- **Separation of Concerns** - Clear boundaries between layers
- **Dependency Inversion** - Dependencies point inward
- **Testability** - Each layer can be tested independently

### Domain-Driven Design (DDD)

- **Domain Layer** - Business logic and entities
- **Application Layer** - Use cases and application services
- **Infrastructure Layer** - External concerns (database, API clients)
- **Presentation Layer** - UI components and controllers

### Folder Structure

```
├── client/                 # Expo React Native app
│   ├── app/               # Expo Router pages
│   ├── components/        # Reusable UI components
│   ├── api/              # API client layer
│   ├── hooks/            # Custom React hooks
│   ├── providers/        # Context providers
│   └── themes/           # Design system
├── server/                # Express.js API
│   ├── src/
│   │   ├── domains/      # DDD domains
│   │   ├── shared/       # Shared utilities
│   │   └── infrastructure/ # External integrations
│   └── docs/             # Server documentation
└── docs/                 # Project documentation
```

## 🔄 Development Workflow

### 1. Commit Convention

Uses **Gitmoji + Conventional Commits**:

```bash
✨ feat(client): add user authentication
🐛 fix(server): resolve database connection issue
📝 docs: update API documentation
🧪 test: add unit tests for todo service
♻️ refactor: simplify authentication flow
```

### 2. Semantic Versioning

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (1.X.0): New features (backward compatible)
- **PATCH** (1.1.X): Bug fixes

### 3. Automated Release Process

1. Commit changes using gitmoji convention
2. Push to main branch
3. GitHub Actions runs tests and builds
4. Semantic-release analyzes commits
5. Auto-generates changelog and creates release
6. Deploys to production if tests pass

## 🌐 Deployment Architecture

### Client (Frontend)

- **Platform**: AWS S3 + CloudFront
- **Domain**: https://lab1.warteamx.com
- **Build**: Expo Web build optimized for production

### Server (Backend)

- **Platform**: AWS EC2 with Docker
- **API**: http://56.228.14.41/api
- **Documentation**: http://56.228.14.41/api-docs
- **Health Check**: http://56.228.14.41/api/health

### Database

- **Supabase PostgreSQL** - Managed database service
- **Authentication** - Supabase Auth with JWT tokens
- **Real-time** - WebSocket support for live updates

## 🔧 Environment Configuration

### Required Environment Variables

**Client (.env.local)**

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Server (.env)**

```bash
NODE_ENV=development
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
SUPABASE_DB_URL=your_database_url
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:19006
```

## 🧪 Testing Strategy

### Client Testing

- **Unit Tests** - Components and utility functions
- **Integration Tests** - API integration and user flows
- **E2E Tests** - Critical user journeys
- **Coverage Target** - 80%+ code coverage

### Server Testing

- **Unit Tests** - Business logic and utilities
- **Integration Tests** - API endpoints and database
- **Contract Tests** - API schema validation
- **Coverage Target** - 90%+ code coverage

## 📦 Key NPM Scripts

### Root Level

```bash
npm run client:dev     # Start Expo development server
npm run server:dev     # Start Express server in development
npm run test:client    # Run client tests
npm run test:server    # Run server tests
npm run lint:client    # Lint client code
npm run lint:server    # Lint server code
```

### Client Specific

```bash
npm start              # Start Expo development server
npm run build          # Build for production
npm run test           # Run tests with coverage
npm run lint           # Lint and format code
```

### Server Specific

```bash
npm run dev            # Start with hot reload
npm run build          # Build TypeScript
npm run start          # Start production server
npm run test           # Run tests with coverage
```

## 🔒 Security Considerations

### Authentication

- **JWT Tokens** - Stateless authentication
- **Supabase Auth** - Managed authentication service
- **Password Policies** - Strong password requirements
- **Session Management** - Secure token handling

### API Security

- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Zod schema validation
- **Rate Limiting** - Protection against abuse
- **Error Handling** - Secure error messages

## 🎯 Template Usage Guidelines

### When Using as Template

1. **Clone and Setup**

   ```bash
   gh repo create my-app --template warteamx/lab1-todoApp
   cd my-app
   ./scripts/setup-environment.sh
   ```

2. **Configure Environment**
   - Set up Supabase project
   - Configure GitHub Secrets for CI/CD
   - Update deployment targets

3. **Customize Branding**
   - Update app name and icons
   - Modify theme colors
   - Replace placeholder content

4. **Add Features**
   - Follow existing patterns
   - Maintain Clean Architecture
   - Add comprehensive tests

### Code Quality Standards

- **TypeScript Strict Mode** - No any types allowed
- **ESLint Rules** - Consistent code style
- **Test Coverage** - All new features must include tests
- **Documentation** - Update docs for public APIs
- **Commit Messages** - Follow gitmoji convention

## 🔍 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Check file names (.env.local for client, .env for server)
   - Verify EXPO*PUBLIC* prefix for client variables

2. **Build Failures**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify environment variables

3. **Database Connection Issues**
   - Verify Supabase credentials
   - Check network connectivity
   - Review CORS settings

### Debug Commands

```bash
# Check environment setup
./scripts/setup-environment.sh

# Validate configuration
npm run build:version

# Reset development environment
rm -rf node_modules && npm install
```

## 📚 Key Documentation Files

- [Environment Setup](./development/ENVIRONMENT_SETUP.md)
- [Client Architecture](./client/ARCHITECTURE.md)
- [Server Architecture](./server/ARCHITECTURE.md)
- [Testing Guidelines](./client/TESTING.md)
- [Semantic Versioning](./development/SEMANTIC_VERSIONING.md)

---

**This context provides comprehensive information about the Lab1-TodoApp project structure, patterns, and workflows for AI assistants to provide accurate and helpful responses.**
