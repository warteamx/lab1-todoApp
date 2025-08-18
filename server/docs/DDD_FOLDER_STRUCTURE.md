# 📁 Domain-Driven Design & Folder Structure

## Overview

This document provides a detailed guide to the Domain-Driven Design (DDD) implementation and folder structure of our Express.js server. The architecture emphasizes business domain modeling, clean separation of concerns, and maintainable code organization.

## 🎯 Domain-Driven Design Principles

### 1. Core DDD Concepts

**Ubiquitous Language**: Consistent terminology used across code, documentation, and business discussions.

**Bounded Contexts**: Clear boundaries around related business capabilities:
- **Todo Context**: Task management domain
- **Profile Context**: User profile management domain  
- **Health Context**: System monitoring domain

**Domain Model**: Rich business objects that encapsulate behavior and enforce business rules.

**Layered Architecture**: Clear separation between business logic and technical concerns.

### 2. DDD Building Blocks

#### Entities
Objects with distinct identity that persist over time:
```typescript
// Todo Entity - Has identity and lifecycle
export interface Todo {
  id: number;           // Unique identifier
  user_id: string;      // Owner reference
  created_at: Date;     // Creation timestamp
  task: string;         // Business data
  is_complete: boolean; // Business state
}
```

#### Value Objects
Objects defined by their attributes, immutable:
```typescript
// Example Value Object (if implemented)
export class TodoTask {
  constructor(private readonly value: string) {
    if (!value.trim()) {
      throw new ValidationException('Task cannot be empty');
    }
    if (value.length > 500) {
      throw new ValidationException('Task too long');
    }
  }
  
  getValue(): string {
    return this.value;
  }
}
```

#### Domain Services
Business logic that doesn't naturally fit in entities:
```typescript
export class TodoService implements ITodoService {
  constructor(private todoRepository: ITodoRepository) {}

  async createTodo(task: string, user_id: string): Promise<Todo> {
    // Domain business rules
    this.validateTask(task);
    
    // Orchestrate domain operations
    return await this.todoRepository.createTodo(task.trim(), user_id);
  }
  
  private validateTask(task: string): void {
    if (!task.trim()) {
      throw new ValidationException('Task cannot be empty');
    }
    if (task.length > 500) {
      throw new ValidationException('Task exceeds maximum length');
    }
  }
}
```

#### Repositories
Abstractions for data access, defined in domain but implemented in infrastructure:
```typescript
// Domain Interface
export interface ITodoRepository {
  getTodos(user_id: string): Promise<Todo[]>;
  createTodo(task: string, user_id: string): Promise<Todo>;
  updateTodo(id: number, task: string, is_complete: boolean, user_id: string): Promise<Todo>;
  deleteTodo(id: number, user_id: string): Promise<void>;
}
```

## 📂 Detailed Folder Structure

