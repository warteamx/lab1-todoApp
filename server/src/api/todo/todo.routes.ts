import { Router } from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './todo.controller';

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/', updateTodo);
router.delete('/', deleteTodo);

export default router;
