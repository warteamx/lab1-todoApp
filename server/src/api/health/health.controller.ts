import { Request, Response, NextFunction } from 'express';
import { getHealthStatus } from '../../domain/health/services/health.service';
import { asyncHandler } from '../../common/utils/asyncHandler';

/**
 * Health check controller
 * Returns the current health status of the API server
 */
export const getHealth = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const healthStatus = getHealthStatus();
  res.status(200).json(healthStatus);
});