```
server/
├── src/
│   ├── api/                    # 🌐 API Layer (Presentation)
│   │   ├── health/
│   │   │   ├── health.routes.ts     # HTTP routes definition
│   │   │   └── health.controller.ts # Request/response handling
│   │   ├── todo/
│   │   │   ├── todo.routes.ts       # Todo HTTP endpoints
│   │   │   └── todo.controller.ts   # Todo request handlers
│   │   └── profile/
│   │       ├── profile.routes.ts    # Profile HTTP endpoints
│   │       └── profile.controller.ts # Profile request handlers
│   │
│   ├── domain/                 # 🏢 Domain Layer (Business Logic)
│   │   ├── todo/
│   │   │   ├── entities/
│   │   │   │   └── todo.entity.ts   # Todo business object
│   │   │   ├── services/
│   │   │   │   └── todo.service.ts  # Todo business logic
│   │   │   ├── interfaces/
│   │   │   │   └── todo.interface.ts # Service contracts
│   │   │   └── dto/
│   │   │       ├── create-todo.dto.ts # Creation data structure
│   │   │       └── update-todo.dto.ts # Update data structure
│   │   ├── profile/
│   │   │   ├── entities/
│   │   │   │   └── profile.entity.ts # Profile business object
│   │   │   ├── services/
│   │   │   │   └── profile.service.ts # Profile business logic
│   │   │   ├── interfaces/
│   │   │   │   ├── profile.interface.ts     # Service contract
│   │   │   │   └── profile-repository.interface.ts # Repo contract
│   │   │   └── dto/
│   │   │       ├── create-profile.dto.ts    # Profile creation DTO
│   │   │       └── update-profile.dto.ts    # Profile update DTO
│   │   └── health/
│   │       ├── entities/
│   │       │   └── health-status.entity.ts  # Health status object
│   │       ├── services/
│   │       │   └── health.service.ts        # Health check logic
│   │       └── interfaces/
│   │           └── health.interface.ts      # Health service contract
│   │
│   ├── infrastructure/         # 🔧 Infrastructure Layer (Technical)
│   │   ├── repositories/
│   │   │   ├── todo.repository.ts           # Todo data access implementation
│   │   │   └── profile.repository.ts        # Profile data access implementation
│   │   ├── storage/
│   │   │   └── storage.service.ts           # File storage (Supabase Storage)
│   │   ├── config/
│   │   │   ├── app.config.ts                # Application configuration
│   │   │   ├── database.config.ts           # Database configuration
│   │   │   └── storage.config.ts            # Storage configuration
│   │   └── database/
│   │       ├── connection.ts                # Database connection setup
│   │       └── migrations/                  # Database schema changes
│   │
│   ├── common/                 # 🛠️ Common Layer (Shared)
│   │   ├── exceptions/
│   │   │   ├── base.exception.ts            # Base exception class
│   │   │   ├── validation.exception.ts      # Validation errors (400)
│   │   │   ├── unauthorized.exception.ts    # Auth errors (401)
│   │   │   ├── forbidden.exception.ts       # Permission errors (403)
│   │   │   ├── not-found.exception.ts       # Not found errors (404)
│   │   │   ├── conflict.exception.ts        # Conflict errors (409)
│   │   │   ├── internal-server.exception.ts # Server errors (500)
│   │   │   ├── database.exception.ts        # Database errors (500)
│   │   │   └── storage.exception.ts         # Storage errors (500)
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts           # Authentication middleware
│   │   │   ├── error.middleware.ts          # Global error handler
│   │   │   └── logger.middleware.ts         # Request logging
│   │   ├── types/
│   │   │   ├── auth.types.ts                # Authentication types
│   │   │   ├── request.types.ts             # Request extension types
│   │   │   └── common.types.ts              # Shared utility types
│   │   └── utils/
│   │       ├── async.utils.ts               # Async wrapper utilities
│   │       ├── validation.utils.ts          # Input validation helpers
│   │       └── response.utils.ts            # Response formatting
│   │
│   ├── __tests__/              # 🧪 Testing
│   │   ├── setup.ts                         # Global test configuration
│   │   ├── utils/
│   │   │   ├── test-helpers.ts              # Test utility functions
│   │   │   └── mock-data.ts                 # Test data generators
│   │   ├── todo/
│   │   │   ├── todo.service.test.ts         # Unit tests for business logic
│   │   │   └── todo.test.ts                 # Integration tests for API
│   │   ├── profile/
│   │   │   ├── profile.service.test.ts      # Unit tests for business logic
│   │   │   └── profile.test.ts              # Integration tests for API
│   │   └── health/
│   │       └── health.test.ts               # Health endpoint tests
│   │
│   ├── app.ts                  # 🚀 Express app configuration
│   ├── server.ts               # 🌐 Server startup and port binding
│   └── openapi.ts              # 📚 OpenAPI/Swagger specification
│
├── docs/                       # 📖 Documentation
│   ├── ARCHITECTURE.md                      # Architecture overview
│   ├── DDD_FOLDER_STRUCTURE.md              # This document
│   ├── TESTING.md                           # Testing guidelines
│   ├── ERROR_HANDLING.md                    # Error handling strategy
│   ├── SECURITY.md                          # Security implementation
│   └── SERVER_START.md                      # Deployment guide
│
├── logs/                       # 📄 Application logs
│   ├── combined.log                         # All log levels
│   └── error.log                            # Error logs only
│
├── coverage/                   # 📊 Test coverage reports
├── dist/                       # 🏗️ Compiled JavaScript (production)
├── package.json                # 📦 Dependencies and scripts
├── tsconfig.json               # ⚙️ TypeScript configuration
├── vitest.config.ts            # 🧪 Test configuration
├── docker-compose.yml          # 🐳 Docker orchestration
├── Dockerfile                  # 🐳 Container definition
└── .env.example                # 🔐 Environment template
```

