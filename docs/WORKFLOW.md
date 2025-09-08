# 🔄 Development Workflow

This document outlines the complete development workflow for Lab1-TodoApp, designed to maintain code quality, consistency, and reliable releases.

## 📋 Overview

Our workflow emphasizes:

- **Automated quality checks** through git hooks and CI/CD
- **Semantic versioning** for predictable releases
- **Comprehensive testing** at every level
- **Clean architecture** principles

## 🚀 Getting Started

### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/warteamx/lab1-todoApp.git
cd lab1-todoApp

# Set up environment
./scripts/setup-environment.sh

# Install dependencies
npm install

# Set up development environment
cd client && npm install
cd ../server && npm install
```

### 2. Environment Configuration

Follow the [Environment Setup Guide](./development/ENVIRONMENT_SETUP.md) to configure:

- Client environment variables (`.env.local`)
- Server environment variables (`.env`)
- Supabase credentials
- Development tools

## 🔄 Daily Development Workflow

### 1. Start Development Servers

```bash
# Terminal 1: Start client (Expo)
npm run client:dev

# Terminal 2: Start server (Express)
npm run server:dev
```

### 2. Feature Development Process

#### A. Create Feature Branch

```bash
git checkout -b feature/user-authentication
git checkout -b fix/database-connection
git checkout -b docs/api-documentation
```

#### B. Follow Clean Architecture

**Client Structure:**

```
client/
├── app/              # Expo Router pages
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components
│   └── modules/     # Feature-specific components
├── api/             # API client layer
├── hooks/           # Custom React hooks
└── providers/       # Context providers
```

**Server Structure:**

```
server/src/
├── domains/         # DDD domains
│   ├── auth/       # Authentication domain
│   ├── todos/      # Todo domain
│   └── users/      # User domain
├── shared/         # Shared utilities
└── infrastructure/ # External integrations
```

#### C. Write Tests First (TDD)

```bash
# Client tests
cd client
npm run test

# Server tests
cd server
npm run test

# Watch mode for development
npm run test:watch
```

### 3. Code Quality Checks

#### Automatic Checks (via Husky)

- **Pre-commit**: Linting, formatting, basic tests
- **Commit-msg**: Conventional commit format validation
- **Pre-push**: Full test suite

#### Manual Checks

```bash
# Lint client code
npm run lint:client

# Lint server code
npm run lint:server

# Run all tests
npm run test:client
npm run test:server
```

## 📝 Commit Convention

We use **Gitmoji + Conventional Commits** for semantic versioning:

### Commit Format

```
<gitmoji> <type>(scope): <description>

[optional body]

[optional footer]
```

### Examples

```bash
✨ feat(client): add user profile management
🐛 fix(server): resolve database connection timeout
📝 docs: update API documentation
🧪 test(client): add unit tests for todo components
♻️ refactor: simplify authentication flow
🔒️ security(server): implement rate limiting
⚡️ perf(client): optimize component rendering
🔧 chore: update dependencies
```

### Version Impact

| Gitmoji | Type     | Version   | Description      |
| ------- | -------- | --------- | ---------------- |
| 💥      | BREAKING | **Major** | Breaking changes |
| ✨      | feat     | **Minor** | New features     |
| 🐛      | fix      | **Patch** | Bug fixes        |
| 🚑️     | hotfix   | **Patch** | Critical fixes   |
| 🔒️     | security | **Patch** | Security fixes   |
| ⚡️     | perf     | **Patch** | Performance      |
| ♻️      | refactor | **Patch** | Code refactoring |
| 📝      | docs     | **Patch** | Documentation    |
| 🧪      | test     | **Patch** | Tests            |
| 🔧      | chore    | **Patch** | Maintenance      |

## 🔀 Branch Strategy

### Main Branches

- **`main`** - Production releases (protected)
- **`develop`** - Integration branch (optional)

### Feature Branches

- **`feature/`** - New features
- **`fix/`** - Bug fixes
- **`hotfix/`** - Critical production fixes
- **`docs/`** - Documentation updates
- **`refactor/`** - Code refactoring

### Branch Protection Rules

- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes to main branch

## 🚀 Release Process

### Automatic Release (Recommended)

1. **Merge to Main**

   ```bash
   git checkout main
   git merge feature/my-feature
   git push origin main
   ```

2. **CI/CD Pipeline Runs**
   - Runs tests for client and server
   - Builds applications
   - Analyzes commits since last release
   - Determines version bump
   - Updates package.json files
   - Generates changelog
   - Creates git tag and GitHub release
   - Deploys to production

### Manual Release (Emergency)

```bash
# Update version manually
npm run version:update 1.2.3

