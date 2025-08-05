import express from 'express';
import { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import openapiDoc from './openapi';
import todoRouter from './api/todo/todo.routes';
import profileRouter from './api/profile/profile.routes';
import multer from 'multer';
import { errorMiddleware } from './common/middlewares/error.middleware';
import { loggerMiddleware, errorLoggerMiddleware } from './common/middlewares/logger.middleware';
import { authMiddleware } from './common/middlewares/authSupabase.middleware';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: '*', // Allow all origins for development, adjust as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(json());
app.use(loggerMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));
app.use(authMiddleware);

// Multer setup for avatar upload
const upload = multer({ storage: multer.memoryStorage() });
app.use('/api/profile/avatar', upload.single('avatar'));
app.use('/api/profile', profileRouter);
app.use('/api/todo', todoRouter);

// Add error logging middleware before error handling
app.use(errorLoggerMiddleware);
app.use(errorMiddleware);

export default app;
