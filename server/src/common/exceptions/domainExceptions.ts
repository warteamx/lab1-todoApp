import { BaseException } from './baseException';

export class ValidationException extends BaseException {
  readonly statusCode = 400;
  readonly errorCode = 'VALIDATION_ERROR';
  readonly isOperational = true;

  constructor(message: string = 'Validation failed') {
    super(message);
  }
}

export class UnauthorizedException extends BaseException {
  readonly statusCode = 401;
  readonly errorCode = 'UNAUTHORIZED';
  readonly isOperational = true;

  constructor(message: string = 'Unauthorized') {
    super(message);
  }
}

export class ForbiddenException extends BaseException {
  readonly statusCode = 403;
  readonly errorCode = 'FORBIDDEN';
  readonly isOperational = true;

  constructor(message: string = 'Forbidden') {
    super(message);
  }
}

export class NotFoundException extends BaseException {
  readonly statusCode = 404;
  readonly errorCode = 'NOT_FOUND';
  readonly isOperational = true;

  constructor(message: string = 'Resource not found') {
    super(message);
  }
}

export class ConflictException extends BaseException {
  readonly statusCode = 409;
  readonly errorCode = 'CONFLICT';
  readonly isOperational = true;

  constructor(message: string = 'Conflict') {
    super(message);
  }
}

export class InternalServerException extends BaseException {
  readonly statusCode = 500;
  readonly errorCode = 'INTERNAL_SERVER_ERROR';
  readonly isOperational = false;

  constructor(message: string = 'Internal server error') {
    super(message);
  }
}

export class DatabaseException extends BaseException {
  readonly statusCode = 500;
  readonly errorCode = 'DATABASE_ERROR';
  readonly isOperational = false;

  constructor(message: string = 'Database operation failed') {
    super(message);
  }
}

export class StorageException extends BaseException {
  readonly statusCode = 500;
  readonly errorCode = 'STORAGE_ERROR';
  readonly isOperational = false;

  constructor(message: string = 'Storage operation failed') {
    super(message);
  }
}
