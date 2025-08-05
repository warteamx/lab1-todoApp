import { ITodoService } from '../interfaces/todo.interface';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../../infrastructure/repositories/todo.repository';
import { Todo } from '../entities/todo.entity';

export const todoService: ITodoService = {
  async getTodos(user_id: string): Promise<Todo[]> {
    return getTodos(user_id);
  },
  async createTodo(task: string, user_id: string): Promise<Todo> {
    return createTodo(task, user_id);
  },
  async updateTodo(
    id: number,
    task: string,
    is_complete: boolean,
    user_id: string
  ): Promise<Todo> {
    return updateTodo(id, task, is_complete, user_id);
  },
  async deleteTodo(id: number, user_id: string): Promise<void> {
    return deleteTodo(id, user_id);
  },
};
