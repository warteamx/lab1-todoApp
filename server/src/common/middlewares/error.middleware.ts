import { Request, Response, NextFunction } from 'express';
import { BaseException } from '../exceptions/baseException';
import { HttpException } from '../exceptions/httpException';
import { logger } from '../utils/logger';

interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    timestamp: string;
    path: string;
    method: string;
  };
}

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const timestamp = new Date().toISOString();
  const path = req.originalUrl;
  const method = req.method;

  // Handle our custom exceptions
  if (err instanceof BaseException) {
    const errorResponse: ErrorResponse = {
      error: {
        message: err.message,
        code: err.errorCode,
        timestamp,
        path,
        method,
      },
    };

    // Log operational errors as warnings, non-operational as errors
    if (err.isOperational) {
      logger.warn('Operational Error', {
        error: err.message,
        code: err.errorCode,
        statusCode: err.statusCode,
        path,
        method,
        stack: err.stack,
      });
    } else {
      logger.error('System Error', {
        error: err.message,
        code: err.errorCode,
        statusCode: err.statusCode,
        path,
        method,
        stack: err.stack,
      });
    }

    return res.status(err.statusCode).json(errorResponse);
  }

  // Handle legacy HttpException
  if (err instanceof HttpException) {
    const errorResponse: ErrorResponse = {
      error: {
        message: err.message,
        timestamp,
        path,
        method,
      },
    };

    logger.warn('HTTP Error', {
      error: err.message,
      statusCode: err.status,
      path,
      method,
      stack: err.stack,
    });

    return res.status(err.status).json(errorResponse);
  }

  // Handle unexpected errors
  logger.error('Unexpected Error', {
    error: err.message,
    stack: err.stack,
    path,
    method,
  });

  const errorResponse: ErrorResponse = {
    error: {
      message: process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message || 'Internal Server Error',
      code: 'INTERNAL_SERVER_ERROR',
      timestamp,
      path,
      method,
    },
  };

  res.status(500).json(errorResponse);
}
