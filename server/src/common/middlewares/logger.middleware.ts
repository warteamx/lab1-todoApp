import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { morganStream, logger } from '../utils/logger';

// Create Morgan middleware with custom format
const morganMiddleware = morgan(
  process.env.NODE_ENV === 'development'
    ? ':method :url :status :res[content-length] - :response-time ms :date[clf]'
    : 'combined',
  {
    stream: morganStream,
    skip: (req: Request, _res: Response) => {
      // Skip logging for health check endpoints in production
      return process.env.NODE_ENV === 'production' && req.url === '/health';
    },
  }
);

// Enhanced logging middleware with request/response details
export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();

  // Log request details in development
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Incoming Request', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      body: req.body,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  } else {
    // Log basic request info in production
    logger.info('Request', {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  }

  // Capture the original res.json method
  const originalJson = res.json;

  // Override res.json to log response data
  res.json = function (body: unknown) {
    const responseTime = Date.now() - startTime;

    if (process.env.NODE_ENV === 'development') {
      logger.debug('Response', {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`,
        responseBody: body,
      });
    }

    // Call the original res.json method
    return originalJson.call(this, body);
  };

  // Apply Morgan middleware
  morganMiddleware(req, res, next);
}

// Error logging middleware
export function errorLoggerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Request Error', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    query: req.query,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  next(error);
}
