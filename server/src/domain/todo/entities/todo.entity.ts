export interface Todo {
  id: number;
  user_id: string;
  created_at?: Date | string;
  inserted_at?: Date | string;
  task: string;
  is_complete: boolean;
  importance: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  display_order: number;
}
