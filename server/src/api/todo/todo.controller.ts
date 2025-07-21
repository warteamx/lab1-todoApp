import { Response, NextFunction } from 'express';
import { Request } from '@/common/types/express';
import { todoService } from '../../domain/todo/services/todo.service';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/todo/dto/todo.dto';

export async function getTodos(req: Request, res: Response, next: NextFunction) {
  const userId = await req.userClaims?.sub!;
  try {
    const todos = await todoService.getTodos(userId);
    res.json(todos);

  } catch (err) {
    next(err);
  }
}

export async function createTodo(req: Request, res: Response, next: NextFunction) {
  const userId = req.userClaims?.sub!;
  try {
    const { task } = req.body as CreateTodoDto;
    const todo = await todoService.createTodo(task, userId);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}

export async function updateTodo(req: Request, res: Response, next: NextFunction) {
  const userId = req.userClaims?.sub!;
  try {
    const { id, task, is_complete } = req.body as UpdateTodoDto;
    const todo = await todoService.updateTodo(id, task, is_complete, userId);
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

export async function deleteTodo(req: Request, res: Response, next: NextFunction) {
  const userId = req.userClaims?.sub!;
  try {
    const { id } = req.body;
    await todoService.deleteTodo(id, userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
