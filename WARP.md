# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Lab1-TodoApp is a production-ready full-stack boilerplate built with **Expo SDK 53** (React Native) and **Express 5.1** (Node.js), implementing **Domain-Driven Design (DDD)** and **Clean Architecture** patterns. The project uses a monorepo structure with separate client and server packages.

## Development Commands

### Root Level (Monorepo Orchestration)

```bash
# Development
npm run dev                 # Start both client and server concurrently
npm run dev:client          # Start Expo development server only
npm run dev:server          # Start Express server only

# Testing
npm run test                # Run tests for both packages
npm run test:client         # Run client tests with Jest
npm run test:server         # Run server tests with Vitest

# Linting
npm run lint                # Lint both packages
npm run lint:fix            # Auto-fix linting issues in both packages
npm run format              # Format markdown, YAML, and JSON files

# Building
npm run build               # Build both client and server
npm run build:version       # Build version info for both packages
```

### Client Commands (cd client/)

```bash
# Development
npm start                   # Start Expo dev server with choices (web/iOS/Android)
npm run ios                 # Start on iOS simulator
npm run android             # Start on Android emulator
npm run web                 # Start web development server

# Testing
npm run test                # Run Jest tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Generate coverage report

# Building
npm run build:web           # Build for web deployment (outputs to web/dist)
```

### Server Commands (cd server/)

```bash
# Development
npm run dev                 # Start server with hot-reload using ts-node-dev

# Testing
npm run test                # Run Vitest tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Generate coverage report

# Docker
npm run docker:dev          # Start development environment in Docker
npm run docker:prod         # Start production environment in Docker
npm run docker:logs         # View Docker logs

# Logs
npm run logs:view           # View combined logs with pino-pretty
npm run logs:errors         # View error logs with pino-pretty
```

## Architecture Overview

### Monorepo Structure

This is a **monorepo** with three main packages:
- **Root package** (`package.json`): Development tooling and orchestration scripts
- **Client package** (`client/`): Expo React Native application
- **Server package** (`server/`): Express.js API server

Each package has independent versioning following SemVer 2.0.0 with automated version management.

### Server Architecture (Domain-Driven Design)

The server follows a **layered architecture** with clear separation of concerns:

```
server/src/
├── api/                    # API Layer (Routes, Controllers, HTTP handling)
│   ├── todo/              # Todo routes and controllers
│   ├── profile/           # Profile routes and controllers
│   └── health/            # Health check endpoints
├── domain/                # Domain Layer (Business Logic)
│   ├── todo/              # Todo domain entities, services, interfaces
│   ├── profile/           # Profile domain entities, services, interfaces
│   └── health/            # Health domain logic
├── infrastructure/        # Infrastructure Layer (Database, External Services)
│   ├── repositories/      # Database access implementations
│   ├── storage/           # File storage (Supabase Storage)
│   └── config/            # Configuration
├── common/                # Shared Layer (Utilities, Middleware, Exceptions)
│   ├── exceptions/        # Custom error types
│   ├── middlewares/       # Shared middleware (auth, error handling)
│   └── utils/             # Utility functions
└── __tests__/             # Test files
```

**Key Principles:**
- **Dependency Inversion**: Inner layers (domain) don't depend on outer layers (api, infrastructure)
- **Domain-centric**: Business logic isolated in domain layer
- Each domain has: entities, services, interfaces, and DTOs

### Client Architecture (Clean Architecture)

The client uses **Expo Router** for file-based routing with a modular component structure:

```
client/
├── app/                   # File-based routing (Expo Router)
│   ├── _layout.tsx       # Root layout with providers
│   ├── index.tsx         # Landing screen
│   ├── (auth)/           # Auth route group (sign-in, sign-up)
│   └── (user)/           # Protected user route group (dashboard, profile, todos)
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components (Button, Card, Input, etc.)
│   └── modules/          # Feature-specific components (AvatarUpload, ProfileForm)
├── api/                  # API client layer with TanStack Query hooks
│   ├── todo.api.ts
│   └── profile.api.ts
├── providers/            # React Context providers
│   ├── authProvider.tsx  # Authentication state
│   ├── queryProvider.tsx # TanStack Query setup
│   └── themeProvider.tsx # Theme management
├── themes/               # Design system (colors, typography, spacing)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities (supabase client, api-utils)
└── constants/            # App constants and configurations
```

**Key Technologies:**
- **Expo Router 5.0.6**: File-based routing (similar to Next.js)
- **TanStack Query**: Server state management
- **Supabase**: Authentication and database client
- **Custom Design System**: Themeable UI components

### Data Flow

**Server Request Flow:**
```
HTTP Request → Route (api/) → Controller (api/) → Service (domain/) → Repository (infrastructure/) → Database
```

