import { Todo } from '../entities/todo.entity';

export interface ITodoService {
  getTodos(user_id: string): Promise<Todo[]>;
  createTodo(task: string, user_id: string): Promise<Todo>;
}
