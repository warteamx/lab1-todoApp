import { logger } from './src/common/utils/logger';

logger.warn('Production test warning', {
  username: 'john',
  password: 'secret123',
  token: 'jwt_here',
  email: 'john@test.com'
});

console.log('Production test completed');
