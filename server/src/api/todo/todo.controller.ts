import { Request, Response, NextFunction } from 'express';
import { todoService } from '../../domain/todo/services/todo.service';
import { CreateTodoDto } from '../../domain/todo/dto/todo.dto';

export async function getTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);

  } catch (err) {
    next(err);
  }
}

export async function createTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { task } = req.body as CreateTodoDto;
    const todo = await todoService.createTodo(task);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}