# Build version info
npm run build:version

# Commit and tag
git add .
git commit -m "🔖 chore(release): 1.2.3"
git tag -a v1.2.3 -m "Release version 1.2.3"
git push origin --tags
```

## 🧪 Testing Strategy

### Test Types

#### Unit Tests

- **Client**: Component logic, utilities, hooks
- **Server**: Business logic, utilities, services
- **Coverage**: 80%+ for client, 90%+ for server

#### Integration Tests

- **Client**: API integration, user flows
- **Server**: Endpoint testing, database operations

#### End-to-End Tests

- Critical user journeys
- Cross-platform compatibility
- Performance benchmarks

### Testing Commands

```bash
# Run tests with coverage
npm run test:client
npm run test:server

# Watch mode for development
npm run test:client:watch
npm run test:server:watch

# Generate coverage reports
npm run coverage:client
npm run coverage:server
```

## 🔧 Code Quality Tools

### ESLint Configuration

- TypeScript-specific rules
- React/React Native best practices
- Import/export organization
- Accessibility guidelines

### Prettier Configuration

- Consistent code formatting
- Automatic formatting on save
- Integration with ESLint

### Husky Git Hooks

- **pre-commit**: Lint staged files
- **commit-msg**: Validate commit format
- **pre-push**: Run test suite

## 📊 Monitoring and Debugging

### Development Tools

- **React Native Debugger** - Client debugging
- **VS Code Debugger** - Server debugging
- **Flipper** - Mobile app inspection
- **Swagger UI** - API testing

### Logging

- **Client**: Console logging with levels
- **Server**: Structured logging with winston
- **Production**: Centralized log aggregation

### Performance Monitoring

- **Bundle Analyzer** - Client bundle size
- **Memory Profiling** - Server performance
- **Database Queries** - Query optimization

## 🚀 Deployment Workflow

### Staging Deployment

- Automatic deployment from `develop` branch
- Staging environment for testing
- Integration with external services

### Production Deployment

- Triggered by releases from `main` branch
- Zero-downtime deployment strategies
- Rollback capabilities
- Health checks and monitoring

### Deployment Commands

```bash
# Build for production
npm run build:client
npm run build:server

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## 🔒 Security Practices

### Code Security

- **Dependency Scanning** - Automated vulnerability checks
- **Secret Management** - Environment variables only
- **Input Validation** - All API endpoints
- **Authentication** - JWT tokens with Supabase

### Git Security

- **Signed Commits** - GPG signing encouraged
- **Branch Protection** - Prevent direct pushes to main
- **Secret Scanning** - GitHub secret scanning enabled

## 📚 Documentation Requirements

### Code Documentation

- **TSDoc Comments** - All public APIs
- **README Files** - Each module/domain
- **Architecture Decisions** - ADR format

### API Documentation

- **OpenAPI/Swagger** - Automatic generation
- **Examples** - Request/response samples
- **Status Codes** - Error handling documentation

## 🎯 Best Practices

### General

1. **Follow Clean Architecture** - Clear separation of concerns
2. **Write Tests First** - TDD approach
3. **Small Commits** - Atomic, focused changes
4. **Descriptive Names** - Self-documenting code
5. **Regular Refactoring** - Continuous improvement

### TypeScript

1. **Strict Mode** - No `any` types
2. **Interface Definitions** - Clear contracts
3. **Generic Types** - Reusable components
4. **Error Handling** - Proper exception types

### React Native

1. **Functional Components** - Hooks over classes
2. **Performance Optimization** - Memoization where needed
3. **Accessibility** - Screen reader support
4. **Platform-specific Code** - When necessary

### Express.js

1. **Middleware Organization** - Clear pipeline
2. **Error Handling** - Centralized error management
3. **Validation** - Input validation at boundaries
4. **Logging** - Comprehensive request/response logging

---

This workflow ensures maintainable, scalable, and reliable software development. For specific implementation details, refer to the architecture documentation for [client](./client/ARCHITECTURE.md) and [server](./server/ARCHITECTURE.md).
