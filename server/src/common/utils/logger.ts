import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define the format of the logger
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json()
);

// Define which transports the logger must use to print out messages
const transports = [
  // Allow console logging only in development
  new winston.transports.Console({
    format: consoleFormat,
  }),
  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs/error.log'),
    level: 'error',
    format: fileFormat,
  }),
  // Allow to print all the error message inside the all.log file
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs/combined.log'),
    format: fileFormat,
  }),
];

// Create the logger instance that has to be exported
// and used to log messages.
const Logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
  levels,
  transports,
});

// Custom stream for Morgan
export const morganStream = {
  write: (message: string) => {
    Logger.http(message.trim());
  },
};

// Function to mask sensitive data
export const maskSensitiveData = (data: unknown): unknown => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const sensitiveFields = [
    'password',
    'token',
    'authorization',
    'auth',
    'secret',
    'key',
    'credential',
    'bearer',
    'jwt',
    'session',
  ];

  const masked = { ...data as Record<string, unknown> };

  Object.keys(masked).forEach((key) => {
    const lowerKey = key.toLowerCase();
    if (sensitiveFields.some((field) => lowerKey.includes(field))) {
      masked[key] = '***MASKED***';
    } else if (typeof masked[key] === 'object' && masked[key] !== null) {
      masked[key] = maskSensitiveData(masked[key]);
    }
  });

  return masked;
};

// Logger methods with different levels
export const logger = {
  error: (message: string, meta?: Record<string, unknown>) => {
    const logData = meta ? { message, ...maskSensitiveData(meta) } : message;
    Logger.error(logData);
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    const logData = meta ? { message, ...maskSensitiveData(meta) } : message;
    Logger.warn(logData);
  },
  info: (message: string, meta?: Record<string, unknown>) => {
    const isDev = process.env.NODE_ENV === 'development';
    const logData = meta
      ? { message, ...(isDev ? meta : maskSensitiveData(meta)) }
      : message;
    Logger.info(logData);
  },
  http: (message: string, meta?: Record<string, unknown>) => {
    const isDev = process.env.NODE_ENV === 'development';
    const logData = meta
      ? { message, ...(isDev ? meta : maskSensitiveData(meta)) }
      : message;
    Logger.http(logData);
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      const logData = meta ? { message, ...meta } : message;
      Logger.debug(logData);
    }
  },
};

export default logger;
