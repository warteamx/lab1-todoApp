import express from 'express';
import { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import openapiDoc from '.
import versionRoutes from './api/system/version.routes';/openapi';
import todoRouter from './api/todo/todo.routes';
import profileRouter from './api/profile/profile.routes';
import healthRouter from './api/health/health.routes';
import multer from 'multer';
import helmet from 'helmet';
import { errorMiddleware } from './common/middlewares/error.middleware';
import { loggerMiddleware, errorLoggerMiddleware } from './common/middlewares/logger.middleware';
import { authMiddleware } from './common/middlewares/authSupabase.middleware';
import cors from 'cors';

const app = express();

// Security middleware - Helmet configuration with best practices
app.use(
  helmet({
    // Content Security Policy
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts for Swagger UI
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for Swagger UI
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"], // Allow frames for Swagger UI
      },
    },
    // Cross-Origin Embedder Policy
    crossOriginEmbedderPolicy: false, // Disabled for Swagger UI compatibility
    // Cross-Origin Opener Policy - Allow for Swagger UI compatibility
    crossOriginOpenerPolicy: false,
    // HTTP Strict Transport Security
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    // Prevent MIME type sniffing
    noSniff: true,
    // X-Frame-Options
    frameguard: { action: 'sameorigin' }, // Allow same origin frames for Swagger UI
    // Hide X-Powered-By header
    hidePoweredBy: true,
    // Referrer Policy
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// CORS configuration: restrict origins in production
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? (process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://56.228.14.41', 'https://lab1.warteamx.com'])
    : '*';

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(json());
app.use(loggerMiddleware);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(openapiDoc, {
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true
  }
}));

// Simple connectivity test endpoint
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Health endpoint - no authentication required
app.use('/api/health', healthRouter);

// Authentication middleware for protected routes
app.use(authMiddleware);

// Multer setup for avatar upload
const upload = multer({ storage: multer.memoryStorage() });
app.use('/api/profile/avatar', upload.single('avatar'));
app.use('/api/profile', profileRouter);
app.use('/api/todo', todoRouter);
app.use('/api', versionRoutes);

// Add error logging middleware before error handling
app.use(errorLoggerMiddleware);
app.use(errorMiddleware);

export default app;
