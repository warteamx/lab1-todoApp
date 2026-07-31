import { Todo } from '../entities/todo.entity';
import { GetTodosFiltersDto } from '../dto/todo.dto';

export interface ITodoService {
  getTodos(user_id: string, filters?: GetTodosFiltersDto): Promise<Todo[]>;
  createTodo(
    task: string,
    user_id: string,
    metadata?: Partial<Pick<Todo, 'importance' | 'status' | 'display_order'>>
  ): Promise<Todo>;
  updateTodo(
    id: number,
    task: string,
    is_complete: boolean,
    user_id: string,
    metadata?: Partial<Pick<Todo, 'importance' | 'status' | 'display_order'>>
  ): Promise<Todo>;
  deleteTodo(id: number, user_id: string): Promise<void>;
}
