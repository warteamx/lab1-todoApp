import express from 'express';
import { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './openapi';
import todoRouter from './api/todo/todo.routes';
import { errorMiddleware } from './common/middlewares/error.middleware';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
import { authMiddleware } from './common/middlewares/authSupabase.middleware';
import cors from 'cors';

const app = express();


app.use(cors());
app.use(json());
app.use(loggerMiddleware);
app.use(authMiddleware);


app.use('/api/todo', todoRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorMiddleware);

export default app;
