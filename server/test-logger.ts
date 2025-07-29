import { logger } from './src/common/utils/logger';

// Test different log levels
console.log('Testing logger functionality...\n');

logger.info('Server starting up', {
  port: 3000,
  environment: process.env.NODE_ENV || 'development'
});

logger.debug('Debug information', {
  userId: 123,
  action: 'test',
  sensitive: 'should be visible in dev'
});

logger.warn('Warning message', {
  reason: 'This is a test warning'
});

logger.error('Error message', {
  error: 'Test error',
  stack: 'Mock stack trace'
});

// Test sensitive data masking
logger.info('Login attempt', {
  username: 'john_doe',
  password: 'secret123',
  token: 'jwt_token_here',
  email: 'john@example.com'
});

console.log('\nLogger test completed. Check logs/ directory for output files.');
