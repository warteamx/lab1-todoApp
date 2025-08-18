# 🏗️ Server Architecture Documentation

## Overview

This document provides a comprehensive overview of the server architecture, which follows **Domain-Driven Design (DDD)** principles and **Clean Architecture** patterns. The server is built with **Express.js**, **TypeScript**, and **Supabase**, implementing a modular, scalable, and maintainable architecture.

## 🎯 Architectural Principles

### 1. Domain-Driven Design (DDD)
- **Domain-centric approach**: Business logic is the core focus
- **Ubiquitous language**: Consistent terminology across code and documentation
- **Bounded contexts**: Clear separation of business domains
- **Layered architecture**: Clear separation of concerns

### 2. Clean Architecture
- **Dependency inversion**: Inner layers don't depend on outer layers
- **Interface segregation**: Dependencies defined by interfaces
- **Single responsibility**: Each layer has a specific purpose
- **Framework independence**: Business logic isolated from frameworks

### 3. SOLID Principles
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

## 🏛️ Architecture Layers

```
┌─────────────────────────────────────────┐
│               API Layer                 │ ← Routes, Controllers, Middleware
├─────────────────────────────────────────┤
│             Domain Layer                │ ← Business Logic, Entities, Services
├─────────────────────────────────────────┤
│          Infrastructure Layer           │ ← Database, External Services, Config
├─────────────────────────────────────────┤
│              Common Layer               │ ← Shared Utilities, Types, Exceptions
└─────────────────────────────────────────┘
```

### 1. API Layer (`src/api/`)
**Responsibility**: HTTP request handling, routing, and response formatting

**Components**:
- **Routes**: Define HTTP endpoints and middleware
- **Controllers**: Handle HTTP requests and responses
- **Middleware**: Authentication, validation, logging
- **DTOs**: Data Transfer Objects for request/response

**Example Structure**:
```
api/
├── todo/
│   ├── todo.routes.ts      # HTTP routing configuration
│   └── todo.controller.ts  # Request/response handling
├── profile/
│   ├── profile.routes.ts
│   └── profile.controller.ts
└── health/
    ├── health.routes.ts
    └── health.controller.ts
```

### 2. Domain Layer (`src/domain/`)
**Responsibility**: Core business logic and domain rules

**Components**:
- **Entities**: Core business objects with identity
- **Services**: Domain business logic and operations
- **Interfaces**: Contracts for external dependencies
- **DTOs**: Domain-specific data structures

**Example Structure**:
```
domain/
├── todo/
│   ├── entities/
│   │   └── todo.entity.ts     # Todo business object
│   ├── services/
│   │   └── todo.service.ts    # Todo business logic
│   ├── interfaces/
│   │   └── todo.interface.ts  # Service contracts
│   └── dto/
│       └── todo.dto.ts        # Domain DTOs
└── profile/
    ├── entities/
    ├── services/
    ├── interfaces/
    └── dto/
```

### 3. Infrastructure Layer (`src/infrastructure/`)
**Responsibility**: External dependencies and technical implementations

**Components**:
- **Repositories**: Database access implementations
- **Storage**: File storage implementations (Supabase Storage)
- **Config**: Environment and application configuration
- **Database**: Database connection and migrations

**Example Structure**:
```
infrastructure/
├── repositories/
│   ├── todo.repository.ts      # Database operations
│   └── profile.repository.ts
├── storage/
│   └── storage.service.ts      # File storage operations
├── config/
│   ├── database.config.ts      # Database configuration
│   └── app.config.ts           # Application configuration
└── database/
    └── connection.ts           # Database connection setup
```

### 4. Common Layer (`src/common/`)
**Responsibility**: Shared utilities and cross-cutting concerns

**Components**:
- **Exceptions**: Custom error types and handling
- **Middleware**: Shared middleware functions
- **Types**: Shared TypeScript types
- **Utils**: Utility functions and helpers

**Example Structure**:
```
common/
├── exceptions/
│   ├── base.exception.ts       # Base exception class
│   ├── validation.exception.ts # Validation errors
│   └── not-found.exception.ts  # Not found errors
├── middlewares/
│   ├── auth.middleware.ts      # Authentication
│   ├── error.middleware.ts     # Error handling
│   └── logger.middleware.ts    # Request logging
├── types/
│   ├── auth.types.ts           # Authentication types
│   └── common.types.ts         # Shared types
└── utils/
    ├── validation.utils.ts     # Validation helpers
    └── async.utils.ts          # Async utilities
```

## 🔄 Data Flow

### Request Flow
```
HTTP Request
    ↓
[API Layer] Routes → Controller
    ↓
[Domain Layer] Service (Business Logic)
    ↓
[Infrastructure Layer] Repository (Database)
    ↓
[Infrastructure Layer] Database/Storage
    ↓
Response back through layers
```

