# 📝 Logger Documentation

## 🎯 Overview

This project uses a centralized logging system built with **Winston** and **Morgan** to provide comprehensive logging capabilities for both development and production environments.

## 🏗️ Architecture

### Components

1. **Logger Utility** (`common/utils/logger.ts`)
   - Centralized Winston logger configuration
   - Custom log levels and formatting
   - Environment-specific behavior
   - Sensitive data masking

2. **Logger Middleware** (`common/middlewares/logger.middleware.ts`)
   - Morgan integration for HTTP request logging
   - Request/response logging with timing
   - Error logging middleware

## 📊 Log Levels

The logger supports the following levels (in order of priority):

- `error` (0) - Error conditions
- `warn` (1) - Warning conditions
- `info` (2) - Informational messages
- `http` (3) - HTTP request logs
- `debug` (4) - Debug information (development only)

## 🎨 Log Formats

### Development Environment

- **Console**: Colorized output with timestamps
- **File**: JSON format with full request/response details
- **Sensitive Data**: Visible for debugging

### Production Environment

- **Console**: Minimal output
- **File**: JSON format with masked sensitive data
- **Sensitive Data**: Automatically masked

## 📁 Log Files

Logs are written to the following files:

```
logs/
├── combined.log    # All log levels
└── error.log       # Error level only
```

## 🔒 Security Features

### Sensitive Data Masking

The logger automatically masks sensitive fields in production:

- `password`
- `token`
- `authorization`
- `auth`
- `secret`
- `key`
- `credential`
- `bearer`
- `jwt`
- `session`

### Example:

```javascript
// Input
{ username: "john", password: "secret123", token: "abc123" }

// Output (production)
{ username: "john", password: "***MASKED***", token: "***MASKED***" }
```

## 🛠️ Usage

### Log Viewing Scripts

For development, you can use the following npm scripts to view logs in real-time:

```bash
# View all logs with pretty formatting
npm run logs:view

# View only error logs with pretty formatting
npm run logs:errors

# View raw log files
tail -f logs/combined.log
tail -f logs/error.log
```

### Basic Logging

```typescript
import { logger } from '../common/utils/logger';

// Different log levels
logger.error('Something went wrong', { userId: 123 });
logger.warn('This is a warning', { action: 'delete' });
logger.info('User logged in', { username: 'john' });
logger.debug('Debug information', { data: complexObject });
```

### HTTP Request Logging

HTTP requests are automatically logged via Morgan middleware:

```typescript
// Development output
GET /api/users 200 1234 - 45.123 ms [29/Jul/2025:10:30:00 +0000]

// With request details
DEBUG: Incoming Request {
  method: "GET",
  url: "/api/users",
  headers: {...},
  query: {...},
  body: {...}
}
```

### Error Logging

Errors are automatically logged with full context:

```typescript
// Automatic error logging in middleware
logger.error('Request Error', {
  error: error.message,
  stack: error.stack,
  method: req.method,
  url: req.url,
  // ... additional context
});
```

## ⚙️ Configuration

### Environment Variables

The logger behavior changes based on `NODE_ENV`:

```bash
# Development
NODE_ENV=development  # Full logging, no masking, debug level

# Production
NODE_ENV=production   # Minimal logging, data masking, warn level
```

### Winston Configuration

```typescript
// Log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Development level: debug (shows all)
// Production level: warn (errors + warnings only)
```

## 🚀 Advanced Features

### Custom Morgan Stream

Morgan logs are piped through Winston for consistent formatting:

```typescript
export const morganStream = {
  write: (message: string) => {
    Logger.http(message.trim());
  },
};
```

### Response Time Tracking

Request processing time is automatically tracked:

```typescript
const startTime = Date.now();
// ... request processing
const responseTime = Date.now() - startTime;
logger.debug('Response', { responseTime: `${responseTime}ms` });
```

### Skip Logging

Health check endpoints are skipped in production:

```typescript
skip: (req, res) => {
  return process.env.NODE_ENV === 'production' && req.url === '/health';
};
```

## 🔧 Extending the Logger

### Adding New Transports

```typescript
// Example: Add email transport for critical errors
const transports = [
  // ... existing transports
  new winston.transports.Mail({
    to: 'admin@company.com',
    subject: 'Critical Error',
    level: 'error',
  }),
];
```

### Custom Sensitive Fields

```typescript
const sensitiveFields = [
  // ... existing fields
  'customSecret',
  'apiKey',
  'privateData',
];
```

## 📈 Monitoring Integration

The logger is designed for easy integration with external monitoring services:

### Cloud Logging Services

- AWS CloudWatch
- Google Cloud Logging
- Azure Monitor
- Datadog
- New Relic

### Example CloudWatch Integration

```typescript
import { CloudWatchLogs } from 'aws-sdk';

const cloudWatchTransport = new winston.transports.Stream({
  stream: new CloudWatchLogs({
    logGroupName: '/aws/lambda/my-app',
    logStreamName: new Date().toISOString(),
  }),
});
```

## 🧪 Testing

The logger can be mocked for testing:

```typescript
// Jest mock
jest.mock('../common/utils/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));
```

## 📋 Best Practices

1. **Use appropriate log levels** - Don't log everything as `info`
2. **Include context** - Add relevant metadata to logs
3. **Don't log sensitive data** - The masking helps but be mindful
4. **Structure your logs** - Use consistent object structures
5. **Monitor log volume** - Excessive logging can impact performance
6. **Regular log rotation** - Implement log rotation in production

## 🔍 Troubleshooting

### Common Issues

1. **Logs not appearing**: Check `NODE_ENV` and log level settings
2. **Permission errors**: Ensure write permissions to `logs/` directory
3. **Large log files**: Implement log rotation
4. **Missing context**: Add more metadata to log calls

### Debug Mode

Enable debug logging in development:

```bash
NODE_ENV=development npm run dev
```

This will show all HTTP requests, responses, and debug information.
