import { Response, NextFunction } from 'express';
import { Request } from '@/common/types/express';
import { todoService } from '../../domain/todo/services/todo.service';
import { CreateTodoDto } from '../../domain/todo/dto/todo.dto';

export async function getTodos(req: Request, res: Response, next: NextFunction) {
  const userId = await req.userClaims?.sub!;
  // console.log(`👀 getTodos userId: ${JSON.stringify(req.userClaims)}`);
  console.log('👀 userID', userId)

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
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
