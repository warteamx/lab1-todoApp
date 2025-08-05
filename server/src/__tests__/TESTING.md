# Server Testing Guide

This document outlines the recommended testing approach for the Express.js backend server.

## 🎯 Testing Philosophy

We follow a **simple and pragmatic approach** to testing that emphasizes:

- **Unit tests** for business logic (services)
- **Integration tests** for API controllers
- **Minimal mocking** - only mock external dependencies
- **Clear test structure** using AAA pattern (Arrange, Act, Assert)

## 📁 Test Structure

```
src/
├── __tests__/
│   ├── setup.ts           # Global test configuration
│   ├── todo/
│   │   ├── todo.service.test.ts   # Unit tests for business logic
│   │   └── todo.test.ts           # Integration tests for API endpoints
│   └── profile/
│       ├── profile.service.test.ts
│       └── profile.test.ts
└── vitest.config.ts       # Test runner configuration
```

## 🛠️ Testing Stack

- **Test Runner**: [Vitest](https://vitest.dev/) - Fast, TypeScript-native test runner
- **HTTP Testing**: [Supertest](https://github.com/ladjs/supertest) - HTTP assertion library
- **Mocking**: Vitest's built-in mocking (`vi.mock()`)

## 📝 Test Types

### 1. Unit Tests (Service Layer)

**Purpose**: Test business logic in isolation

**What to test**:
- Service methods with different inputs
- Edge cases and error scenarios
- Data transformation logic

**Example**: `todo.service.test.ts`
```typescript
describe('TodoService', () => {
  describe('createTodo', () => {
    it('should create a new todo', async () => {
      // Arrange
      const task = 'New todo task';
      vi.mocked(todoRepository.createTodo).mockResolvedValue(mockTodo);

      // Act
      const result = await todoService.createTodo(task, mockUserId);

      // Assert
      expect(result).toEqual(mockTodo);
      expect(todoRepository.createTodo).toHaveBeenCalledWith(task, mockUserId);
    });
  });
});
```

### 2. Integration Tests (Controller Layer)

**Purpose**: Test API endpoints with HTTP requests

**What to test**:
- HTTP status codes
- Request/response body structure
- Authentication flow (mocked)
- Error handling

**Example**: `todo.test.ts`
```typescript
describe('Todo API Integration Tests', () => {
  describe('POST /api/todo', () => {
    it('should create a new todo', async () => {
      // Arrange
      vi.mocked(todoService.createTodo).mockResolvedValue(newTodo);

      // Act
      const response = await request(app)
        .post('/api/todo')
        .send({ task: 'New test todo' });

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newTodo);
    });
  });
});
```

## 🎭 Mocking Strategy

### What to Mock

1. **External Services**: Database repositories, external APIs
2. **Authentication**: User claims and middleware
3. **File System**: File uploads, storage operations

### What NOT to Mock

1. **Express framework**: Request/response objects
2. **Internal business logic**: Keep service logic pure
3. **Simple utilities**: Date formatting, validation functions

### Mock Examples

```typescript
// Mock repository layer
vi.mock('../../infrastructure/repositories/todo.repository', () => ({
  getTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

// Mock authentication middleware
app.use((req: any, res: Response, next: NextFunction) => {
  req.userClaims = { sub: 'test-user-123' };
  next();
});
```

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test todo.service.test.ts
```

## 📊 Test Coverage Guidelines

**Aim for these coverage targets**:

- **Services (Unit Tests)**: 90%+ coverage
- **Controllers (Integration Tests)**: 80%+ coverage
- **Critical Business Logic**: 100% coverage

**Coverage is less important for**:
- Configuration files
- Type definitions
- Simple middleware

## ✅ Test Writing Best Practices

### 1. Use AAA Pattern

```typescript
it('should create a todo', async () => {
  // Arrange - Set up test data and mocks
  const mockTodo = { id: 1, task: 'Test', is_complete: false };
  vi.mocked(todoService.createTodo).mockResolvedValue(mockTodo);

  // Act - Execute the code under test
  const response = await request(app).post('/api/todo').send({ task: 'Test' });

  // Assert - Verify the results
  expect(response.status).toBe(201);
  expect(response.body).toEqual(mockTodo);
});
```

### 2. Use Descriptive Test Names

```typescript
// ✅ Good
it('should return 404 when todo does not exist')
it('should create todo with default completion status false')

// ❌ Avoid
it('should work')
it('test todo creation')
```

### 3. Group Related Tests

```typescript
describe('TodoService', () => {
  describe('createTodo', () => {
    it('should create with valid data')
    it('should handle missing required fields')
    it('should sanitize input data')
  });
  
  describe('updateTodo', () => {
    it('should update existing todo')
    it('should return 404 for non-existent todo')
  });
});
```

### 4. Clean Up Between Tests

```typescript
beforeEach(() => {
  vi.clearAllMocks(); // Reset all mocks before each test
});
```

### 5. Test Error Scenarios

```typescript
it('should handle database connection errors', async () => {
  // Arrange
  vi.mocked(todoRepository.getTodos).mockRejectedValue(new Error('DB Error'));

  // Act & Assert
  await expect(todoService.getTodos('user-123')).rejects.toThrow('DB Error');
});
```

## 🔧 Configuration

### Vitest Config (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,           // Enable global test functions
    environment: 'node',     // Node.js environment
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Path aliases
    },
  },
});
```

### Test Setup (`src/__tests__/setup.ts`)

```typescript
// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.SUPABASE_URL = 'https://test.supabase.co';

// Suppress console logs during tests
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
};
```

## 🚨 Common Testing Pitfalls

### 1. Testing Implementation Details
```typescript
// ❌ Don't test internal implementation
expect(todoService.validateInput).toHaveBeenCalled();

// ✅ Test behavior and outcomes
expect(response.status).toBe(400);
expect(response.body.error).toBe('Invalid input');
```

### 2. Overly Complex Mocks
```typescript
// ❌ Complex, brittle mock
vi.mock('entire-module', () => ({
  complexFunction: vi.fn().mockImplementation(/* complex logic */)
}));

// ✅ Simple, focused mock
vi.mock('module', () => ({
  simpleFunction: vi.fn().mockResolvedValue(expectedResult)
}));
```

### 3. Not Testing Edge Cases
```typescript
// ✅ Test happy path AND edge cases
describe('createTodo', () => {
  it('should create todo with valid data');           // Happy path
  it('should handle empty task string');              // Edge case
  it('should handle very long task strings');         // Edge case
  it('should handle special characters in task');     // Edge case
});
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Supertest GitHub](https://github.com/ladjs/supertest)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🎉 Getting Started

1. **Add test script to package.json** (already configured)
2. **Install dependencies** (already installed)
3. **Write your first test** using the examples above
4. **Run tests** with `npm test`
5. **Add tests to CI/CD** pipeline

Remember: **Good tests are simple, focused, and test behavior, not implementation!**
