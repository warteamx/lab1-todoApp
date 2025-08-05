import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * Wrapper for async route handlers to catch errors and pass them to error middleware
 */
export const asyncHandler = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Wrapper for async functions to handle errors consistently
 */
export const asyncWrapper = async <T>(
  fn: () => Promise<T>,
  errorMessage?: string
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    // Re-throw with additional context if needed
    if (errorMessage && error instanceof Error) {
      error.message = `${errorMessage}: ${error.message}`;
    }
    throw error;
  }
};
