import express, { Request, Response, NextFunction } from 'express';

/**
 * Creates a test Express app with minimal configuration for testing controllers
 * @param routes - Function that sets up routes on the app
 * @param mockUserId - Optional user ID to mock in auth middleware (defaults to 'test-user-123')
 */
export function createTestApp(
  routes: (app: express.Application) => void,
  mockUserId: string = 'test-user-123'
): express.Application {
  const app = express();
  app.use(express.json());

  // Mock auth middleware - adds userClaims to request
  app.use((req: any, res: Response, next: NextFunction) => {
    req.userClaims = { sub: mockUserId };
    next();
  });

  // Apply routes
  routes(app);

  return app;
}

/**
 * Common test data factory for Todo entities
 */
export const createMockTodo = (overrides = {}) => ({
  id: 1,
  user_id: 'test-user-123',
  task: 'Test todo',
  is_complete: false,
  created_at: new Date('2025-08-04T09:16:56.790Z'),
  ...overrides,
});

/**
 * Common test data factory for arrays of Todo entities
 */
export const createMockTodos = (count: number = 2) => {
  return Array.from({ length: count }, (_, index) =>
    createMockTodo({
      id: index + 1,
      task: `Test todo ${index + 1}`,
      is_complete: index % 2 === 1, // Alternate completion status
    })
  );
};

/**
 * Fixed date string for consistent testing
 */
export const FIXED_DATE = '2025-08-04T09:16:56.790Z';
