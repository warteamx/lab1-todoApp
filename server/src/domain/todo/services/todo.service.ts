import { ITodoService } from '../interfaces/todo.interface';
import { getTodos, createTodo } from '../../../infrastructure/repositories/todo.repository';
import { Todo } from '../entities/todo.entity';

export const todoService: ITodoService = {
  async getTodos() {
    return getTodos();
  },
  async createTodo(title: string) {
    return createTodo(title);
  },
};
