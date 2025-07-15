import { Router } from 'express';
import { getTodos, createTodo } from './todo.controller';

/**
 * @openapi
 * /api/todo:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: List of todos
 *   post:
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoDto'
 *     responses:
 *       201:
 *         description: Created todo
 */
const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);

export default router;
