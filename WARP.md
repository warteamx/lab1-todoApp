# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## 🏗️ Architecture Overview

This is a **full-stack monorepo** implementing **Domain-Driven Design (DDD)** and **Clean Architecture** patterns with three main applications:

- **Client** (`/client/`): Expo React Native app (iOS, Android, Web, Desktop)
- **Server** (`/server/`): Express.js API with TypeScript and DDD patterns
- **Admin Panel** (`/admin-panel/`): Next.js admin interface

### Key Technologies

- **Frontend**: Expo SDK 53, React Native 0.79, TypeScript, React Navigation, TanStack Query
- **Backend**: Express 5.1, TypeScript, Supabase (PostgreSQL), Winston logging, Swagger/OpenAPI
- **Admin**: Next.js 15, TypeScript, Tailwind CSS v4, Biome (linting/formatting)
- **DevOps**: Docker, GitHub Actions CI/CD, Semantic Release with Gitmoji

## 🔧 Essential Commands

### Development

```bash
# Start all services simultaneously
npm run dev

# Individual services
npm run dev:client    # Expo dev server
npm run dev:server    # Express API server
cd admin-panel && npm run dev  # Next.js admin panel

# Platform-specific client development
cd client
npm run android       # Android
npm run ios          # iOS
npm run web          # Web browser
```

### Environment Setup

```bash
# Create environment files from templates
./scripts/setup-environment.sh

# Required environment variables will be created:
# - client/.env.local (Expo public vars with EXPO_PUBLIC_ prefix)
# - server/.env (Node.js server vars)
```

### Testing

```bash
# Run all tests
npm run test

# Individual test suites
npm run test:client   # Jest + React Native Testing Library
npm run test:server   # Vitest with coverage
npm run test:watch    # Watch mode for development

# Specific test patterns
cd client && npm run test:coverage
cd server && npm run test:ci
```

### Build & Production

```bash
# Build all applications
npm run build

# Individual builds
npm run build:client     # Expo web export
npm run build:server     # TypeScript compilation
cd admin-panel && npm run build  # Next.js production build

# Version management (semantic versioning)
npm run build:version    # Update version info across packages
```

### Code Quality

```bash
# Lint all code
npm run lint
npm run lint:fix         # Auto-fix issues

# Format code
npm run format           # Root-level files
cd client && npm run format
cd server && npm run format
cd admin-panel && npm run format
```

### Docker Operations (Server)

```bash
cd server
npm run docker:dev       # Development container
npm run docker:prod      # Production container
npm run docker:build     # Build image
npm run docker:logs      # View logs
npm run docker:clean     # Cleanup containers
```

### Logging (Server)

```bash
cd server
npm run logs:view        # Combined logs with pino-pretty
npm run logs:errors      # Error logs only
```

## 🏛️ Architecture Patterns

### Clean Architecture Layers

**Client Architecture** (`/client/`):

