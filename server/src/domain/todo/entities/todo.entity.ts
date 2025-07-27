export interface Todo {
  id: number;
  user_id: string;
  created_at: Date;
  task: string;
  is_complete: boolean;
}
