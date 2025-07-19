import { ITodoService } from '../interfaces/todo.interface';
import { getTodos, createTodo } from '../../../infrastructure/repositories/todo.repository';
import { Todo } from '../entities/todo.entity';

export const todoService: ITodoService = {
  async getTodos(user_id: string): Promise<Todo[]> {
    return getTodos(user_id);
  },
  async createTodo(task: string, user_id: string): Promise<Todo> {
    return createTodo(task, user_id);
  },
};
