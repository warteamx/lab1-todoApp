import express from 'express';
import { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import openapiDoc from './openapi';
import todoRouter from './api/todo/todo.routes';
import userRouter from './api/profile/profile.routes';
import multer from 'multer';
import { errorMiddleware } from './common/middlewares/error.middleware';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
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
app.use('/api/profile', userRouter);
app.use('/api/todo', todoRouter);

app.use(errorMiddleware);

export default app;