### Detailed Flow Example (Create Todo)
1. **HTTP Request**: `POST /api/todo`
2. **Route**: `todo.routes.ts` → `createTodo` controller
3. **Controller**: `todo.controller.ts` → validates request, calls service
4. **Service**: `todo.service.ts` → implements business logic
5. **Repository**: `todo.repository.ts` → database operations
6. **Database**: PostgreSQL via Supabase
7. **Response**: Success/error response back to client

## 🧩 Domain-Driven Design Implementation

### Bounded Contexts

Our application has clear bounded contexts:

1. **Todo Context**
   - Manages task creation, updates, completion
   - User-scoped todo lists
   - Todo lifecycle management

2. **Profile Context**
   - User profile management
   - Avatar uploads
   - Profile data updates

3. **Health Context**
   - System health monitoring
   - API availability checks

### Entities

Entities represent core business objects with identity:

```typescript
// Todo Entity
export interface Todo {
  id: number;           // Identity
  user_id: string;      // Owner
  created_at: Date;     // Timestamp
  task: string;         // Content
  is_complete: boolean; // State
}

// Profile Entity
export interface Profile {
  id: string;           // Identity (matches auth user)
  email: string;        // Contact
  full_name?: string;   // Display name
  avatar_url?: string;  // Profile image
  created_at: Date;     // Timestamp
  updated_at: Date;     // Last modified
}
```

### Services (Domain Logic)

Services implement business rules and orchestrate operations using functions:

```typescript
// Todo Service - Business Logic (Function-based)
import { ITodoService } from '../interfaces/todo.interface';
import { createTodo as repositoryCreateTodo } from '../../../infrastructure/repositories/todo.repository';
import { ValidationException } from '../../../common/exceptions/validation.exception';

export const todoService: ITodoService = {
  async createTodo(task: string, user_id: string): Promise<Todo> {
    // Business rule: Task cannot be empty
    if (!task.trim()) {
      throw new ValidationException('Task cannot be empty');
    }
    
    // Business rule: Task length limits
    if (task.length > 500) {
      throw new ValidationException('Task too long');
    }
    
    return await repositoryCreateTodo(task.trim(), user_id);
  },

  async getTodos(user_id: string): Promise<Todo[]> {
    return await repositoryGetTodos(user_id);
  },

  async updateTodo(id: number, task: string, is_complete: boolean, user_id: string): Promise<Todo> {
    // Business validation
    if (!task.trim()) {
      throw new ValidationException('Task cannot be empty');
    }
    
    return await repositoryUpdateTodo(id, task.trim(), is_complete, user_id);
  },

  async deleteTodo(id: number, user_id: string): Promise<void> {
    return await repositoryDeleteTodo(id, user_id);
  }
};
```

### Repositories (Data Access)

Repositories abstract data access using function-based implementations:

```typescript
// Repository Functions (Infrastructure)
import sql from '../database/postgres';
import { DatabaseException, NotFoundException } from '../../common/exceptions';

export async function createTodo(task: string, user_id: string): Promise<Todo> {
  try {
    const res = await sql<Todo[]>`
      INSERT INTO todos (task, user_id, is_complete)
      VALUES (${task}, ${user_id}, FALSE)
      RETURNING id, task, is_complete, user_id, created_at
    `;

    if (res.length === 0) {
      throw new DatabaseException('Failed to create todo');
    }

    return res[0];
  } catch (error) {
    throw new DatabaseException(`Failed to create todo: ${error}`);
  }
}

export async function getTodos(user_id: string): Promise<Todo[]> {
  try {
    const res = await sql<Todo[]>`
      SELECT * FROM todos WHERE user_id = ${user_id}
      ORDER BY created_at DESC
    `;
    return res;
  } catch (error) {
    throw new DatabaseException(`Failed to get todos: ${error}`);
  }
}

export async function updateTodo(
  id: number, 
  task: string, 
  is_complete: boolean, 
  user_id: string
): Promise<Todo> {
  try {
    const res = await sql<Todo[]>`
      UPDATE todos 
      SET task = ${task}, is_complete = ${is_complete}
      WHERE id = ${id} AND user_id = ${user_id}
      RETURNING *
    `;

    if (res.length === 0) {
      throw new NotFoundException('Todo not found or not owned by user');
    }

    return res[0];
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new DatabaseException(`Failed to update todo: ${error}`);
  }
}

export async function deleteTodo(id: number, user_id: string): Promise<void> {
  try {
    const res = await sql`
      DELETE FROM todos 
      WHERE id = ${id} AND user_id = ${user_id}
      RETURNING id
    `;

    if (res.length === 0) {
      throw new NotFoundException('Todo not found or not owned by user');
    }
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new DatabaseException(`Failed to delete todo: ${error}`);
  }
}
```

## 🔧 Technical Architecture

### Technology Stack

**Core Framework**:
- **Express.js**: Web framework
- **TypeScript**: Type safety and developer experience
- **Node.js 18**: Runtime environment

**Database & Storage**:
- **PostgreSQL**: Primary database (via Supabase)
- **Supabase**: Backend-as-a-Service for auth, database, storage
- **postgres**: SQL query builder

