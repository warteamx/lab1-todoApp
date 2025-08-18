# 🧪 Comprehensive Testing Guide

This document provides a detailed testing strategy for the Express.js backend server, covering all aspects from unit tests to integration tests, following Domain-Driven Design principles.

## 🎯 Testing Philosophy

Our testing approach emphasizes:

- **Domain-centric testing**: Tests organized by business domains
- **Layer-specific strategies**: Different approaches for different architectural layers
- **Behavior-driven testing**: Focus on business behavior rather than implementation
- **Test pyramid structure**: Unit tests → Integration tests → E2E tests
- **Fail-fast principle**: Tests should catch issues early in development

## 📊 Testing Pyramid

```
    🔺 E2E Tests (Few)
   🔷🔷 Integration Tests (Some)
  🔹🔹🔹 Unit Tests (Many)
```

### Test Distribution:
- **70% Unit Tests**: Fast, isolated, business logic focused
- **20% Integration Tests**: API endpoints, database operations
- **10% E2E Tests**: Critical user journeys (if implemented)

## 📁 Complete Test Structure

```
src/
├── __tests__/
│   ├── setup.ts                    # Global test configuration
│   ├── utils/
│   │   ├── test-helpers.ts         # Shared test utilities
│   │   ├── mock-data.ts            # Test data generators
│   │   ├── database-helpers.ts     # Database test utilities
│   │   └── auth-helpers.ts         # Authentication test utilities
│   │
│   ├── unit/                       # 🔹 Unit Tests (Domain Layer)
│   │   ├── todo/
│   │   │   ├── todo.service.test.ts         # Business logic tests
│   │   │   └── todo.validation.test.ts      # Domain validation tests
│   │   ├── profile/
│   │   │   ├── profile.service.test.ts      # Business logic tests
│   │   │   └── profile.validation.test.ts   # Domain validation tests
│   │   └── health/
│   │       └── health.service.test.ts       # Health logic tests
│   │
│   ├── integration/                # 🔷 Integration Tests (API + Infrastructure)
│   │   ├── api/
│   │   │   ├── todo.api.test.ts             # Todo API endpoints
│   │   │   ├── profile.api.test.ts          # Profile API endpoints
│   │   │   └── health.api.test.ts           # Health API endpoints
│   │   ├── repositories/
│   │   │   ├── todo.repository.test.ts      # Database operations
│   │   │   └── profile.repository.test.ts   # Database operations
│   │   └── middleware/
│   │       ├── auth.middleware.test.ts      # Authentication tests
│   │       ├── error.middleware.test.ts     # Error handling tests
│   │       └── logger.middleware.test.ts    # Logging tests
│   │
│   ├── e2e/                        # 🔺 End-to-End Tests (Full Workflows)
│   │   ├── todo-workflow.e2e.test.ts        # Complete todo operations
│   │   └── profile-workflow.e2e.test.ts     # Complete profile operations
│   │
│   └── performance/                # ⚡ Performance Tests
│       ├── load.test.ts                     # Load testing scenarios
│       └── stress.test.ts                   # Stress testing scenarios
│
├── vitest.config.ts               # Test runner configuration
└── coverage/                      # Test coverage reports
```

## 🛠️ Testing Stack & Tools

