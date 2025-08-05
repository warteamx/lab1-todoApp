# Uniform Error Handling Implementation

## Overview
This document outlines the improved uniform error handling approach implemented across the server codebase. The new system provides consistent error responses, better logging, and cleaner code structure.

## Key Components

### 1. Exception Hierarchy
- **BaseException**: Abstract base class for all custom exceptions
- **Domain-specific exceptions**: Specific exception types for different scenarios
  - `ValidationException` (400)
  - `UnauthorizedException` (401)
  - `ForbiddenException` (403)
  - `NotFoundException` (404)
  - `ConflictException` (409)
  - `InternalServerException` (500)
  - `DatabaseException` (500)
  - `StorageException` (500)

### 2. Enhanced Error Middleware
- Handles all custom exceptions uniformly
- Provides structured error responses with:
  - Error message
  - Error code
  - Timestamp
  - Request path and method
- Distinguishes between operational and system errors
- Enhanced logging with different levels based on error type

### 3. Async Handler Wrapper
- `asyncHandler`: Wraps async route handlers to automatically catch errors
- `asyncWrapper`: Utility for wrapping async functions with error context
- Eliminates need for try-catch blocks in controllers

### 4. Repository Layer Error Handling
- All database operations wrapped with appropriate error handling
- Generic database errors converted to specific exceptions
- Not found scenarios properly handled with `NotFoundException`

## Benefits

### 1. Consistency
- All errors follow the same response format
- Uniform status codes across the application
- Consistent logging patterns

### 2. Maintainability
- Centralized error handling logic
- Easy to add new exception types
- Clear separation of concerns

### 3. Developer Experience
- Cleaner controller code without repetitive try-catch blocks
- Type-safe exception handling
- Better error messages and debugging information

### 4. API Consumer Experience
- Predictable error response format
- Meaningful error codes
- Consistent HTTP status codes

## Error Response Format

```json
{
  "error": {
    "message": "Profile not found",
    "code": "NOT_FOUND",
    "timestamp": "2025-08-05T10:30:00.000Z",
    "path": "/api/profile/123",
    "method": "GET"
  }
}
```

## Usage Examples

### Controllers
```typescript
export const getProfile = asyncHandler(async (req, res) => {
  if (!req.userClaims?.sub) {
    throw new UnauthorizedException();
  }
  
  const profile = await profileService.getProfile(req.userClaims.sub);
  res.json(profile);
});
```

### Repositories
```typescript
export async function getProfile(userId: string): Promise<Profile> {
  try {
    const res = await sql`SELECT * FROM profiles WHERE id = ${userId}`;
    
    if (res.length === 0) {
      throw new NotFoundException('Profile not found');
    }
    
    return res[0];
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new DatabaseException(`Failed to get profile: ${error}`);
  }
}
```

### Middleware
```typescript
export const authMiddleware = asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase.auth.getClaims(
    req.headers.authorization || ''
  );
  
  if (error || !data?.claims) {
    throw new UnauthorizedException();
  }
  
  req.userClaims = data.claims;
  next();
});
```

## Migration Notes

### Breaking Changes
- Controllers now export const functions instead of function declarations
- Error responses have a new structure
- Some error messages may have changed

### Backward Compatibility
- Legacy `HttpException` is still supported but deprecated
- Existing error middleware handles both old and new exception types

## Future Enhancements

1. **Input Validation**: Implement comprehensive DTO validation using the ValidationException
2. **Rate Limiting**: Add rate limiting exceptions
3. **Business Logic Exceptions**: Add domain-specific business rule exceptions
4. **Error Tracking**: Integration with error tracking services
5. **API Documentation**: Update OpenAPI specs with new error response format

## Implementation Checklist

- [x] Create exception hierarchy
- [x] Enhance error middleware
- [x] Implement async handler wrapper
- [x] Refactor repositories
- [x] Refactor controllers
- [x] Refactor middleware
- [ ] Update tests
- [ ] Update API documentation
- [ ] Add input validation
- [ ] Performance testing
