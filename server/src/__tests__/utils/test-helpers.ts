import express, { Request, Response, NextFunction } from 'express';
import { Profile } from '../../domain/profile/entities/profile.entity';
import { UpdateProfileDto } from '../../domain/profile/dto/updateProfile.dto';
import { errorMiddleware } from '../../common/middlewares/error.middleware';

/**
 * Creates a minimal mock UserClaims object for testing
 */
export function createMockUserClaims(userId: string = 'test-user-123') {
  return {
    iss: 'https://test.supabase.co/auth/v1',
    sub: userId,
    aud: 'authenticated',
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    iat: Math.floor(Date.now() / 1000),
    email: 'test@example.com',
    phone: '',
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: {
      email: 'test@example.com',
      email_verified: true,
      phone_verified: false,
      sub: userId,
    },
    role: 'authenticated',
    aal: 'aal1',
    amr: [{ method: 'password', timestamp: Math.floor(Date.now() / 1000) }],
    session_id: 'test-session-123',
    is_anonymous: false,
  };
}

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
  app.use((req: Request & { userClaims?: any }, res: Response, next: NextFunction) => {
    req.userClaims = createMockUserClaims(mockUserId);
    next();
  });

  // Apply routes
  routes(app);

  // Add error middleware at the end
  app.use(errorMiddleware);

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
 * Common test data factory for Profile entities
 */
export const createMockProfile = (overrides: Partial<Profile> = {}): Profile => ({
  id: 'test-user-123',
  username: 'testuser',
  full_name: 'Test User',
  avatar_url: 'https://example.com/avatar.png',
  website: 'https://testuser.com',
  ...overrides,
});

/**
 * Common test data factory for UpdateProfileDto
 */
export const createMockUpdateProfileDto = (overrides: Partial<UpdateProfileDto> = {}): UpdateProfileDto => ({
  username: 'updateduser',
  full_name: 'Updated User',
  website: 'https://updated.com',
  ...overrides,
});

/**
 * Common test data factory for mock files
 */
export const createMockFile = (overrides: Partial<Express.Multer.File> = {}): Express.Multer.File => ({
  fieldname: 'avatar',
  originalname: 'profile.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  size: 1024,
  buffer: Buffer.from('fake image data'),
  destination: '',
  filename: '',
  path: '',
  stream: {} as any,
  ...overrides,
});

/**
 * Fixed date string for consistent testing
 */
export const FIXED_DATE = '2025-08-04T09:16:56.790Z';
