import { Response, NextFunction } from 'express';
import { Request } from '@/common/types/express';
import { todoService } from '../../domain/todo/services/todo.service';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/todo/dto/todo.dto';
import { UnauthorizedException } from '../../common/exceptions';
import { asyncHandler } from '../../common/utils/asyncHandler';

export const getTodos = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = await req.userClaims?.sub!;
  const todos = await todoService.getTodos(userId);
  res.json(todos);
});

export const createTodo = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userClaims?.sub!;
  const { task } = req.body as CreateTodoDto;
  const todo = await todoService.createTodo(task, userId);
  res.status(201).json(todo);
});

export const updateTodo = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userClaims?.sub!;
  const { id, task, is_complete } = req.body as UpdateTodoDto;
  const todo = await todoService.updateTodo(id, task, is_complete, userId);
  res.json(todo);
});

export const deleteTodo = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userClaims?.sub!;
  const { id } = req.body;
  await todoService.deleteTodo(id, userId);
  res.status(204).send();
});
