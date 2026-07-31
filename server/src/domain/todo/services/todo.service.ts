import { ITodoService } from '../interfaces/todo.interface';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../../infrastructure/repositories/todo.repository';
import { Todo } from '../entities/todo.entity';
import { GetTodosFiltersDto } from '../dto/todo.dto';

const getTodoDate = (todo: Todo): Date => {
  const value = todo.inserted_at ?? todo.created_at;
  const date = new Date(value ?? Date.now());
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isInCurrentWeek = (date: Date, now: Date): boolean => {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return date >= start && date < end;
};

export const todoService: ITodoService = {
  async getTodos(user_id: string, filters: GetTodosFiltersDto = {}): Promise<Todo[]> {
    const todos = await getTodos(user_id);
    const now = new Date();
    const view = filters.view ?? 'day';
    const status = filters.status;
    const importance = filters.importance;
    const page = Math.max(1, Number(filters.page ?? 1));
    const limit = Math.min(200, Math.max(1, Number(filters.limit ?? 100)));

    const filteredByDate = todos.filter(todo => {
      const date = getTodoDate(todo);
      if (view === 'day') return isSameDay(date, now);
      if (view === 'week') return isInCurrentWeek(date, now);
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    });

    const filtered = filteredByDate.filter(todo => {
      if (status && todo.status !== status) return false;
      if (importance && todo.importance !== importance) return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (view === 'day') return a.display_order - b.display_order;
      return getTodoDate(b).getTime() - getTodoDate(a).getTime();
    });

    const offset = (page - 1) * limit;
    return sorted.slice(offset, offset + limit);
  },
  async createTodo(
    task: string,
    user_id: string,
    metadata?: Partial<Pick<Todo, 'importance' | 'status' | 'display_order'>>
  ): Promise<Todo> {
    return createTodo(task, user_id, metadata);
  },
  async updateTodo(
    id: number,
    task: string,
    is_complete: boolean,
    user_id: string,
    metadata?: Partial<Pick<Todo, 'importance' | 'status' | 'display_order'>>
  ): Promise<Todo> {
    return updateTodo(id, task, is_complete, user_id, metadata);
  },
  async deleteTodo(id: number, user_id: string): Promise<void> {
    return deleteTodo(id, user_id);
  },
};