## 🏗️ Layer Responsibilities

### 1. API Layer (`src/api/`)

**Purpose**: Handle HTTP requests, responses, and routing.

**Responsibilities**:
- Define HTTP routes and methods
- Parse and validate request data
- Call appropriate domain services
- Format and return responses
- Handle HTTP-specific concerns (status codes, headers)

**Naming Conventions**:
- Routes: `{domain}.routes.ts`
- Controllers: `{domain}.controller.ts`

**Example Structure**:
```typescript
// todo.routes.ts
import { Router } from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from './todo.controller';

const router = Router();

router.get('/', getTodos);      // GET /api/todo
router.post('/', createTodo);   // POST /api/todo
router.put('/:id', updateTodo); // PUT /api/todo/:id
router.delete('/:id', deleteTodo); // DELETE /api/todo/:id

export default router;
```

```typescript
// todo.controller.ts
export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const { task } = req.body;
  const userId = req.userClaims!.sub;
  
  const todo = await todoService.createTodo(task, userId);
  
  res.status(201).json(todo);
});
```

### 2. Domain Layer (`src/domain/`)

**Purpose**: Contains business logic, rules, and domain concepts.

**Responsibilities**:
- Define business entities and their behavior
- Implement business rules and validation
- Orchestrate complex business operations
- Define contracts for external dependencies
- Handle domain-specific errors

**Domain Organization**:
Each domain (todo, profile, health) contains:

```
domain/{context}/
├── entities/        # Business objects with identity
├── services/        # Business logic and orchestration
├── interfaces/      # Contracts for dependencies
└── dto/            # Data transfer objects
```

**Example Domain Service**:
```typescript
// todo.service.ts
export class TodoService implements ITodoService {
  constructor(
    private readonly todoRepository: ITodoRepository
  ) {}

  async createTodo(task: string, userId: string): Promise<Todo> {
    // Business validation
    this.validateTask(task);
    
    // Business logic
    const trimmedTask = task.trim();
    
    // Delegate to repository
    return await this.todoRepository.createTodo(trimmedTask, userId);
  }

  private validateTask(task: string): void {
    if (!task?.trim()) {
      throw new ValidationException('Task cannot be empty');
    }
    
    if (task.length > 500) {
      throw new ValidationException('Task exceeds maximum length of 500 characters');
    }
  }
}
```

### 3. Infrastructure Layer (`src/infrastructure/`)

**Purpose**: Implement technical concerns and external integrations.

**Responsibilities**:
- Implement repository interfaces
- Handle database connections and queries
- Manage external service integrations
- Provide configuration and environment handling
- Implement storage and file operations

**Infrastructure Organization**:
```
infrastructure/
├── repositories/    # Data access implementations
├── storage/        # File storage implementations
├── config/         # Configuration management
└── database/       # Database setup and migrations
```

**Example Repository Implementation**:
```typescript
// todo.repository.ts
export class TodoRepository implements ITodoRepository {
  async createTodo(task: string, userId: string): Promise<Todo> {
    try {
      const result = await sql`
        INSERT INTO todos (task, user_id, is_complete)
        VALUES (${task}, ${userId}, false)
        RETURNING *
      `;
      
      if (result.length === 0) {
        throw new DatabaseException('Failed to create todo');
      }
      
      return result[0];
    } catch (error) {
      if (error instanceof DatabaseException) {
        throw error;
      }
      throw new DatabaseException(`Database error: ${error}`);
    }
  }
}
```

