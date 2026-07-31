import { Response, NextFunction } from 'express';
import { Request } from '@/common/types/express';
import { todoService } from '../../domain/todo/services/todo.service';
import {
  CreateTodoDto,
  GetTodosFiltersDto,
  UpdateTodoDto,
} from '../../domain/todo/dto/todo.dto';
import { asyncHandler } from '../../common/utils/asyncHandler';

export const getTodos = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = await req.userClaims?.sub!;
  const filters: GetTodosFiltersDto = {
    view: req.query.view as GetTodosFiltersDto['view'],
    importance: req.query.importance as GetTodosFiltersDto['importance'],
    status: req.query.status as GetTodosFiltersDto['status'],
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };
  const todos = await todoService.getTodos(userId, filters);
  res.json(todos);
});

export const createTodo = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userClaims?.sub!;
  const { task, importance, status, display_order } = req.body as CreateTodoDto;
  const todo = await todoService.createTodo(task, userId, {
    importance,
    status,
    display_order,
  });
  res.status(201).json(todo);
});

export const updateTodo = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userClaims?.sub!;
  const { id, task, is_complete, importance, status, display_order } =
    req.body as UpdateTodoDto;
  const todo = await todoService.updateTodo(id, task, is_complete, userId, {
    importance,
    status,
    display_order,
  });
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
