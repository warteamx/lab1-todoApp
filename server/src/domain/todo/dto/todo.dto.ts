export interface CreateTodoDto {
  user_id: string;
  task: string;
  is_complete?: boolean; // Optional, defaults to false
}
export interface UpdateTodoDto {
  id: number;
  task: string;
  is_complete: boolean;
  user_id: string;
}
export interface DeleteTodoDto {
  id: string; 
}
