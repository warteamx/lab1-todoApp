import { Todo } from '../entities/todo.entity';

export interface ITodoService {
  getTodos(): Promise<Todo[]>;
  createTodo(title: string): Promise<Todo>;
}
