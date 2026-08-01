import { Todo } from '../entities/todo.entity';

export interface CreateTodoDto {
  user_id: string;
  task: string;
  is_complete?: boolean; // Optional, defaults to false
  importance?: Todo['importance'];
  status?: Todo['status'];
  display_order?: number;
}
export interface UpdateTodoDto {
  id: number;
  task: string;
  is_complete: boolean;
  user_id: string;
  importance?: Todo['importance'];
  status?: Todo['status'];
  display_order?: number;
}
export interface DeleteTodoDto {
  id: string;
}

export interface GetTodosFiltersDto {
  view?: 'day' | 'week' | 'month';
  importance?: Todo['importance'];
  status?: Todo['status'];
  page?: number;
  limit?: number;
}
