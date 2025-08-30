// import { V } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';
import app from './app';
import { config } from './infrastructure/config';
import logger from './common/utils/logger';

const PORT = config.port || 3000;

// Add startup logging
logger.info('🚀 Starting server...', {
  port: PORT,
  nodeEnv: process.env.NODE_ENV,
  supabaseUrl: process.env.SUPABASE_URL ? 'configured' : 'not configured',
  supabaseKey: process.env.SUPABASE_KEY ? 'configured' : 'not configured',
  supabaseDbUrl: process.env.SUPABASE_DB_URL ? 'configured' : 'not configured',
});

try {
  const server = app.listen(PORT, () => {
    logger.info(`🧐 Server running on port ${PORT}`);
    logger.info(`🧐 http://localhost:${PORT}/api-docs/`);
    logger.info(`🏥 Health check: http://localhost:${PORT}/api/health`);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
      logger.info('Process terminated');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    server.close(() => {
      logger.info('Process terminated');
      process.exit(0);
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', { reason, promise });
    process.exit(1);
  });

} catch (error) {
  logger.error('Failed to start server:', { error });
  process.exit(1);
}
