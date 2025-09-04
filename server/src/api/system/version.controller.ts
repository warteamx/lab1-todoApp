import { Request, Response } from 'express';

/**
 * Version information for the server
 * Updated during build process
 */
export const VERSION_INFO = {
  name: 'server',
  description: 'Express API Server',
  version: '1.1.1',
  buildNumber: '1',
  buildDate: '2025-09-04T11:10:57.282Z',
  commitHash: '8c03a63',
  environment: 'development',
  timestamp: Date.now(),
  uptime: process.uptime(),
  nodeVersion: process.version,
  platform: process.platform,
  arch: process.arch
} as const;

/**
 * GET /api/version
 * Returns version and build information
 */
export const getVersion = (req: Request, res: Response) => {
  res.json({
    ...VERSION_INFO,
    uptime: process.uptime(),
    timestamp: Date.now()
  });
};

/**
 * GET /api/health
 * Health check endpoint with version info
 */
export const getHealth = (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    version: VERSION_INFO.version,
    buildNumber: VERSION_INFO.buildNumber,
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: VERSION_INFO.environment
  });
};
