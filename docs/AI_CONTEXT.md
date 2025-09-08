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

### Root Level - Orchestration Scripts

```bash
# Development Scripts
npm run dev              # Start both client and server simultaneously
npm run dev:client       # Start Expo development server only
npm run dev:server       # Start Express server only

# Testing Scripts
npm run test             # Run tests for both client and server
npm run test:client      # Run client tests
npm run test:server      # Run server tests
npm run test:pre-commit  # Pre-commit test validation

# Linting & Formatting Scripts
npm run lint             # Lint both client and server
npm run lint:client      # Lint client code
npm run lint:server      # Lint server code
npm run lint:fix         # Fix linting issues in both packages
npm run lint:fix:client  # Fix client linting issues
npm run lint:fix:server  # Fix server linting issues
npm run format           # Format markdown, YAML, and JSON files

# Build Scripts
npm run build            # Build both client and server
npm run build:client     # Build client for production
npm run build:server     # Build server for production
npm run build:version    # Build version info for both packages

# CI/CD & Release Scripts
npm run release          # Create semantic release
npm run release:dry      # Dry run of semantic release
npm run deploy           # Deploy to production
npm run deploy:staging   # Deploy to staging
npm run deploy:production # Deploy to production environment
```

### Client Specific (/client)

```bash
# Development Scripts
npm run client:start   # Start Expo development server
npm run dev            # Alias for npm start
npm run android        # Start for Android
npm run ios            # Start for iOS
npm run web            # Start for web
npm run reset-project  # Reset Expo project

# Build Scripts
npm run build          # Build for web production
npm run build:web      # Explicit web build
npm run build:version  # Build version information

# Testing Scripts
npm run test           # Run Jest tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage
npm run test:ci        # Run tests for CI environment

# Linting & Formatting Scripts
npm run lint           # Lint TypeScript/JavaScript files
npm run lint:fix       # Fix linting issues automatically
npm run format         # Format code with Prettier
```

### Server Specific (/server)

```bash
# Development Scripts
npm run dev            # Start with hot reload (ts-node-dev)
npm run start          # Start production server

# Build Scripts
npm run build          # Build TypeScript to JavaScript
npm run build:version  # Build version information

# Testing Scripts
npm run test           # Run Vitest tests
npm run test:ci        # Run tests for CI
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage

# Linting & Formatting Scripts
npm run lint           # Lint TypeScript files
npm run lint:fix       # Fix linting issues
npm run format         # Format code with Prettier

# Logging Scripts
npm run logs:view      # View combined logs with pino-pretty
npm run logs:errors    # View error logs with pino-pretty

# Docker Scripts
npm run docker:dev     # Run development Docker container
npm run docker:prod    # Run production Docker container
npm run docker:build   # Build Docker image
npm run docker:stop    # Stop Docker containers
npm run docker:logs    # View Docker logs
npm run docker:test    # Run tests in Docker
npm run docker:clean   # Clean up Docker resources
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

## 🤖 AI-Generated Documentation Guidelines

### Naming Conventions for AI-Generated Summary Documents

When creating AI-generated summary documents, follow these naming conventions:

**Location**: `docs/ai-generated/summaries/`

**Naming Format**: `[ACTION]_[COMPONENT]_[TYPE].md`

**Examples**:

- `PACKAGE_REFACTOR_SUMMARY.md` - Package.json refactoring documentation
- `PACKAGE_INSTALLATION_COMPLETE.md` - Node packages reinstallation summary
- `UI_COMPONENT_IMPLEMENTATION.md` - UI component development summary
- `API_ENDPOINT_REFACTOR.md` - API endpoint refactoring documentation
- `DATABASE_MIGRATION_SUMMARY.md` - Database schema changes summary
- `SECURITY_AUDIT_REPORT.md` - Security vulnerability assessment
- `PERFORMANCE_OPTIMIZATION_SUMMARY.md` - Performance improvement documentation
- `TESTING_IMPLEMENTATION_GUIDE.md` - Testing strategy and implementation
- `DEPLOYMENT_CONFIGURATION_SUMMARY.md` - Deployment setup and changes
- `CODE_REVIEW_SUMMARY.md` - Code review findings and improvements

**Naming Rules**:

1. Use **UPPERCASE** with **underscores** for file names
2. Start with the **primary action/verb** (PACKAGE, UI, API, DATABASE, etc.)
3. Include the **component/area** being affected
4. End with the **document type** (SUMMARY, GUIDE, REPORT, COMPLETE, etc.)
5. Keep names descriptive but concise
6. Use consistent terminology across related documents

**Content Structure**:

- Clear title with emoji
- Executive summary
- Detailed changes/implementations
- Benefits and impact
- Next steps or recommendations
- Technical details when relevant

This ensures AI-generated documentation is properly organized, easily discoverable, and follows project conventions.

---

**This context provides comprehensive information about the Lab1-TodoApp project structure, patterns, and workflows for AI assistants to provide accurate and helpful responses.**
