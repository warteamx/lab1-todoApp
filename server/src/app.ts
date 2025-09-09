import express from 'express';
import { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import openapiDoc from './openapi';
import versionRoutes from './api/system/version.routes';
import todoRouter from './api/todo/todo.routes';
import profileRouter from './api/profile/profile.routes';
import healthRouter from './api/health/health.routes';
import multer from 'multer';
import helmet from 'helmet';
import { errorMiddleware } from './common/middlewares/error.middleware';
import {
  loggerMiddleware,
  errorLoggerMiddleware,
} from './common/middlewares/logger.middleware';
import { authMiddleware } from './common/middlewares/authSupabase.middleware';
import cors from 'cors';

const app = express();

// Security middleware - Helmet configuration with best practices
app.use(
  helmet({
    // Content Security Policy - More permissive for Swagger UI
    // Content Security Policy - Custom configuration for HTTP-only serving
    contentSecurityPolicy: {
      useDefaults: false, // Disable Helmet defaults that include upgrade-insecure-requests
      directives: {
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\'', 'blob:'], // Add blob: for Swagger UI
        styleSrc: ['\'self\'', '\'unsafe-inline\'', 'fonts.googleapis.com'], // Allow Google Fonts
        imgSrc: ['\'self\'', 'data:', 'https:', 'blob:'], // Add blob: for Swagger UI
        connectSrc: ['\'self\''],
        fontSrc: ['\'self\'', 'fonts.gstatic.com'], // Allow Google Fonts
        objectSrc: ['\'none\''],
        mediaSrc: ['\'self\''],
        frameSrc: ['\'self\''], // Allow frames for Swagger UI
        workerSrc: ['\'self\'', 'blob:'], // Add worker-src for Swagger UI
        baseUri: ['\'self\''],
        formAction: ['\'self\''],
        frameAncestors: ['\'self\''],
        scriptSrcAttr: ['\'none\''],
        // Explicitly DO NOT include upgrade-insecure-requests for HTTP-only serving
      },
    },
    // Cross-Origin Embedder Policy
    crossOriginEmbedderPolicy: false, // Disabled for Swagger UI compatibility
    // Cross-Origin Opener Policy - Allow for Swagger UI compatibility
    crossOriginOpenerPolicy: false,
    // HTTP Strict Transport Security - Disabled for HTTP-only serving
    hsts: false, // Disabled since we're serving over HTTP
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
    ? process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : [
        'http://56.228.14.41',
        'https://lab1.warteamx.com',
        'http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com',
      ]
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

// Debug: Log OpenAPI setup
console.log('🔧 Setting up Swagger UI at /api-docs');
console.log('📋 OpenAPI Document Keys:', Object.keys(openapiDoc));

app.use('/api-docs', swaggerUi.serve);
app.get(
  '/api-docs',
  swaggerUi.setup(openapiDoc, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
      // Force HTTP scheme for asset loading
      url: undefined, // Let Swagger UI auto-detect the current URL
      validatorUrl: null, // Disable validator to prevent HTTPS calls
    },
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info .title { color: #3b82f6; }
    `,
    customSiteTitle: 'Lab1 TodoApp API Documentation',
    // Ensure assets are loaded via HTTP
    swaggerUrl: undefined, // Use current protocol
  })
);

console.log('✅ Swagger UI setup complete');

// Simple connectivity test endpoint
app.get('/ping', (req, res) => {
  res
    .status(200)
    .json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Health endpoint - no authentication required
app.use('/api/health', healthRouter);

// Authentication middleware for protected routes (exclude public routes)
app.use((req, res, next) => {
  // Skip authentication for public routes
  if (
    req.path.startsWith('/api-docs') ||
    req.path.startsWith('/api/health') ||
    req.path === '/ping'
  ) {
    return next();
  }
  return authMiddleware(req, res, next);
});

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