**Security**:
- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **JWT**: Authentication tokens (Supabase Auth)

**Development**:
- **Vitest**: Testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **ts-node-dev**: Development server

**DevOps**:
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Winston**: Logging
- **Morgan**: HTTP request logging

### Configuration Management

Environment-based configuration with validation using functions:

```typescript
// config/app.config.ts
export const appConfig = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  supabase: {
    url: process.env.SUPABASE_URL!,
    key: process.env.SUPABASE_KEY!,
    dbUrl: process.env.SUPABASE_DB_URL!,
  },
  storage: {
    bucket: process.env.SUPABASE_BUCKET || 'Avatar',
  },
};

// Validation function
export function validateConfig(): void {
  const required = ['SUPABASE_URL', 'SUPABASE_KEY', 'SUPABASE_DB_URL'];
  
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
```

### Error Handling Architecture

Centralized error handling with custom exception classes and function-based middleware:

```typescript
// Exception Hierarchy (Classes for Errors)
BaseException
├── ValidationException (400)
├── UnauthorizedException (401)
├── ForbiddenException (403)
├── NotFoundException (404)
├── ConflictException (409)
└── InternalServerException (500)
    ├── DatabaseException
    └── StorageException

// Error Middleware (Function-based)
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof BaseException) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
      }
    });
    return;
  }

  // Handle unexpected errors
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
    }
  });
}

// Async Handler (Function-based)
export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
```

### Authentication & Authorization

**Authentication Flow**:
1. Client sends JWT token in Authorization header
2. `authMiddleware` validates token with Supabase
3. User claims attached to request object
4. Controllers access user information via `req.userClaims`

**Authorization Pattern**:
- Resource-level authorization in services
- User-scoped data access in repositories
- No shared data between users

## 🚀 Scalability Considerations

### Horizontal Scaling
- **Stateless design**: No server-side sessions
- **Database connection pooling**: Efficient resource usage
- **Container-based deployment**: Easy scaling with Docker

### Performance Optimizations
- **Async/await patterns**: Non-blocking operations
- **Error handling**: Graceful failure handling
- **Request logging**: Performance monitoring
- **Health checks**: System monitoring

### Future Enhancements
- **Caching layer**: Redis for frequently accessed data
- **Message queues**: Background job processing
- **Microservices**: Domain-based service separation
- **Event sourcing**: Audit trail and data consistency

## 📊 Monitoring & Observability

### Logging Strategy
- **Structured logging**: JSON format with Winston
- **Request logging**: HTTP requests with Morgan
- **Error logging**: Centralized error tracking
- **Log levels**: Debug, info, warn, error

### Health Monitoring
- **Health endpoint**: `/api/health` for system status
- **Docker health checks**: Container monitoring
- **Database connectivity**: Connection status checks

## 🔐 Security Architecture

### Security Layers
1. **Network Security**: HTTPS, secure headers
2. **Authentication**: JWT token validation
3. **Authorization**: User-scoped resource access
4. **Input Validation**: Request data validation
5. **Error Handling**: Secure error responses

### Security Headers (Helmet.js)
- **CSP**: Content Security Policy
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME sniffing protection

## 📚 Design Patterns Used

### 1. Repository Pattern
- Abstracts data access layer using functions
- Enables testing with mock functions
- Separates domain logic from data persistence

### 2. Service Layer Pattern
- Encapsulates business logic in service objects
- Provides clean API for controllers using function composition
- Handles cross-cutting concerns

### 3. Functional Composition
- Function-based services and repositories
- Easy to test individual functions
- Clear separation of concerns without classes

### 4. Factory Pattern
- Database connection factory functions
- Service instance creation functions
- Configuration object creation

### 5. Middleware Pattern
- Cross-cutting concerns (auth, logging, errors) using functions
- Request/response pipeline
- Reusable functionality

## 🎯 Benefits of This Architecture

### 1. Maintainability
- **Clear separation of concerns**: Each layer has specific responsibilities
- **Modular design**: Easy to modify individual components
- **Consistent patterns**: Predictable code structure

### 2. Testability
- **Isolated business logic**: Easy to unit test
- **Interface-based design**: Easy to mock dependencies
- **Layer separation**: Different testing strategies per layer

### 3. Scalability
- **Loosely coupled components**: Easy to scale individual parts
- **Framework independence**: Can swap implementations
- **Database abstraction**: Can change database providers

### 4. Developer Experience
- **TypeScript**: Type safety and IntelliSense
- **Clear structure**: Easy to navigate and understand
- **Consistent patterns**: Faster development

### 5. Business Alignment
- **Domain-driven**: Code reflects business concepts
- **Ubiquitous language**: Consistent terminology
- **Business rules**: Clearly expressed in domain layer

---

**Last Updated**: August 2025  
**Architecture Version**: 2.0  
**Maintained by**: Development Team

This architecture provides a solid foundation for building scalable, maintainable, and testable applications while following industry best practices and domain-driven design principles.