- **app/**: Expo Router pages (presentation layer)
- **components/**: Reusable UI components with themed design system
- **api/**: API client layer with TanStack Query integration
- **hooks/**: Custom React hooks (business logic)
- **providers/**: Context providers (Auth, Theme, Query)
- **lib/**: Shared utilities and Supabase client

**Server Architecture** (`/server/src/`):

- **api/**: Controllers and routes (presentation layer)
- **common/**: Shared utilities, middleware, exceptions
- **domains/**: Business logic domains (following DDD)
- **infrastructure/**: External service integrations

### Domain-Driven Design

The server implements DDD with these domains:

- **Todo Domain**: Task management business logic
- **Profile Domain**: User profile management
- **Auth Domain**: Authentication and authorization (via Supabase)

Each domain contains:

- Controllers (HTTP layer)
- Services (business logic)
- Models/Schemas (data structures)
- OpenAPI specifications

### API Design

- **RESTful endpoints** with consistent response formats
- **OpenAPI/Swagger documentation** at `/api-docs`
- **Authentication**: Supabase JWT tokens via middleware
- **CORS**: Configured for cross-origin requests (HTTP deployment)
- **Error handling**: Centralized exception management

## 🔄 Development Workflow

### Commit Convention

Uses **Gitmoji + Conventional Commits** for semantic versioning:

```bash
✨ feat(client): add dark mode toggle
🐛 fix(server): resolve database connection timeout
📝 docs: update API documentation
🧪 test: add unit tests for todo service
♻️ refactor(api): simplify authentication flow
🔒️ security: implement rate limiting
⚡️ perf: optimize component rendering
```

### Semantic Versioning Rules

- **MAJOR** (💥 breaking): Breaking API changes
- **MINOR** (✨ feat): New backward-compatible features
- **PATCH** (🐛 fix, 🧪 test, 📝 docs, etc.): Bug fixes and maintenance

### Git Hooks (Husky)

- **pre-commit**: Lint staged files, run quick tests
- **commit-msg**: Validate conventional commit format
- **pre-push**: Full test suite execution

## 🔧 Key Configuration Files

### Package Management

- Root `package.json`: Orchestration scripts and dev dependencies
- `client/package.json`: Expo/React Native dependencies
- `server/package.json`: Express/Node.js dependencies
- `admin-panel/package.json`: Next.js dependencies

### Environment Configuration

- `client/.env.example` → `client/.env.local` (with `EXPO_PUBLIC_` prefix)
- `server/.env.example` → `server/.env`

### Build Tools

- **Client**: Expo CLI, Jest, ESLint, Prettier
- **Server**: TypeScript compiler, Vitest, ESLint, Prettier
- **Admin**: Next.js, Biome (replaces ESLint + Prettier)

## 🚀 Deployment Architecture

### Current Deployment

- **Client Web**: AWS S3 + CloudFront → https://lab1.warteamx.com
- **Server API**: AWS EC2 with Docker → http://56.228.14.41/api
- **Database**: Supabase managed PostgreSQL
- **Documentation**: http://56.228.14.41/api-docs

### CI/CD Pipeline

1. GitHub Actions triggers on push to `main`
2. Runs parallel test suites (client + server)
3. Semantic Release analyzes commits and determines version bump
4. Updates all package.json versions synchronously
5. Builds and deploys applications
6. Generates changelog and GitHub release

## 🧪 Testing Strategy

### Client Testing (Jest + RTL)

- Component unit tests in `__tests__/` directories
- API integration tests
- Coverage target: 80%+

### Server Testing (Vitest)

- Domain service unit tests
- API endpoint integration tests
- Database operation tests
- Coverage target: 90%+

### Test File Patterns

- `**/*.test.{js,ts,tsx}` for unit tests
- `**/*.spec.{js,ts,tsx}` for integration tests
- Ignore `*.skip.*`, `*.utils.*`, `*.helper.*` files

## 📋 Development Guidelines

### TypeScript Standards

- Strict mode enabled across all applications
- No `any` types allowed
- Proper interface definitions for all contracts
- Generic types for reusable components

### React Native Best Practices

- Functional components with hooks
- Expo Router for navigation
- Performance optimization with React.memo when needed
- Cross-platform compatibility (iOS/Android/Web/Desktop)

### Express.js Patterns

- Middleware-based request pipeline
- Centralized error handling with custom exception classes
- Structured logging with Winston and pino-pretty
- Input validation at API boundaries

### Database Integration

- Supabase client for PostgreSQL operations
- JWT-based authentication
- Type-safe database queries

## 🔒 Security Considerations

- **Authentication**: Supabase JWT tokens with middleware validation
- **CORS**: Environment-based origin restrictions
- **Helmet**: Security headers (configured for HTTP deployment)
- **Input Validation**: Schema validation on all endpoints
- **Environment Variables**: Secure credential management

## 📚 Key Documentation

Essential documentation files:

- `docs/AI_CONTEXT.md`: Comprehensive project context
- `docs/WORKFLOW.md`: Complete development workflow
- `README.md`: Getting started and deployment info
- `server/src/api/*/openapi.yml`: API specifications
- `docs/client/ARCHITECTURE.md`: Client architecture details
- `docs/server/ARCHITECTURE.md`: Server DDD patterns

## ⚠️ Common Issues & Solutions

### Environment Variables

- Client vars must use `EXPO_PUBLIC_` prefix
- Server uses standard Node.js env vars
- Run `./scripts/setup-environment.sh` for templates

### Database Connection

- Verify Supabase URL and keys in environment files
- Check CORS settings for cross-origin API calls
- Ensure proper JWT token handling

### Build Failures

- Clear `node_modules` and reinstall dependencies
- Check TypeScript compilation errors
- Verify environment variable availability

### Testing Issues

- Use `npm run test:watch` for active development
- Check test file naming conventions
- Ensure proper mock setup for external dependencies

This codebase emphasizes production-ready patterns, comprehensive testing, and automated deployment workflows suitable for team development and scaling.
