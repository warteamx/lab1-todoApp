import { Request, Response, NextFunction } from 'express';
import { getHealthStatus } from '../../domain/health/services/health.service';
import { asyncHandler } from '../../common/utils/asyncHandler';
import logger from '../../common/utils/logger';

/**
 * Health check controller
 * Returns the current health status of the API server
 */
export const getHealth = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info('Health check requested');
    const healthStatus = getHealthStatus();
    logger.info('Health check successful', { healthStatus });
    res.status(200).json(healthStatus);
  } catch (error) {
    logger.error('Health check failed', { error });
    res.status(500).json({ 
      status: 'unhealthy', 
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});