### Core Testing Framework
- **[Vitest](https://vitest.dev/)**: Fast, TypeScript-native test runner
- **[Supertest](https://github.com/ladjs/supertest)**: HTTP assertion library
- **[Vitest UI](https://vitest.dev/guide/ui.html)**: Interactive test interface

### Testing Utilities
- **Built-in Mocking**: Vitest's `vi.mock()` and `vi.fn()`
- **Test Doubles**: Stubs, spies, and mocks for external dependencies
- **Coverage**: V8 coverage provider for accurate reporting
- **Snapshot Testing**: For stable API response structures

### Additional Tools
```json
{
  "@vitest/coverage-v8": "^3.2.4",
  "@vitest/ui": "^3.2.4",
  "supertest": "7.1.3",
  "@types/supertest": "6.0.3"
}
```

## 📝 Testing Strategies by Layer

### 1. 🔹 Unit Tests (Domain Layer)

**Purpose**: Test business logic in complete isolation

**Focus Areas**:
- Business rule validation
- Domain service operations
- Entity behavior
- Edge cases and error scenarios
- Input sanitization and transformation

**Testing Approach**:
```typescript
// todo.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { todoService } from '@/domain/todo/services/todo.service';
import * as todoRepository from '@/infrastructure/repositories/todo.repository';
import { ValidationException } from '@/common/exceptions/validation.exception';
import { mockTodoData } from '../utils/mock-data';

// Mock the repository functions
vi.mock('@/infrastructure/repositories/todo.repository');

describe('TodoService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTodo', () => {
    it('should create todo with valid task', async () => {
      // Arrange
      const task = 'Learn Domain-Driven Design';
      const userId = 'user-123';
      const expectedTodo = mockTodoData.createTodo({ task, user_id: userId });
      
      vi.mocked(todoRepository.createTodo).mockResolvedValue(expectedTodo);

      // Act
      const result = await todoService.createTodo(task, userId);

      // Assert
      expect(result).toEqual(expectedTodo);
      expect(todoRepository.createTodo).toHaveBeenCalledWith(
        'Learn Domain-Driven Design',
        'user-123'
      );
    });

    it('should trim whitespace from task', async () => {
      // Arrange
      const task = '  Learn DDD  ';
      const userId = 'user-123';
      const expectedTodo = mockTodoData.createTodo({ task: 'Learn DDD' });
      
      vi.mocked(todoRepository.createTodo).mockResolvedValue(expectedTodo);

      // Act
      const result = await todoService.createTodo(task, userId);

      // Assert
      expect(todoRepository.createTodo).toHaveBeenCalledWith(
        'Learn DDD',
        'user-123'
      );
    });

    it('should throw ValidationException for empty task', async () => {
      // Arrange & Act & Assert
      await expect(todoService.createTodo('', 'user-123'))
        .rejects.toThrow(ValidationException);
      
      await expect(todoService.createTodo('   ', 'user-123'))
        .rejects.toThrow(ValidationException);
    });

    it('should throw ValidationException for task exceeding max length', async () => {
      // Arrange
      const longTask = 'a'.repeat(501); // Exceeds 500 character limit

      // Act & Assert
      await expect(todoService.createTodo(longTask, 'user-123'))
        .rejects.toThrow(ValidationException);
    });

    it('should handle repository errors gracefully', async () => {
      // Arrange
      const task = 'Valid task';
      const userId = 'user-123';
      const dbError = new Error('Database connection failed');
      
      vi.mocked(todoRepository.createTodo).mockRejectedValue(dbError);

      // Act & Assert
      await expect(todoService.createTodo(task, userId))
        .rejects.toThrow('Database connection failed');
    });
  });

  describe('updateTodo', () => {
    it('should update todo with valid data', async () => {
      // Arrange
      const todoId = 1;
      const task = 'Updated task';
      const isComplete = true;
      const userId = 'user-123';
      const updatedTodo = mockTodoData.createTodo({ 
        id: todoId, 
        task, 
        is_complete: isComplete 
      });
      
      vi.mocked(todoRepository.updateTodo).mockResolvedValue(updatedTodo);

      // Act
      const result = await todoService.updateTodo(todoId, task, isComplete, userId);

      // Assert
      expect(result).toEqual(updatedTodo);
      expect(todoRepository.updateTodo).toHaveBeenCalledWith(
        todoId, 'Updated task', true, 'user-123'
      );
    });

    it('should validate task when updating', async () => {
      // Arrange & Act & Assert
      await expect(todoService.updateTodo(1, '', false, 'user-123'))
        .rejects.toThrow(ValidationException);
    });
  });

  describe('getTodos', () => {
    it('should return user todos in correct order', async () => {
      // Arrange
      const userId = 'user-123';
      const mockTodos = [
        mockTodoData.createTodo({ id: 1, created_at: new Date('2025-01-01') }),
        mockTodoData.createTodo({ id: 2, created_at: new Date('2025-01-02') }),
      ];
      
      vi.mocked(todoRepository.getTodos).mockResolvedValue(mockTodos);

      // Act
      const result = await todoService.getTodos(userId);

      // Assert
      expect(result).toEqual(mockTodos);
      expect(todoRepository.getTodos).toHaveBeenCalledWith('user-123');
    });

    it('should return empty array for user with no todos', async () => {
      // Arrange
      const userId = 'user-123';
      vi.mocked(todoRepository.getTodos).mockResolvedValue([]);

      // Act
      const result = await todoService.getTodos(userId);

      // Assert
      expect(result).toEqual([]);
    });
  });
});
```

### 2. 🔷 Integration Tests (API + Infrastructure)

**Purpose**: Test how components work together

**Focus Areas**:
- HTTP endpoint behavior
- Request/response validation
- Authentication flow
- Database operations
- Error handling across layers

#### API Integration Tests

```typescript
// todo.api.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '@/app';
import { setupTestDatabase, cleanupTestDatabase } from '../utils/database-helpers';
import { createAuthenticatedUser } from '../utils/auth-helpers';
import { mockTodoData } from '../utils/mock-data';

describe('Todo API Integration Tests', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    await setupTestDatabase();
    const authUser = await createAuthenticatedUser();
    authToken = authUser.token;
    userId = authUser.userId;
  });

  afterEach(async () => {
    await cleanupTestDatabase();
  });

  describe('POST /api/todo', () => {
    it('should create a new todo', async () => {
      // Arrange
      const todoData = { task: 'Learn integration testing' };

      // Act
      const response = await request(app)
        .post('/api/todo')
        .set('Authorization', `Bearer ${authToken}`)
        .send(todoData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        task: 'Learn integration testing',
        user_id: userId,
        is_complete: false,
      });
      expect(response.body.id).toBeDefined();
      expect(response.body.created_at).toBeDefined();
    });

    it('should return 400 for invalid task data', async () => {
      // Arrange
      const invalidData = { task: '' };

      // Act
      const response = await request(app)
        .post('/api/todo')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toMatchObject({
        message: expect.stringContaining('Task cannot be empty'),
        code: 'VALIDATION_ERROR',
      });
    });

    it('should return 401 for unauthenticated request', async () => {
      // Arrange
      const todoData = { task: 'Unauthorized todo' };

      // Act
      const response = await request(app)
        .post('/api/todo')
        .send(todoData);

      // Assert
      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should handle database errors gracefully', async () => {
      // Arrange - Simulate database error by using invalid data
      const todoData = { task: 'a'.repeat(1000) }; // Exceeds database limit

      // Act
      const response = await request(app)
        .post('/api/todo')
        .set('Authorization', `Bearer ${authToken}`)
        .send(todoData);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body.error.code).toBe('DATABASE_ERROR');
    });
  });

  describe('GET /api/todo', () => {
    it('should return user todos', async () => {
      // Arrange - Create test todos
      const todo1 = await createTestTodo(userId, 'First todo');
      const todo2 = await createTestTodo(userId, 'Second todo');

      // Act
      const response = await request(app)
        .get('/api/todo')
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: todo1.id, task: 'First todo' }),
          expect.objectContaining({ id: todo2.id, task: 'Second todo' }),
        ])
      );
    });

    it('should return empty array for user with no todos', async () => {
      // Act
      const response = await request(app)
        .get('/api/todo')
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should not return todos from other users', async () => {
      // Arrange - Create todo for different user
      const otherUser = await createAuthenticatedUser();
      await createTestTodo(otherUser.userId, 'Other user todo');

      // Act
      const response = await request(app)
        .get('/api/todo')
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('PUT /api/todo/:id', () => {
    it('should update todo', async () => {
      // Arrange
      const todo = await createTestTodo(userId, 'Original task');
      const updateData = { task: 'Updated task', is_complete: true };

      // Act
      const response = await request(app)
        .put(`/api/todo/${todo.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: todo.id,
        task: 'Updated task',
        is_complete: true,
        user_id: userId,
      });
    });

    it('should return 404 for non-existent todo', async () => {
      // Arrange
      const nonExistentId = 99999;
      const updateData = { task: 'Updated task', is_complete: true };

      // Act
      const response = await request(app)
        .put(`/api/todo/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      // Assert
      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('should prevent updating other user todos', async () => {
      // Arrange
      const otherUser = await createAuthenticatedUser();
      const otherUserTodo = await createTestTodo(otherUser.userId, 'Other user todo');
      const updateData = { task: 'Hacked task', is_complete: true };

      // Act
      const response = await request(app)
        .put(`/api/todo/${otherUserTodo.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      // Assert
      expect(response.status).toBe(404); // Should not find todo for this user
    });
  });

  describe('DELETE /api/todo/:id', () => {
    it('should delete todo', async () => {
      // Arrange
      const todo = await createTestTodo(userId, 'Todo to delete');

      // Act
      const response = await request(app)
        .delete(`/api/todo/${todo.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(204);

      // Verify todo is deleted
      const getResponse = await request(app)
        .get('/api/todo')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(getResponse.body).not.toContainEqual(
        expect.objectContaining({ id: todo.id })
      );
    });

    it('should return 404 for non-existent todo', async () => {
      // Arrange
      const nonExistentId = 99999;

      // Act
      const response = await request(app)
        .delete(`/api/todo/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`);

      // Assert
      expect(response.status).toBe(404);
    });
  });
});
```

#### Repository Integration Tests

```typescript
// todo.repository.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as todoRepository from '@/infrastructure/repositories/todo.repository';
import { setupTestDatabase, cleanupTestDatabase } from '../utils/database-helpers';
import { DatabaseException } from '@/common/exceptions/database.exception';

describe('TodoRepository', () => {
  beforeEach(async () => {
    await setupTestDatabase();
  });

  afterEach(async () => {
    await cleanupTestDatabase();
  });

  describe('createTodo', () => {
    it('should create todo in database', async () => {
      // Arrange
      const task = 'Repository test todo';
      const userId = 'test-user-123';

      // Act
      const result = await todoRepository.createTodo(task, userId);

      // Assert
      expect(result).toMatchObject({
        task: 'Repository test todo',
        user_id: 'test-user-123',
        is_complete: false,
      });
      expect(result.id).toBeDefined();
      expect(result.created_at).toBeInstanceOf(Date);
    });

    it('should handle database constraints', async () => {
      // Arrange
      const task = 'a'.repeat(1000); // Exceeds database column limit
      const userId = 'test-user-123';

      // Act & Assert
      await expect(todoRepository.createTodo(task, userId))
        .rejects.toThrow(DatabaseException);
    });
  });

  describe('getTodos', () => {
    it('should return todos for specific user', async () => {
      // Arrange
      const userId = 'test-user-123';
      const otherUserId = 'other-user-456';
      
      await todoRepository.createTodo('User 1 Todo 1', userId);
      await todoRepository.createTodo('User 1 Todo 2', userId);
      await todoRepository.createTodo('User 2 Todo', otherUserId);

      // Act
      const result = await todoRepository.getTodos(userId);

      // Assert
      expect(result).toHaveLength(2);
      expect(result.every(todo => todo.user_id === userId)).toBe(true);
    });

    it('should return empty array for user with no todos', async () => {
      // Arrange
      const userId = 'user-with-no-todos';

      // Act
      const result = await todoRepository.getTodos(userId);

      // Assert
      expect(result).toEqual([]);
    });
  });
});
```

### 3. 🔺 End-to-End Tests

**Purpose**: Test complete user workflows

```typescript
// todo-workflow.e2e.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '@/app';
import { createAuthenticatedUser } from '../utils/auth-helpers';

describe('Todo Workflow E2E Tests', () => {
  it('should complete full todo lifecycle', async () => {
    // Arrange
    const { token, userId } = await createAuthenticatedUser();

    // Act 1: Create todo
    const createResponse = await request(app)
      .post('/api/todo')
      .set('Authorization', `Bearer ${token}`)
      .send({ task: 'Complete E2E test' });

    expect(createResponse.status).toBe(201);
    const todoId = createResponse.body.id;

    // Act 2: Get todos
    const getResponse = await request(app)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveLength(1);

    // Act 3: Update todo
    const updateResponse = await request(app)
      .put(`/api/todo/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ task: 'Updated E2E test', is_complete: true });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.is_complete).toBe(true);

    // Act 4: Delete todo
    const deleteResponse = await request(app)
      .delete(`/api/todo/${todoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);

    // Act 5: Verify deletion
    const finalGetResponse = await request(app)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);

    expect(finalGetResponse.status).toBe(200);
    expect(finalGetResponse.body).toHaveLength(0);
  });
});
```

## 🔧 Test Configuration & Setup

### Vitest Configuration (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
        '**/*.d.ts',
        'src/server.ts',
        'coverage/',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Test Setup (`src/__tests__/setup.ts`)

```typescript
import { beforeAll, afterAll } from 'vitest';

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_KEY = 'test-key';
process.env.SUPABASE_DB_URL = 'postgresql://test:test@localhost:5432/test_db';

// Global test setup
beforeAll(async () => {
  // Setup test database
  // Initialize test services
  console.log('🧪 Test suite starting...');
});

afterAll(async () => {
  // Cleanup test resources
  console.log('✅ Test suite completed');
});

// Suppress console logs during tests (optional)
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
};
```

### Test Utilities (`src/__tests__/utils/`)

#### Mock Data Generator

```typescript
// mock-data.ts
import { Todo } from '@/domain/todo/entities/todo.entity';
import { Profile } from '@/domain/profile/entities/profile.entity';

export const mockTodoData = {
  createTodo: (overrides: Partial<Todo> = {}): Todo => ({
    id: 1,
    user_id: 'test-user-123',
    created_at: new Date('2025-01-01T00:00:00Z'),
    task: 'Test todo task',
    is_complete: false,
    ...overrides,
  }),

  createTodos: (count: number, userId: string = 'test-user-123'): Todo[] => {
    return Array.from({ length: count }, (_, index) => 
      mockTodoData.createTodo({
        id: index + 1,
        user_id: userId,
        task: `Test todo ${index + 1}`,
      })
    );
  },
};

export const mockProfileData = {
  createProfile: (overrides: Partial<Profile> = {}): Profile => ({
    id: 'test-user-123',
    email: 'test@example.com',
    full_name: 'Test User',
    avatar_url: null,
    created_at: new Date('2025-01-01T00:00:00Z'),
    updated_at: new Date('2025-01-01T00:00:00Z'),
    ...overrides,
  }),
};
```

#### Database Test Helpers

```typescript
// database-helpers.ts
import { sql } from '@/infrastructure/database/connection';

export async function setupTestDatabase(): Promise<void> {
  // Create test tables
  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      task TEXT NOT NULL,
      is_complete BOOLEAN DEFAULT FALSE
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      full_name TEXT,
      avatar_url TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function cleanupTestDatabase(): Promise<void> {
  // Clean up test data
  await sql`TRUNCATE TABLE todos RESTART IDENTITY CASCADE`;
  await sql`TRUNCATE TABLE profiles RESTART IDENTITY CASCADE`;
}

export async function createTestTodo(userId: string, task: string): Promise<Todo> {
  const result = await sql`
    INSERT INTO todos (user_id, task, is_complete)
    VALUES (${userId}, ${task}, false)
    RETURNING *
  `;
  return result[0];
}
```

#### Authentication Test Helpers

```typescript
// auth-helpers.ts
export async function createAuthenticatedUser(): Promise<{
  token: string;
  userId: string;
  user: any;
}> {
  const userId = `test-user-${Date.now()}`;
  const token = 'mock-jwt-token';
  
  // Create test user profile
  const user = await sql`
    INSERT INTO profiles (id, email, full_name)
    VALUES (${userId}, 'test@example.com', 'Test User')
    RETURNING *
  `;

  return {
    token,
    userId,
    user: user[0],
  };
}

export function mockAuthMiddleware(userId: string) {
  return (req: any, res: any, next: any) => {
    req.userClaims = { sub: userId };
    next();
  };
}
```

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test todo.service.test.ts

# Run tests matching pattern
npm test -- todo

# Run tests with UI
npm run test:ui
```

### Advanced Commands

```bash
# Run only unit tests
npm test -- src/__tests__/unit

# Run only integration tests
npm test -- src/__tests__/integration

# Run tests with verbose output
npm test -- --reporter=verbose

# Run tests and update snapshots
npm test -- --update-snapshots

# Run tests with specific timeout
npm test -- --testTimeout=30000
```

### Docker Test Commands

```bash
# Run tests in Docker
npm run docker:test

# Run tests with coverage in Docker
docker run --rm -v $(pwd):/app expo-server:dev npm run test:coverage

# Run specific test suite in Docker
docker run --rm -v $(pwd):/app expo-server:dev npm test todo.service.test.ts
```

## 📊 Test Coverage Targets

### Coverage Goals by Layer

| Layer               | Line Coverage | Branch Coverage | Function Coverage |
| ------------------- | ------------- | --------------- | ----------------- |
| **Domain Services** | 95%           | 90%             | 100%              |
| **API Controllers** | 85%           | 80%             | 90%               |
| **Repositories**    | 80%           | 75%             | 85%               |
| **Middleware**      | 85%           | 80%             | 90%               |
| **Overall**         | 80%           | 75%             | 85%               |

### Coverage Exclusions

```typescript
// vitest.config.ts coverage exclude
exclude: [
  'node_modules/',
  'src/__tests__/',
  '**/*.d.ts',
  'src/server.ts',           // Application entry point
  'src/openapi.ts',          // Documentation
  'coverage/',
  'dist/',
  'docs/',
  '**/*.config.ts',          // Configuration files
  'src/common/types/',       # Type definitions
]
```

## ✅ Testing Best Practices

### 1. Test Structure (AAA Pattern)

```typescript
it('should create todo with valid data', async () => {
  // 🏗️ Arrange - Set up test conditions
  const task = 'Learn testing';
  const userId = 'user-123';
  const expectedTodo = mockTodoData.createTodo({ task, user_id: userId });
  mockTodoRepository.createTodo.mockResolvedValue(expectedTodo);

  // ⚡ Act - Execute the system under test
  const result = await todoService.createTodo(task, userId);

  // 🎯 Assert - Verify the outcome
  expect(result).toEqual(expectedTodo);
  expect(mockTodoRepository.createTodo).toHaveBeenCalledWith(task, userId);
});
```

### 2. Descriptive Test Names

```typescript
// ✅ Good - Describes behavior and context
describe('TodoService.createTodo', () => {
  it('should create todo with trimmed task text');
  it('should throw ValidationException when task is empty');
  it('should throw ValidationException when task exceeds max length');
  it('should preserve user context when creating todo');
});

// ❌ Avoid - Generic or implementation-focused
describe('TodoService', () => {
  it('should work');
  it('test createTodo function');
  it('should call repository.createTodo');
});
```

### 3. Test Organization

```typescript
describe('TodoService', () => {
  // Group by method/functionality
  describe('createTodo', () => {
    describe('with valid input', () => {
      it('should create todo successfully');
      it('should trim whitespace from task');
      it('should set default completion status');
    });

    describe('with invalid input', () => {
      it('should reject empty task');
      it('should reject task exceeding max length');
      it('should reject null or undefined task');
    });

    describe('error handling', () => {
      it('should handle repository failures gracefully');
      it('should propagate validation errors');
    });
  });

  describe('updateTodo', () => {
    // Similar structure...
  });
});
```

### 4. Mock Management

```typescript
describe('TodoService', () => {
  let mockTodoRepository: jest.Mocked<ITodoRepository>;
  let todoService: TodoService;

  beforeEach(() => {
    // Create fresh mocks for each test
    mockTodoRepository = {
      getTodos: vi.fn(),
      createTodo: vi.fn(),
      updateTodo: vi.fn(),
      deleteTodo: vi.fn(),
    };
    
    todoService = new TodoService(mockTodoRepository);
    
    // Clear all mocks to ensure clean state
    vi.clearAllMocks();
  });

  // Use specific, behavior-focused mocks
  it('should handle repository timeout', async () => {
    mockTodoRepository.createTodo.mockRejectedValue(
      new Error('Database timeout')
    );

    await expect(todoService.createTodo('test', 'user'))
      .rejects.toThrow('Database timeout');
  });
});
```

### 5. Test Data Management

```typescript
// Use factory functions for consistent test data
const createTestTodo = (overrides = {}) => ({
  id: 1,
  user_id: 'test-user',
  task: 'Test task',
  is_complete: false,
  created_at: new Date('2025-01-01'),
  ...overrides,
});

// Use realistic data that reflects actual usage
const validTask = 'Learn Domain-Driven Design and Clean Architecture';
const invalidTask = ''; // Empty string
const longTask = 'a'.repeat(501); // Exceeds limit

// Group related test data
const testScenarios = [
  { task: 'Short task', shouldPass: true },
  { task: 'a'.repeat(500), shouldPass: true }, // Max length
  { task: 'a'.repeat(501), shouldPass: false }, // Too long
  { task: '', shouldPass: false }, // Empty
  { task: '   ', shouldPass: false }, // Whitespace only
];
```

## 🚨 Common Testing Pitfalls to Avoid

### 1. Testing Implementation Instead of Behavior

```typescript
// ❌ Don't test implementation details
it('should call validateTask method', () => {
  expect(todoService.validateTask).toHaveBeenCalled();
});

// ✅ Test behavior and outcomes
it('should reject empty task with validation error', async () => {
  await expect(todoService.createTodo('', 'user'))
    .rejects.toThrow(ValidationException);
});
```

### 2. Overly Complex Mocks

```typescript
// ❌ Complex, brittle mock
vi.mock('@/infrastructure/repositories/todo.repository', () => ({
  TodoRepository: vi.fn().mockImplementation(() => ({
    createTodo: vi.fn().mockImplementation((task, userId) => {
      if (task === 'special') {
        return Promise.resolve(specialTodo);
      }
      return Promise.resolve(defaultTodo);
    }),
  })),
}));

// ✅ Simple, focused mock
beforeEach(() => {
  mockTodoRepository.createTodo.mockResolvedValue(expectedTodo);
});
```

### 3. Not Testing Edge Cases

```typescript
// ✅ Comprehensive edge case testing
describe('task validation', () => {
  it('should handle normal task', () => { /* test */ });
  it('should handle task with special characters', () => { /* test */ });
  it('should handle task with unicode characters', () => { /* test */ });
  it('should handle task with only whitespace', () => { /* test */ });
  it('should handle null task', () => { /* test */ });
  it('should handle undefined task', () => { /* test */ });
  it('should handle extremely long task', () => { /* test */ });
  it('should handle task at exact character limit', () => { /* test */ });
});
```

### 4. Shared State Between Tests

```typescript
// ❌ Tests that depend on execution order
let globalCounter = 0;

it('should increment counter', () => {
  globalCounter++;
  expect(globalCounter).toBe(1);
});

it('should increment counter again', () => {
  globalCounter++;
  expect(globalCounter).toBe(2); // Brittle!
});

// ✅ Isolated tests
describe('Counter', () => {
  let counter: Counter;

  beforeEach(() => {
    counter = new Counter(); // Fresh instance each test
  });

  it('should start at zero', () => {
    expect(counter.value).toBe(0);
  });

  it('should increment by one', () => {
    counter.increment();
    expect(counter.value).toBe(1);
  });
});
```

## 🎯 Testing Checklist

### Before Writing Tests
- [ ] Understand the business requirements
- [ ] Identify the component's responsibilities
- [ ] List all possible inputs and outputs
- [ ] Consider edge cases and error scenarios

### Writing Tests
- [ ] Use descriptive test names
- [ ] Follow AAA pattern (Arrange, Act, Assert)
- [ ] Test behavior, not implementation
- [ ] Include both positive and negative test cases
- [ ] Mock external dependencies appropriately

### Test Quality
- [ ] Tests are deterministic (same result every time)
- [ ] Tests are isolated (no shared state)
- [ ] Tests are fast (unit tests < 1s)
- [ ] Tests are readable and well-documented
- [ ] Tests cover edge cases and error scenarios

### Coverage Goals
- [ ] Domain services: 95%+ coverage
- [ ] API controllers: 85%+ coverage
- [ ] Repositories: 80%+ coverage
- [ ] Critical business logic: 100% coverage

## 🎉 Getting Started with Testing

### 1. Set Up Your Testing Environment

```bash
# Install dependencies (already configured)
npm install

# Verify test setup
npm test

# Check coverage
npm run test:coverage
```

### 2. Write Your First Test

Start with a simple unit test:

```typescript
// src/__tests__/unit/todo/todo.service.test.ts
import { describe, it, expect } from 'vitest';
import { TodoService } from '@/domain/todo/services/todo.service';

describe('TodoService', () => {
  it('should exist', () => {
    expect(TodoService).toBeDefined();
  });
});
```

### 3. Add Test to CI/CD

Tests should run automatically in your CI/CD pipeline:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## 📚 Additional Resources

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [Supertest Documentation](https://github.com/ladjs/supertest)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### Best Practices
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Unit Testing Guidelines](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Tools
- [Vitest UI](https://vitest.dev/guide/ui.html) - Interactive test interface
- [Coverage Reports](https://vitest.dev/guide/coverage.html) - Code coverage analysis
- [VS Code Extensions](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) - Vitest integration

---

**Last Updated**: August 2025  
**Testing Strategy Version**: 2.0  
**Maintained by**: Development Team

Remember: **Great tests are not just about coverage - they're about confidence in your code and enabling fearless refactoring!** 🚀