### 4. Common Layer (`src/common/`)

**Purpose**: Shared utilities and cross-cutting concerns.

**Responsibilities**:
- Define custom exceptions and error handling
- Provide shared middleware functions
- Define common TypeScript types
- Implement utility functions
- Handle cross-cutting concerns

**Common Organization**:
```
common/
├── exceptions/     # Custom error types
├── middlewares/    # Shared middleware
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## 🎨 Naming Conventions

### Files and Folders
- **Folders**: `kebab-case` (e.g., `domain-services`)
- **Files**: `kebab-case.type.ts` (e.g., `todo.service.ts`)
- **Classes**: `PascalCase` (e.g., `TodoService`)
- **Interfaces**: `PascalCase` with `I` prefix (e.g., `ITodoService`)
- **Types**: `PascalCase` (e.g., `CreateTodoDto`)

### Domain Concepts
- **Entities**: `{Domain}.entity.ts` (e.g., `todo.entity.ts`)
- **Services**: `{Domain}.service.ts` (e.g., `todo.service.ts`)
- **Repositories**: `{Domain}.repository.ts` (e.g., `todo.repository.ts`)
- **DTOs**: `{action}-{domain}.dto.ts` (e.g., `create-todo.dto.ts`)
- **Interfaces**: `{Domain}.interface.ts` (e.g., `todo.interface.ts`)

### API Layer
- **Routes**: `{Domain}.routes.ts` (e.g., `todo.routes.ts`)
- **Controllers**: `{Domain}.controller.ts` (e.g., `todo.controller.ts`)

## 🔄 Data Flow Through Layers

### Request Flow Example (Create Todo)

1. **HTTP Request**: `POST /api/todo` with `{ task: "Learn DDD" }`

2. **API Layer**:
   ```typescript
   // todo.routes.ts → todo.controller.ts
   export const createTodo = asyncHandler(async (req, res) => {
     const { task } = req.body;           // Extract data
     const userId = req.userClaims!.sub;  // Get authenticated user
     
     const todo = await todoService.createTodo(task, userId); // Call domain
     
     res.status(201).json(todo);          // Return response
   });
   ```

3. **Domain Layer**:
   ```typescript
   // todo.service.ts
   async createTodo(task: string, userId: string): Promise<Todo> {
     this.validateTask(task);             // Business rules
     
     return await this.todoRepository.createTodo(task.trim(), userId); // Delegate
   }
   ```

4. **Infrastructure Layer**:
   ```typescript
   // todo.repository.ts
   async createTodo(task: string, userId: string): Promise<Todo> {
     const result = await sql`
       INSERT INTO todos (task, user_id, is_complete)
       VALUES (${task}, ${userId}, false)
       RETURNING *
     `;                                   // Database operation
     
     return result[0];                    // Return entity
   }
   ```

5. **Response**: Returns through the same layers with the created Todo entity

## 🧪 Testing Strategy by Layer

### API Layer Tests (Integration)
- Test HTTP endpoints with actual requests
- Verify status codes and response structure
- Test authentication and authorization
- Mock domain services

### Domain Layer Tests (Unit)
- Test business logic in isolation
- Test business rule validation
- Test error handling scenarios
- Mock repository dependencies

### Infrastructure Layer Tests (Integration)
- Test database operations
- Test external service integrations
- Test configuration loading
- Use test database or mocks

### Example Test Structure:
```typescript
// Domain Layer Test (Unit)
describe('TodoService', () => {
  let todoService: TodoService;
  let mockTodoRepository: jest.Mocked<ITodoRepository>;

  beforeEach(() => {
    mockTodoRepository = {
      createTodo: jest.fn(),
      getTodos: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };
    todoService = new TodoService(mockTodoRepository);
  });

  describe('createTodo', () => {
    it('should create todo with valid task', async () => {
      // Arrange
      const task = 'Learn DDD';
      const userId = 'user-123';
      const expectedTodo = { id: 1, task, user_id: userId, is_complete: false };
      
      mockTodoRepository.createTodo.mockResolvedValue(expectedTodo);

      // Act
      const result = await todoService.createTodo(task, userId);

      // Assert
      expect(result).toEqual(expectedTodo);
      expect(mockTodoRepository.createTodo).toHaveBeenCalledWith('Learn DDD', 'user-123');
    });

    it('should throw ValidationException for empty task', async () => {
      // Arrange & Act & Assert
      await expect(todoService.createTodo('', 'user-123'))
        .rejects.toThrow(ValidationException);
    });
  });
});
```

## 📐 Design Patterns Applied

### 1. Repository Pattern
- Abstracts data access
- Defined in domain, implemented in infrastructure
- Enables easy testing and swapping implementations

### 2. Service Layer Pattern
- Encapsulates business logic
- Orchestrates operations across repositories
- Provides clean API for controllers

### 3. Dependency Injection
- Constructor-based injection
- Interface-based contracts
- Enables loose coupling and testability

### 4. Factory Pattern
- Service instantiation
- Configuration object creation
- Database connection management

### 5. Strategy Pattern
- Different storage implementations
- Multiple authentication strategies
- Pluggable business rule implementations

## 🎯 Benefits of This Structure

### 1. Maintainability
- **Clear separation**: Each layer has distinct responsibilities
- **Modular design**: Easy to modify individual components
- **Consistent patterns**: Predictable code organization

### 2. Testability
- **Isolated layers**: Easy to unit test business logic
- **Interface-based design**: Easy to mock dependencies
- **Clear boundaries**: Different testing strategies per layer

### 3. Scalability
- **Bounded contexts**: Can scale domains independently
- **Loose coupling**: Easy to extract microservices
- **Framework independence**: Can swap implementations

### 4. Domain Alignment
- **Business-focused**: Code reflects business concepts
- **Ubiquitous language**: Consistent terminology
- **Business rules**: Clearly expressed and enforced

### 5. Developer Experience
- **Type safety**: TypeScript across all layers
- **Clear navigation**: Predictable file locations
- **Consistent conventions**: Faster development

## 🚀 Getting Started Guide

### 1. Adding a New Domain

When adding a new domain (e.g., "Task Categories"):

```bash
# Create domain structure
mkdir -p src/domain/category/{entities,services,interfaces,dto}
mkdir -p src/api/category
mkdir -p src/infrastructure/repositories
mkdir -p src/__tests__/category

# Create files
touch src/domain/category/entities/category.entity.ts
touch src/domain/category/services/category.service.ts
touch src/domain/category/interfaces/category.interface.ts
touch src/domain/category/dto/create-category.dto.ts
touch src/api/category/category.routes.ts
touch src/api/category/category.controller.ts
touch src/infrastructure/repositories/category.repository.ts
```

### 2. Implementation Order

1. **Define Entity** (`category.entity.ts`)
2. **Create Repository Interface** (`category.interface.ts`)
3. **Implement Service** (`category.service.ts`)
4. **Create Repository** (`category.repository.ts`)
5. **Add Controller** (`category.controller.ts`)
6. **Define Routes** (`category.routes.ts`)
7. **Write Tests** (`category.service.test.ts`, `category.test.ts`)

### 3. Integration Checklist

- [ ] Add routes to main app
- [ ] Update OpenAPI documentation
- [ ] Add database migrations if needed
- [ ] Write comprehensive tests
- [ ] Update documentation

---

**Last Updated**: August 2025  
**DDD Version**: 2.0  
**Maintained by**: Development Team

This folder structure provides a solid foundation for building maintainable, scalable applications that closely align with business domains while following clean architecture principles.