**Client Request Flow:**
```
Component → TanStack Query Hook (api/) → API Request → Server → Response → Query Cache → Component Re-render
```

## Environment Setup

### Initial Setup

1. **Create environment files:**
   ```bash
   ./scripts/setup-environment.sh
   ```

2. **Configure environment variables:**
   - `client/.env.local`: Client-side config (must use `EXPO_PUBLIC_` prefix)
   - `server/.env`: Server-side config

### Required Environment Variables

**Client (`client/.env.local`):**
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Server (`server/.env`):**
```bash
NODE_ENV=development
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
SUPABASE_DB_URL=your_database_url
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:19006
```

See `docs/development/ENVIRONMENT_SETUP.md` for complete environment variable documentation.

## Version Control & Release Process

### Commit Convention

This project uses **Gitmoji + Conventional Commits** for semantic versioning:

```bash
✨ feat(client): add dark mode          # MINOR version bump
🐛 fix(server): fix validation bug      # PATCH version bump
💥 feat!: remove deprecated API         # MAJOR version bump (breaking change)
📝 docs: update README                  # PATCH version bump
♻️ refactor(api): simplify auth flow    # No version bump
```

### Git Hooks (Husky)

Pre-configured hooks automatically run on:
- **pre-commit**: Lints and formats staged files (via lint-staged)
- **commit-msg**: Validates commit message format

### Semantic Versioning

Automated version management via `semantic-release`:
- **MAJOR** (X.0.0): Breaking changes (`:boom:`, `feat!`)
- **MINOR** (1.X.0): New features (`:sparkles:`)
- **PATCH** (1.1.X): Bug fixes and improvements (`:bug:`, `:lock:`, etc.)

Versions are synchronized across all package.json files automatically during release.

## Testing Strategy

### Client Testing (Jest + React Native Testing Library)

```bash
cd client
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
```

- Tests located alongside components in `__tests__/` directories
- Coverage target: 80%+
- Files matching: `**/__tests__/**/*.test.{js,jsx,ts,tsx}`

### Server Testing (Vitest)

```bash
cd server
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
```

- Tests in `server/src/__tests__/`
- Coverage target: 90%+
- Fast execution with Vitest

## Key Technical Details

### Server Implementation Notes

- **TypeScript paths**: Uses `tsconfig-paths` for module path mapping
- **Environment variables**: Loaded via `@dotenvx/dotenvx` for enhanced .env support
- **API Documentation**: Swagger/OpenAPI at `/api-docs` endpoint
- **Health checks**: Available at `/api/health` with build information
- **Database**: PostgreSQL via Supabase with `pg` and `postgres` libraries
- **Logging**: Winston for application logs (see `logs/` directory)

### Client Implementation Notes

- **Routing**: File-based routing via Expo Router (routes in `app/` directory)
- **Route groups**: Use parentheses `(auth)` and `(user)` for logical grouping without affecting URL
- **Environment access**: Only variables prefixed with `EXPO_PUBLIC_` are accessible in client code
- **Cross-platform**: Single codebase runs on iOS, Android, and Web
- **State management**: TanStack Query for server state, React Context for local state

### Docker Support

Server can be containerized:
```bash
cd server
npm run docker:dev        # Development container
npm run docker:prod       # Production container
./docker.sh build         # Build image
./docker.sh logs-f        # Follow logs
```

## Documentation

Comprehensive documentation available in `docs/`:

- **Development**:
  - `docs/development/ENVIRONMENT_SETUP.md` - Environment configuration
  - `docs/development/SEMANTIC_VERSIONING.md` - Versioning and releases
  - `docs/WORKFLOW.md` - Complete development workflow

- **Client**:
  - `docs/client/ARCHITECTURE.md` - Client architecture details
  - `docs/client/TESTING.md` - Testing strategies
  - `docs/client/INSTALLATION.md` - Setup guide

- **Server**:
  - `docs/server/ARCHITECTURE.md` - Server architecture details
  - `docs/server/DDD_FOLDER_STRUCTURE.md` - Domain structure
  - `docs/server/TESTING.md` - Testing guide
  - `docs/server/SECURITY.md` - Security practices
  - `docs/server/ERROR_HANDLING.md` - Error handling patterns

- **AI Context**: `docs/AI_CONTEXT.md` - Comprehensive project context for AI assistants

## Deployment

- **Client (Web)**: https://lab1.warteamx.com (AWS S3 + CloudFront)
- **Server (API)**: http://56.228.14.41/api (AWS EC2 with Docker)
- **API Docs**: http://56.228.14.41/api-docs

Automated deployment via GitHub Actions on push to `main` branch.
